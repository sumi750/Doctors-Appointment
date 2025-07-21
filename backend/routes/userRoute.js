import express from 'express';

import {registerUser, loginUser, getProfile, updateProfile, appointmentBook, userAppointment, cancelAppoointment, onlinePayment , verifyRazorpay} from '../controllers/userController.js'
import authUser from '../middleware/authUser.js';
import upload from '../middleware/mullter.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser ,getProfile);
userRouter.put('/update-profile', authUser,upload.single('image'),  updateProfile);
userRouter.post('/book-appointment', authUser, appointmentBook);
userRouter.get('/my-appoint', authUser, userAppointment );
userRouter.post('/cancel-appointment', authUser, cancelAppoointment);
userRouter.post('/payment', authUser, onlinePayment);
userRouter.post('/verifyPay', authUser, verifyRazorpay);


export default userRouter;