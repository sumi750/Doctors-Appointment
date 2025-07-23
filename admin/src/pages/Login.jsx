import React, { useContext, useState } from 'react';
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {

    const[state, setState] = useState('Admin');
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    const{setAToken,backendURl} = useContext(AdminContext); 
    const {setDtoken} = useContext(DoctorContext);

    const submitHandler = async (e)=>{
      e.preventDefault();

      try{
        if(state === 'Admin'){
          const{ data } = await axios.post(backendURl+'/api/admin/login-admin', {email, password});
          if(data.success){
            localStorage.setItem('aToken', data.token)
            setAToken(data.token);
          }
          else{
              toast.error(data.message);
          }
        }
        else{

          const {data} = await axios.post(backendURl+'/api/doctor/doc-login', {email, password});
          
          if(data.success){
            localStorage.setItem('dToken', data.token)
            setDtoken(data.token);
            console.log(data.token);
          }
          else{
              toast.error(data.message);
          }
        }
      }
      catch(err){
          toast.error(err.message);
      }
    }


  return (
   <form onSubmit={submitHandler} action="" className='min-h-[80vh] flex items-center'>
    <div className='flex flex-col gap-3 m-auto items-start p-8 sm:min-w-96 border rounded-xl text-[#5E5ESE] text-sm shadow-lg '>
      <p className='text-2xl font-semibold m-auto  '>
        <span className='text-[#5F6FFF]'>{state}</span> Login
      </p>
      <div className='w-full '>
        <p>Email</p>
        <input onChange={(e)=>setEmail(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email"  required />
      </div>
      <div className='w-full'>
        <p>Password</p>
        <input onChange={(e)=>setPassword(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password"  required />
      </div>
      <button className='bg-[#5f6fff] w-full text-white py-2 rounded-md text-base ' >Login</button>
      {
        state === 'Admin'
        ? <p>Doctor Login? <span onClick={()=>setState('Doctor')} className='text-[#5f6fff] underline cursor-pointer'>Click here</span></p>
        : <p>Admin Login? <span onClick={()=>setState('Admin')} className='text-[#5f6fff] underline cursor-pointer'>Click here</span></p>
      }
    </div>
   </form>
  );
};

export default Login;