import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios'

const AddDoctor = () => {

    const[docImg, setDocImg] = useState(false);
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[experience, setExperience] = useState('1 Year');
    const[fee, setFee] = useState('');
    const[about, setAbout] = useState('');
    const[speciality, setSpeciality] = useState('General physician');
    const[degree, setDegree] = useState('');
    const[adress1, setAdress1] = useState('');
    const[adress2, setAdress2] = useState('');

    const{aToken, backendURl } = useContext(AdminContext);



    const onSubmitHandler = async (e)=>{
        e.preventDefault();

        try{

            if(!docImg){
                return toast.error("Image not Selected ");
            }

            const formData = new FormData();

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fee))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({line1 : adress1, line2 : adress2}))

            const { data } = await axios.post(backendURl+'/api/admin/add-doctor', formData , {headers:{ aToken }});
            if(data.success){
                toast.success(data.message);
                setDocImg(false);
                setName('');
                setPassword('');
                setEmail('');
                setAdress1('');
                setAdress2('');
                setDegree('');
                setAbout('');
                setFee('');
            }
            else{
                toast.error(data.message);
            }

        }
        catch(error){
            toast.error(error.message);
            console.log(error);
        }
    }


  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
        <p className='mb-3 text-lg font-medium'>Add-Doctor</p>
        

        <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
            <div className='flex items-center gap-4 mb-8 text-gray-500'>
                <label htmlFor="doc-img">
                    <img className='w-16 bg-gray-600 cursor-pointer rounded-full ' src={ docImg ? URL.createObjectURL(docImg)  : assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setDocImg(e.target.files[0])}  type="file" id="doc-img" hidden/>
                <p>Upload doctor <br />Picture </p>
            </div>

            <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                <div className='w-full lg:flex-1 flex flex-col gap-4'>

                    <div className='flex-1 flex-col gap-1'>
                        <p>Doctor Name</p>
                        <input onChange={(e)=> setName(e.target.value)}  value={name}
                         className='border rounded px-3 py-2' type="text"  placeholder='Name'  required/>
                    </div>

                    <div className='flex-1 flex-col gap-1'>
                        <p>Doctor Email</p>
                        <input onChange={(e)=> setEmail(e.target.value)}  value={email}
                         className='border rounded px-3 py-2' type="email" placeholder='Email'  required/>
                    </div>
                    
                    <div className='flex-1 flex-col gap-1' >
                        <p>Doctor Password</p>
                        <input  onChange={(e)=> setPassword(e.target.value)}  value={password}
                        className='border rounded px-3 py-2' type="password" placeholder='Pasword'  required/>
                    </div>

                    <div className='flex-1 flex-col gap-1'>
                        <p>Experience</p>
                        <select onChange={(e)=> setExperience(e.target.value)}  value={experience} className='border rounded px-17 py-2'>
                            <option value="1 Year">1 Year</option>
                            <option value="2 Year">2 Year</option>
                            <option value="3 Year">3 Year</option>
                            <option value="4 Year">4 Year</option>
                            <option value="5 Year">5 Year</option>
                            <option value="6 Year">6 Year</option>
                            <option value="7 Year">7 Year</option>
                            <option value="8 Year">8 Year</option>
                            <option value="9 Year">9 Year</option>
                            <option value="10 Year">10 Year</option>
                        </select>
                    </div>

                     <div className='flex-1 flex-col gap-1'>
                        <p>Fees</p>
                        <input onChange={(e)=> setFee(e.target.value)}  value={fee}
                        className='border rounded px-3 py-2' type="Number" placeholder='Fees'  required/>
                    </div>

                </div>

                <div className='w-full lg:flex-1 flex flex-col gap-4'>
                    <div className='flex-1 flex-col gap-1'>
                        <p>Speciatlty </p>
                        <select onChange={(e)=> setSpeciality(e.target.value)}  value={speciality} className='border rounded px-3 py-2' >
                            <option value="General physician">General physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>

                    <div className='flex-1 flex-col gap-1'>
                        <p>Education</p>
                        <input onChange={(e)=> setDegree(e.target.value)}  value={degree}
                         className='border rounded px-3 py-2' type="text" placeholder='Education ' required/>
                    </div>

                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Address</p>
                        <input onChange={(e)=> setAdress1(e.target.value)}  value={adress1}
                         className='border rounded px-3 py-2' type="text" id='adress1'  placeholder='Address 1' required />
                        <input onChange={(e)=> setAdress2(e.target.value)}  value={adress2}
                         className='border rounded px-3 py-2' type="text" id='adress2' placeholder='Address 2' required />
                    </div>
                </div>
            </div>

                <div>
                    <p className='mt-4 mb-2 '>About Doctor </p>
                    <textarea onChange={(e)=> setAbout(e.target.value)}  value={about}
                     className='w-full px-4 pt-2 border rounded '   placeholder='write about doctor ' rows={5}></textarea>
                </div>

            <button type='submit' className='bg-[#5f6fff] px-10 py-3 mt-4 text-white rounded-full cursor-pointer'>Add Doctor </button>
        </div>
    </form>
  );
};

export default AddDoctor;
