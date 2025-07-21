import express from 'express';

import { addDoctor,allDoctors,loginAdmin , appointmentAdmin, cancelAppoointmentAdmin, dashboard} from '../controllers/adminController.js';
import upload from '../middleware/mullter.js';
import authAdmin from '../middleware/authAdmin.js';
import { changeAvilabe } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login-admin', loginAdmin); 
adminRouter.post('/doctor-list',authAdmin, allDoctors);
adminRouter.post('/change-available', authAdmin, changeAvilabe);
adminRouter.get('/all-appoinment', authAdmin, appointmentAdmin);
adminRouter.post('/cancel-appoinment', authAdmin, cancelAppoointmentAdmin);
adminRouter.get('/dashboard', authAdmin, dashboard);

export default adminRouter;   