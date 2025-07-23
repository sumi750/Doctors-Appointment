import doctorModel from "../models/docModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";

const changeAvilabe = async (req,res)=>{
    try{
        const {docId} = req.body;
        const docData = await doctorModel.findById(docId);

        await doctorModel.findByIdAndUpdate(docId,{available : !docData.available})

        res.json({success :true, message : "Avialbilty changed"});
    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}

//doctor list 

const doctorList = async (req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({success : true, doctors})
    }
    catch(error){
         console.log(error);
        res.json({success :false, message: error.message});
    }
}

//APi for doctor login

const loginDoc = async(req,res)=>{
    try{

        const {email, password} = req.body;
        const doctor = await doctorModel.findOne({email});

        if(!doctor){
            return res.json({success : false, message : "Invalid credentials "});
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if(isMatch){
            const token = jwt.sign({id : doctor._id}, process.env.JWT_SECRET)

            res.json({success : true, token })
        }
        else{
            return res.json({success : false, message : "Wrong Password "});
        }

    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}


//APIs to get appoinments for doctor panel 

const appoinmentsDoctors = async(req,res)=>{
    try{

        const docId = req.docId;
        
        const appointments = await appointmentModel.find({docId});
        res.json({success : true, appointments});

    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}


//API to mark appointment completed for doctor panel 

const appoinmentComplete = async(req,res)=>{
    try{
        const docId = req.docId;
        const {appoinmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appoinmentId);

        if(appointmentData && appointmentData.docId === docId){
            await appointmentModel.findByIdAndUpdate(appoinmentId, {isCompleted : true})
            return res.json({success : true, message : "Appointment Completed "})
        }
        else{
            return res.json({success : false, message : "Mark Failed "})
        }
    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}

//API to mark appointment cancel for doctor panel 

const appoinmentCancel = async(req,res)=>{
    try{
        const docId = req.docId;
        const {appoinmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appoinmentId);

        if(appointmentData && appointmentData.docId === docId){

            await appointmentModel.findByIdAndUpdate(appoinmentId, {canceled : true})

            return res.json({success : true, message : "Appointment Cancelled "})
        }
        else{
            return res.json({success : false, message : "Caceltion  Failed "})
        }
    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}


//API to get dashboard data for docter panel 
const docDashboard = async(req,res)=>{
    try{
        const docId = req.docId;
        const appointments = await appointmentModel.find({docId});


        let earnings = 0;
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings += item.amount
            }
        })

        let patients = [];

        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        })


        const dashData = {
            earnings,
            appointments : appointments.length,
            patients : patients.length,
            latestAppointments : appointments.reverse().slice(0,5)
        }

        res.json({success : true, dashData})

    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}



//get the doctors Profile
const doctorProfile = async(req,res)=>{
    try{

        const docId = req.docId;
        const profileData = await doctorModel.findById(docId).select('-password');

        res.json({success : true, profileData});
    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}

//Api to update the doctor profile 
const updateProfile = async (req,res)=>{
    try{
        const docId = req.docId;
     
        const {fees, address,available } = req.body;

        await doctorModel.findByIdAndUpdate(docId, {fees, address, available});

        res.json({success : true, message : "Profile Updates"});

    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}



export {changeAvilabe, doctorList,  doctorProfile,updateProfile,
    loginDoc, appoinmentsDoctors, appoinmentComplete, appoinmentCancel, docDashboard}