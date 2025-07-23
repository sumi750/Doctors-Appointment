import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

const TopDoctors = () => {

    const navigate = useNavigate();
    const{doctors} = useContext(AppContext);

  return ( 
    <div className='flex flex-col items-center gap-4 my-10 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm '>Simply browse through our extensive list of trusted doctors.</p>
        
            <div className='w-full grid [grid-template-columns:repeat(auto-fill,_minmax(200px,_1fr))] gap-6 pt-5 gap-y-6 px-3 sm:px-0 overflow-scroll scrollbar-hide'>
                {doctors.slice(0,10).map((doctor) => (
                    <div onClick={()=>navigate(`/appointment/${doctor._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={doctor._id} >
                        <img className='bg-blue-50' src={doctor.image} alt={doctor.name}  />
                        <div className='p-4'>
                            <div className={`flex items-center gap-2 text-sm ${doctor.available ? 'text-green-500' : 'text-gray-500'}  text-center`}>
                                <p className={`w-2 h-2 ${doctor.available ? 'bg-green-500 ': 'bg-gray-500' } rounded-full `}></p><p>{doctor.available ? 'Avilable' : 'Not Avilable'}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
                            <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={()=>navigate('/doctors')} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>More</button>
    </div>
  );
};

export default TopDoctors;