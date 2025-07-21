import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'


export const AppContext = createContext()

const AppContextProvider = (props) => {

  const currenySymnol = '$'
  const backendURL = import.meta.env.VITE_BACKEND_URL

  const[doctors, setDoctor] = useState([]);
  const[token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
  const[userData, setUserData] = useState(false);



//getting the doctor data from the APi calling 
    const getDoctorData = async ()=>{
    try{
        const {data} = await axios.get(backendURL+'/api/doctor/list')
        if(!data.success){
          return toast.error(data.message);
        }

        setDoctor(data.doctors);
    }
    catch(error){
        console.log(error);
        toast.error(error.message)
    }
  }



  //Set User Data 
  const loadProfile = async ()=>{
      try {
        const {data} = await axios.get(backendURL+'/api/user/get-profile', {headers : {token}});
        
        if(!data.success){
          return toast.error(data.message);
        }

        setUserData(data.userData);
      } 
      catch (error) {
        console.log(error);
        toast.error(error.message)
      }
  }

  const value = {
   doctors,getDoctorData,
   currenySymnol,
   token, setToken,
   backendURL,
   userData,setUserData,
   loadProfile

  }

   useEffect(()=>{
    if(token){
      loadProfile()
    }
    else{
      setUserData(false);
    }
  },[token])




  useEffect(()=>{

    getDoctorData()

  },[])

 

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;