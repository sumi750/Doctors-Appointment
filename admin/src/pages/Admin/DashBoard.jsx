import React from 'react';
import {assets} from '../../assets/assets.js'
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext.jsx';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext.jsx';

const DashBoard = () => {

    const {dashData, dashBoardData, aToken, cancelAppointment} = useContext(AdminContext);
    const {slotDateFormat} = useContext(AppContext);

    useEffect(()=>{
      if(aToken){
        dashBoardData(); 
      }
    }, [aToken])

  return dashData &&  (
    <div className='m-5'> 
        <div className='flex flex-wrap gap-3'>
          <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img className='w-14' src={assets.doctor_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
              <p className='text-gray-400'>Doctors</p>
            </div>
          </div>

          <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img className='w-14' src={assets.appointments_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.apppoinments}</p>
              <p className='text-gray-400'>Appoinments</p>
            </div>
          </div>

          <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
            <img className='w-14' src={assets.patients_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
              <p className='text-gray-400'>Patients</p>
            </div>
          </div>
        </div>

      <div className='bg-white '>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings </p>
        </div>

        <div className='pt-4 border border-t-0 '>
            {
              dashData.latestAppoinments.map((item, index)=>(
                <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                      <img className='rounded-full w-10' src={item.userData.image} alt="" />
                      <div className='flex-1 text-sm'>
                        <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                        <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                      </div>

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

    </div>
  );
};

export default DashBoard;