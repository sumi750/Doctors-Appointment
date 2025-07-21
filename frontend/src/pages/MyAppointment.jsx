import React, { useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

const MyAppointment = () => {
  const {backendURL, token, getDoctorData} = useContext(AppContext);

  const[appointments, setAppointments] = useState([]);
  const months = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_');
    return dateArray[0]+" "+months[Number(dateArray[1])] +" "+ dateArray[2];
  }
  
  const navigate = useNavigate();
  const getUserAppoinment = async()=>{
    try{
      const {data} = await axios.get(backendURL+'/api/user/my-appoint', {headers : {token}});
      
      if(!data.success){
       return toast.error(data.message);
      }
        setAppointments(data.appointments.reverse());
        console.log(data.appointments)
    }
    catch(error){
      console.log(error);
      toast.error(error.message)
    }
  }


  const canelAppointment = async (appointmentId)=>{
    try{
      const {data} = await axios.post(backendURL+'/api/user/cancel-appointment', {appointmentId}, {headers : {token}});
      if(data.success){
        toast.success(data.message);
        getUserAppoinment();
        getDoctorData();
      }
      else{
        toast.error(data.message);
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.message)
    }
  }

  const initPay = (order)=>{
      const options = {
          key : import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount : order.amount,
          currency : order.currency,
          name : "Appoinment Payment",
          description: "Appoinment Transaction",
          order_id : order.id,
          rescipt : order.rescipt,
          handler : async (response)=>{
            try{
                const {data} = await axios.post(backendURL+'/api/user/verifyPay' , response, {headers : {token}} )

                if(data.success){
                  getUserAppoinment();
                  navigate('/my-appoint')
                  
                }
            }
            catch(error){
              console.log(error);
              toast.error(error.message)
            }
          }
      }

      const rzp = new window.Razorpay(options);
      rzp.open()
  }


  const appoinmentRazroPay = async (appointmentId)=>{
      try{

        const {data} = await axios.post(backendURL+'/api/user/payment', {appointmentId}, {headers : {token}});

        if(data.success){
          initPay(data.order)
        }

      }
      catch(error){
        console.log(error);
        toast.error(error.message)
      }
  }


  useEffect(()=>{
    if(token){
      getUserAppoinment();
    }
    
  }, [token])


  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment </p>
      <div>
          {appointments.map((item, index)=>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}> 
                <div>
                  <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
                </div>
                <div className='flex-1 text-sm text-zinc-600'>
                  <p className='text-netural-100 font-semibold'>{item.docData.name}</p>
                  <p>{item.docData.speciality}</p>
                  <p className='text-zinc-700 font-medium mt-1'>Address :</p>
                  <p className='text-xs'>{item.docData.address.line1}</p>
                  <p className='text-xs'>{item.docData.address.line2}</p>
                  <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}  </p>
                </div>
                <div>  </div>
                <div className='flex flex-col gap-2 justify-end'>
                  { !item.canceled && !item.payment &&
                    <button onClick={()=>appoinmentRazroPay(item._id)}  className='text-sm text-stone-500 text-center sm:min-w-45 py-2 border rounded hover:bg-[#5f6fff] hover:text-white transition-all duration-300'>Pay Online </button>
                  }  

                  {
                    !item.canceled && item.payment  && <button className='sm:min-w-48 py-2 border border-green-500 bg-gray-200 rounded text-green-500'>Paid</button>
                  }

                  {!item.canceled &&  <button onClick={()=>canelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-45 py-2 border rounded hover:bg-red-500 hover:text-black transition-all duration-300'>Cancel Appointment</button>
                  }  

                  {item.canceled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
                </div>  
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyAppointment;