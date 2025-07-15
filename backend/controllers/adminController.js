import validator from 'validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/docModel.js'

 

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

            const token = jwt.sign({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASS }, process.env.JWT_SECRET, { expiresIn: '1h' })
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


export {addDoctor, loginAdmin}