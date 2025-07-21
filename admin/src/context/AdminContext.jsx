import axios from "axios";
import { createContext, useState } from "react";
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props)=>{
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const[doctors, setDoctors] = useState([]);
    const [appoinments, setAppoinments] = useState([]);
    const[dashData, setDashData] = useState(null);

    const backendURl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async ()=>{
        try{
            const {data} = await axios.post(backendURl+'/api/admin/doctor-list', {}, {headers: {aToken}});
           
            if(!data.success){
               toast.error(data.message);
            }
            setDoctors(data.doctors);
            
        }
        catch(error){
            toast.error(error.message);
        }
    }

    const changeAvialble = async(docId)=>{
        try{
            const {data} = await axios.post(backendURl+'/api/admin/change-available', {docId}, {headers : {aToken}})
            if(!data.success){
               return toast.error(data.message);
            }

            toast.success(data.message);
            getAllDoctors()
        }
        catch(error){
            toast.error(error.message);
        }
    }


   

    const getAllApoinments = async()=>{
        try{

            const {data} = await axios.get(backendURl+'/api/admin/all-appoinment', {headers : {aToken}});
            if(data.success){
                setAppoinments(data.appoinments);
                console.log(data.appoinments);
            }
            else{
                toast.error(data.message);
            }

        }
        catch(error){
             toast.error(error.message);
        }
    }


    const cancelAppointment  = async(appointmentId) =>{
        try{
            const {data} = await axios.post(backendURl+'/api/admin/cancel-appoinment', {appointmentId }, {headers : {aToken}})

            if(data.success){
                toast.success(data.message);
                getAllApoinments();
            }
            else{
                toast.error(data.message);
            }


        }
        catch(error){
              toast.error(error.message);
        }
    }


    const dashBoardData = async()=>{
        try{
            const {data} = await axios.get(backendURl+'/api/admin/dashboard', {headers : {aToken}})

            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
            }
            
        }
        catch(error){
            toast.error(error.message);
        }
    }


     const value = {
        aToken,setAToken,
        backendURl,
        doctors, getAllDoctors, changeAvialble,
        appoinments, setAppoinments, getAllApoinments,
        cancelAppointment , dashBoardData, dashData
    } 



    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider