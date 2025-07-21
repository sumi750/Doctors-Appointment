import validator from 'validator';
import bcrypt, { genSalt } from 'bcrypt'
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import {v2 as cloduniary} from 'cloudinary'
import doctorModel from '../models/docModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'


const registerUser = async (req,res)=>{

    try{
        const {name, email, password} = req.body;

        if(!name || !password || !email){
            return res.json({success : false, message: "Missing Details"})
        }

        if(!validator.isEmail(email)){
            return res.json({success : false, message: "Enter valid Email "})
        }

        if(password.length < 8){
            return res.json({success : false, message: "Enter a Strong Password "})
        }

        //Haisng user password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const userData = {
            name, email, password : hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        //Create a Token 
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success : true, token});

    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}



//Api user Login

const loginUser = async (req,res)=>{
    try{
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success : false, message: "user does not exist "})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
            res.json({success : true, token});
        }
        else{
            res.json({success : false, message: "Invalid credentials "})
        }

    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}

//get User 

const getProfile = async(req,res)=>{
    try{
        const userId = req.userId;
        const userData = await userModel.findById(userId).select('-password');

        res.json({success : true, userData});
    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}



//Api Update the user Profile 
const updateProfile = async (req,res)=>{
    try{

        const userId = req.userId;
        const{name, phone, address, dob, gender} = req.body;
        const imageFile = req.file;

        console.log(userId, name, phone, address, dob, gender);
        
        if(!name || !phone || !gender || !dob ){
            return res.json({success : false, message : "data Missing"})
        }

        await userModel.findByIdAndUpdate(userId, 
            {name, phone, address : JSON.parse(address), dob, gender})

        if(imageFile){

            //upload image to cloduniary
            const imageUpload = await cloduniary.uploader.upload(imageFile.path, {resource_type : 'image'})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image : imageUrl});

        }

        res.json({success : true, message : "Profile updated "})

    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}



//Book Appointment API
const appointmentBook = async(req,res)=>{
    try{

        const userId = req.userId;
        const {docId ,slotDate, slotTime} = req.body;
        const docData = await doctorModel.findById(docId).select('-password');

        if(!docData.available){
            return res.json({success : false, message : 'Doctor is not Avilable'});
        }

        let slots_booked = docData.slots_booked

        //chehcing for slot avail
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success : false, message : 'Slot not avialbale '});
            }
            else{
                slots_booked[slotDate].push(slotTime);
            }
        }
        else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked;

        const appointmentData = {
            userId, 
            docId, 
            userData, 
            docData, 
            amount : docData.fees,
            slotTime,
            slotDate,
            date : Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save();


        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, {slots_booked});

        res.json({success : true, message : " Appointment booked "})

    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}


//list of appointment 
const userAppointment = async (req,res)=>{
    try{

        const userId = req.userId;
        const appointments = await appointmentModel.find({userId});
        res.json({success : true, appointments});
    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}

//cancel appointment 

const CANCELLATION_DELETE_DELAY_HOURS = 1;

const cancelAppoointment = async (req,res)=>{
    try{
        const userId = req.userId;
        const {appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if(appointmentData.userId !== userId){
            return res.json({success : false, message : "Unauthorized action" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {canceled : true }, 
            { expiresAt: new Date(Date.now() + CANCELLATION_DELETE_DELAY_HOURS * 60 * 60 * 1000) 
            });

        //releasing doctor slot 

        const {docId,slotDate, slotTime} = appointmentData;

        const docData = await doctorModel.findById(docId);

        let slots_booked = docData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, {slots_booked});

        // await appointmentModel.findByIdAndDelete(appointmentId);

        res.json({success : true, message : "Appointment cancelled by User"})
 
    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}


const razorPayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})


const onlinePayment  = async (req,res)=>{

    try{
        const {appointmentId} = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if(!appointmentData || appointmentData.canceled){
        res.json({success : false, message : "Appoinment Canclled or not Found" })
    }

    //creating option for payment 
    const options = {
        amount : appointmentData.amount*100,
        currency : process.env.CURRENCY,
        receipt : appointmentId
    }

    //creation of an order 
    const order = await razorPayInstance.orders.create(options);

    res.json({success : true, order});

    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}


//Api to verify payment of razorpay
const verifyRazorpay = async(req,res)=>{
    try{

        const { razorpay_order_id} = req.body;

        const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id);

        console.log(orderInfo);

        if(orderInfo.status === 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment : true});

            res.json({success : true, message : "Payment Successfull"});
        }
        else{
            res.json({success : trufalsee, message : "Payment failed"})
        }
    }
    catch(error){
         console.log(error);
        res.json({success :false, message: error.message});
    }
}


export {registerUser, 
    loginUser, getProfile, updateProfile, 
    appointmentBook, userAppointment, cancelAppoointment, 
    onlinePayment , verifyRazorpay}