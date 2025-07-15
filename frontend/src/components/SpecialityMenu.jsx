import React from 'react';
import {specialityData} from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return ( 
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-600 ' >
      <h1 className='text-3xl font-medium'>Find by Speciality </h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
      <div className='flex flex-wrap sm:justify-center gap-4 w-full overflow-scroll scrollbar-hide' >
          {specialityData.map((item) => (
            <Link onClick={()=>onscroll(0,0)}  className='flex flex-col items-center cursor-pointer text-xs flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 ' to={`/doctors/${item.speciality}`} key={item.speciality} >
              <img className='w-16 sm:w-24 mb-2' src={item.image} alt={item.speciality}  />
              <h2>{item.speciality}</h2>
            </Link>
          ))}
       
      </div>
    </div>
  );
};

export default SpecialityMenu;