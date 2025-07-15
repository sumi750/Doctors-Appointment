import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext,useState } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';


const Doctors = () => {
  const {speciality} = useParams();
  const[filterDoctors, setFilterDoctors] = useState([]);
  const[showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const {doctors} = useContext(AppContext);

  const applyFilter = () => {
    if(speciality) {
      const filtered = doctors.filter((doctor) => doctor.speciality.toLowerCase() === speciality.toLowerCase());
      setFilterDoctors(filtered);
    } else {
      setFilterDoctors(doctors);
    }
  }

  useEffect(()=>{
    applyFilter();
  },[doctors, speciality])


  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col items-start gap-5 mt-5 sm:flex-row'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#5f6fff] text-white' : '' } `} onClick={()=>setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 mt-3 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-94vw s:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all  cursor-pointer ${speciality === 'General physician' ? "bg-indigo-100  text-black" : '' }`}>General physician</p>
          <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-94vw s:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all  cursor-pointer ${speciality === 'Gynecologist' ? "bg-indigo-100 text-black" : '' }`}>Gynecologist</p>
          <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-94vw s:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all  cursor-pointer ${speciality === 'Dermatologist' ? "bg-indigo-100 text-black" : '' }`}>Dermatologist</p>
          <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-94vw s:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all  cursor-pointer ${speciality === 'Pediatricians' ? "bg-indigo-100 text-black" : '' }`}>Pediatricians</p>
          <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-94vw s:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? "bg-indigo-100 text-black" : '' }`}>Neurologist</p>
          <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw s:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all  cursor-pointer ${speciality === 'Gastroenterologist' ? "bg-indigo-100 text-black" : '' }`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid [grid-template-columns:repeat(auto-fill,_minmax(200px,_1fr))] gap-6 pt-5 gap-y-6 px-3 sm:px-0 overflow-scroll scrollbar-hide'>
            {
              filterDoctors.map((doctor) => (
                    <div onClick={()=>navigate(`/appointment/${doctor._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={doctor._id} >
                        <img className='bg-blue-50' src={doctor.image} alt={doctor.name}  />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-green-500 text-center'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{doctor.name}</p>
                            <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
                        </div>
                    </div>
                ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;