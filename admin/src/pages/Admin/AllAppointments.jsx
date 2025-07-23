import React from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import {assets} from '../../assets/assets.js'

const AllAppointments = () => {

  const {appoinments, aToken, getAllApoinments, cancelAppointment } = useContext(AdminContext);

  const {calculteAge, slotDateFormat , currency} = useContext(AppContext);


  useEffect(()=>{

    if(aToken){
      getAllApoinments();
    }

  }, [aToken])

  return (
    <div className='w-full max-6xl m-5'>

      <p className='mb-3 text-lg font-medium'>All Apooinments </p>

      <div className='bg-white border rounded  min-h[60vh] text-sm max-h-[80vh] overflow-hidden scroll'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'> 
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date and Time</p>
          <p>Doctor Name</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appoinments.map((item, index)=>(
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100'  key={index}>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{calculteAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" /> <p>{item.docData.name}</p>
              </div>
              <p className='max-sm:hidden'>{currency}{item.amount}</p>
              {item.canceled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted 
                ? <p className='text-green-500 text-xs font-medium'>Completed</p> 
                :<img onClick={()=>cancelAppointment (item._id)}  className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
              }
              
            </div>
          ))
        }

      </div>
    </div>
  );
};

export default AllAppointments;