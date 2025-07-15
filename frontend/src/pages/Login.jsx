import React from 'react';
import { useState } from 'react';

const Login = () => {
  const[state, setState] = useState('Sign Up');

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[name, setName] = useState('');



  const onSubmit = async(e)=>{
    e.preventDefault();
    
  }



  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col items-start gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg   '>
        <p className='font-semibold text-2xl'>{state === 'Sign Up' ? 'Create account ' : 'Login '}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'login'} to book appointment</p>
        {
          state === 'Sign Up' ? <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)}
          value={name}
          required
          />
        </div> : null
          
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)}
          value={email}
          required
          />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)}
          value={password}
          required
          />
        </div>
        <button className='bg-[#5f6fff] text-white w-full py-2 rounded-md text-base '>{state === 'Sign Up' ? 'Create account ' : 'Login '}</button>
        {
          state === 'Sign Up' 
          ? <p className='text-sm text-gray-500'>Already have an account? <span onClick={()=>setState('Login')} className='text-[#5f6fff] underline cursor-pointer'>Login</span></p>
          : <p className='text-sm text-gray-500'>Don't have an account? <span onClick={()=>setState('Sign Up')} className='text-[#5f6fff] underline cursor-pointer'>Sign Up</span></p>
        }
      </div>

    </form>
  );
};

export default Login;