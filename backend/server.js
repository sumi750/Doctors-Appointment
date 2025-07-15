import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDb from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';


//app Config 
const app = express();
const port = process.env.PORT || 3005
connectDb();
connectCloudinary();


//middleware
app.use(express.json()); 
app.use(cors());

//api Endpoint
app.use('/api/admin', adminRouter)  //localhost:3005/api/admin/add-doctor


app.get('/', (req,res)=>{
    res.send("hello h guys ");
})

app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
})