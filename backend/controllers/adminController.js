import validator from 'validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/docModel.js'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

 

//Api for adding doctor  
import { json } from "express";

const addDoctor = async(req,res)=>{
    try{

        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body;

        const imageFile = req.file
        
        //cheecking for all data for add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success : false, message : "Missing deatils " })
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success : false, message : "Please enter a valid email " })
        }   

        if(password.length < 8){
            return res.json({success : false, message : "Plases set strong password " })
        } 


        //hash the password 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //upload image to cloudinary 
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"} )

        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name, email, 
            password : hashPassword, 
            speciality,degree,experience, about, fees, address : JSON.parse(address) ,
            image : imageUrl,
            date : Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success : true, message : "Dcotor added "})
    }
    catch(error){
        console.log(error);
        res.json({success : false, message : error.message})
    }
}



//api endpoint for admin Login 
const loginAdmin  = async (req,res)=>{
    try{
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS){

            const token = jwt.sign({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASS }, process.env.JWT_SECRET)
            res.json({success : true, token})

        }
        else{
            res.json({succes : false, message : "Invalid credentials "})
        }

    }
    catch(error){
         console.log(error);
        res.json({success : false, message : error.message})
    }
}


//Api to get All doctor list for admin panel
const allDoctors = async(req,res)=>{
    try{
            const doctors = await doctorModel.find({}).select('-password');
            res.json({succes : true, doctors});
    }
    catch(error){

    }
}

//Api to get All appoinment list 
const appointmentAdmin = async(req,res)=>{
    try{
        const appoinments = await appointmentModel.find({});
        res.json({success : true, appoinments});
    }
    catch(error){
        console.log(error);
        res.json({success : false, message : error.message})
    }
}


//Cancel the appoinment from admin

const CANCELLATION_DELETE_DELAY_HOURS = 1;

const cancelAppoointmentAdmin = async (req,res)=>{
    
    try{
        const { appointmentId } = req.body;


        console.log(appointmentId);

        const appointmentData = await appointmentModel.findById(appointmentId);

        console.log(appointmentId);
        console.log(appointmentData);

        await appointmentModel.findByIdAndUpdate(appointmentId, {canceled : true }, 
            { expiresAt: new Date(Date.now() + CANCELLATION_DELETE_DELAY_HOURS * 60 * 60 * 1000) 
        });

        //releasing doctor slot 

        const {docId,slotDate, slotTime} = appointmentData;

        const docData = await doctorModel.findById(docId);

        let slots_booked = docData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, {slots_booked});
        res.json({success : true, message : "Appointment cancelled By Admin"})

    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}


//dashboard for admin

const dashboard = async(req,res)=>{
    try{

        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const apppoinments = await appointmentModel.find({});

        const dashData = {
            doctors : doctors.length,
            apppoinments : apppoinments.length,
            patients : users.length,
            latestAppoinments : apppoinments.reverse().slice(0,4) 
        }

        res.json({success : true, dashData});

    }
    catch(error){
        console.log(error);
        res.json({success :false, message: error.message});
    }
}


export {addDoctor, loginAdmin, allDoctors, appointmentAdmin, cancelAppoointmentAdmin,
    dashboard
}