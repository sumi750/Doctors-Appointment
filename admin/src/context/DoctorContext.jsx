import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props)=>{

    const backendURl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDtoken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
    const[appointments, setAppointments] = useState([]);
    const[dashData, setDashdata] = useState(false);
    const[profileData, setProfiledata] = useState('');

    const getAppointments = async ()=>{
        try{
            const {data} = await axios.get(backendURl+'/api/doctor/appoinments', {headers : {dToken}});
            if(data.success){
                setAppointments(data.appointments);
                console.log(data.appointments);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    const completeAppointment = async(appoinmentId)=>{
            try{
                const {data} = await axios.post(backendURl+'/api/doctor/complete-appointment', {appoinmentId}, {headers : {dToken}})

                if(data.success){
                    toast.success(data.message);
                    getAppointments();
                }
                else{
                    toast.error(data.message);
                }

            }
            catch(error){
                console.log(error);
            toast.error(error.message);
            }
    }

     const cancelAppointment = async(appoinmentId)=>{
            try{

                const {data} = await axios.post(backendURl+'/api/doctor/canel-appointment', {appoinmentId}, {headers : {dToken}})

                if(data.success){
                    toast.success(data.message);
                    getAppointments();
                }
                else{
                    toast.error(data.message);
                }

            }
            catch(error){
            console.log(error);
            toast.error(error.message);
            }
    }

    const getDashData = async ()=>{
        try{
            const {data} = await axios.get(backendURl+'/api/doctor/dashboard', {headers : {dToken}});
            if(data.success){
                setDashdata(data.dashData);
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }


    const getprofileData = async()=>{
        try{

            const {data} = await axios.get(backendURl+'/api/doctor/profile', {headers : {dToken}});
            if(data.success){
                setProfiledata(data.profileData);
                console.log(data.profileData);
            }
            else{
                toast.error(data.message);
            }

        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }


    const value = {
        dToken, setDtoken, backendURl, getAppointments, 
        completeAppointment, cancelAppointment,
        appointments, setAppointments, getDashData,
        dashData, setDashdata,
        getprofileData, profileData, setProfiledata
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider