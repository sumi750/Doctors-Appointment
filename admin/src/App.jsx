import React, { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom'
import  {AddDoctor, AllAppointments, DashBoard, DoctorList} from './pages/Admin/page'
import {DoctorAppointments, DoctorProfile, DoctorDashboard} from './pages/Doctor/page'
import { DoctorContext } from './context/DoctorContext';


const App = () => {

  const{aToken} = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext);


  return aToken || dToken ?  (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start '>
        <Sidebar />
        <Routes>

          {/* Admin Route  */}

          <Route path='/'  element={<></>}  />
          <Route path='/admin-dashboard'  element={<DashBoard />}  />
          <Route path='/all-appointments'  element={<AllAppointments />}  />
          <Route path='/add-doctor'  element={<AddDoctor />}  />
          <Route path='/doctor-list'  element={<DoctorList />}  />

          {/* Doctor Routes  */}

          <Route path='/doctor-dashbaord'  element={<DoctorDashboard />}  />
          <Route path='/doctor-appointments'  element={<DoctorAppointments />}  />
          <Route path='/doctor-profile'  element={<DoctorProfile />}  />
        </Routes>
      </div>
    </div>
  ) : (
    <>
    <Login />
    <ToastContainer />
    </>
  );
};

export default App;