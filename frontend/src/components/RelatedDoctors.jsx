import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

function RelatedDoctors({docId, speciality}) {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    const[relDoc, setRelDoc] = useState([]);

    useEffect(()=>{

        if(doctors.length > 0 && speciality) {
            const relatedDoctors = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId);
            setRelDoc(relatedDoctors);
        }

    }, [docId, doctors, speciality])

  return (
     <div className='flex flex-col items-center gap-4 my-10 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Related Doctors</h1>
        <p className='sm:w-1/3 text-center text-sm '>Simply browse through our extensive list of trusted doctors.</p>
        
           <div className='w-full grid [grid-template-columns:repeat(auto-fill,_minmax(200px,_1fr))] gap-6 pt-5 gap-y-6 px-3 sm:px-0 overflow-scroll scrollbar-hide'>
                {relDoc.slice(0,5).map((relDoc) => (
                    <div onClick={()=>{navigate(`/appointment/${relDoc._id}`); scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={relDoc._id} >
                        <img className='bg-blue-50' src={relDoc.image} alt={relDoc.name}  />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-green-500 text-center'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{relDoc.name}</p>
                            <p className='text-gray-600 text-sm'>{relDoc.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>


           
    </div>
  )
}

export default RelatedDoctors