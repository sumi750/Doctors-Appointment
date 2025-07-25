import { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';

const Navbar = () => {
    const {aToken, setAToken} = useContext(AdminContext);
    const{dToken, setDtoken} = useContext(DoctorContext);

    const navigate = useNavigate();

    const logout = ()=>{
      navigate('/')
      aToken && setAToken('') || dToken && setDtoken('');
      aToken && localStorage.removeItem('aToken') || dToken && localStorage.removeItem('dToken');
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white  '>
        <div className='flex items-center gap-2 text-xs'>
      <img className='w-36 cursor-pointer sm:w-40' src={assets.admin_logo} alt="" />
      <p className='border px-2.5 py-2.5 rounded-full border-gray-500'>{aToken ? "Admin" : "Doctor"}</p>
        </div>
        <button onClick={logout} className='bg-[#5f6fff] text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  );
};

export default Navbar;