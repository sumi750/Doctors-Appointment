import express from 'express';
import authDoctor from '../middleware/authDoctor.js';

import { doctorList, loginDoc,appoinmentsDoctors, appoinmentComplete, appoinmentCancel, docDashboard, doctorProfile,updateProfile} from '../controllers/doctorController.js';

const doctorRouter = express.Router();


doctorRouter.get('/list', doctorList);
doctorRouter.post('/doc-login', loginDoc);
doctorRouter.get('/appoinments',authDoctor, appoinmentsDoctors);
doctorRouter.post('/complete-appointment', authDoctor, appoinmentComplete);
doctorRouter.post('/canel-appointment', authDoctor, appoinmentCancel);
doctorRouter.get('/dashboard', authDoctor, docDashboard);
doctorRouter.get('/profile', authDoctor,doctorProfile);
doctorRouter.post('/profile-update', authDoctor,updateProfile);
export default doctorRouter