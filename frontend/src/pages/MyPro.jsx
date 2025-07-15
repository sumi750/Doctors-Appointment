import React from 'react';
import { useState } from 'react';
import { assets } from '../assets/assets';
const MyPro = () => {
  const [userData, setUserData] = useState({
    name: 'Edward Vincent',
    image : assets.profile_pic,
    email: 'richardjameswap@gmail.com',
    phone: '+91 120 456 7890',
    address: {
      line1: "123 Main St",
      line2: "Apt 4B London",
    },
    gender : "Male",
    dob: "2001-01-01",
  });

  const[isEdit, setIsEdit] = useState(false)

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='w-35 rounded' src={userData.image} alt="" />
      {
        isEdit
        ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text"
        value={userData.name}
         onChange={(e)=> setUserData(prev => ({...prev, name: e.target.value}))} />
        : <p className='font-medium text-3xl text-netural-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-gray-300 h-[-px] border' />
      <div>
        <p className='text-gray-600 underline mt-3 '>CONTACT INFORMATION </p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-netural-700'>
          <p className='font-medium'>Email id : </p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone</p>
           {
            isEdit
            ? <input className='bg-gray-100 max-w-52' type="text"
            value={userData.phone}
            onChange={(e)=> setUserData(prev => ({...prev, phone: e.target.value}))} />
            : <p className='text-blue-500'>{userData.phone}</p>
            }

            <p className='font-medium'>Address</p>
            {
              isEdit
              ? 
                <p className='text-gray-500'> 
                  <input type="text" 
                  className='bg-gray-50'
                  value={userData.address.line1}
                   onChange={(e)=>setUserData(prev=> ({...prev, address: {...prev.address, line1 : e.target.value}}) )} />
                  <br />
                  <input type="text" 
                  className='bg-gray-50'
                  value={userData.address.line2}
                  onChange={(e)=>setUserData(prev=> ({...prev, address: {...prev.address, line2 : e.target.value}}) )}
                  />
                </p>
              : 
                <p className='text-gray-500' >
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
            }
        </div>
      </div>
      <div>
        <p className='text-gray-600 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-netural-700'>
          <p className='font-medium'>Gender :</p>
          {
            isEdit 
            ? <select
              className='max-w-20 bg-gray-100'
              value={userData.gender}
              onChange={(e)=> setUserData(prev=> ({...prev, gender : e.target.value}))}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p className='text-gray-500'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday :</p>
          {
            isEdit ?
            <input type="date"
            className='max-w-20 bg-gray-100'
            value={userData.dob}
            onChange={(e)=> setUserData(prev=> ({...prev, dob : e.target.value}))}
            />
            : <p className='text-gray-500'>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit
          ? <button
            className='border border-[#5f6fff] px-8 py-2 rounded-full hover:bg-[#5f6fff] hover:text-white transition-all  '
           onClick={()=>setIsEdit(false)}>Save Information</button>
          : <button
          className='border border-[#5f6fff] px-8 py-2 rounded-full hover:bg-[#5f6fff] hover:text-white transition-all'
            onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  );
};

export default MyPro;