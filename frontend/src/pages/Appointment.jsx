import React, { useState, useEffect,useContext} from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';


const Appointment = () => {
  const {docId} = useParams();
  const {doctors, currenySymnol} = useContext(AppContext);

  const dayaOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const[docInfo, setDocInfo] = useState(null);

  const[docSlot, setDocSlot] = useState([])
  const[slotIndex, setSlotIndex] = useState(0);
  const[slotTime, setSlotTime] = useState('');

  useEffect(() => {
    const fetchDocInfo = async () => {
      const foundDoc = doctors.find(doc => doc._id === docId);
      if (!foundDoc) {
        console.error('Doctor not found');
        return;
      }
      setDocInfo(foundDoc);
    };

    fetchDocInfo();
    
  }, [docId, doctors]);

  const getAvilableSlots = async () => {
    setDocSlot([])

    //getting current date
    let today = new Date();

    for( let i = 0; i < 7; i++) {

      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);


      //setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i); 
      endTime.setHours(21,0,0,0); // 9 PM

      //setting hours
      if(today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10); // start from next hour
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0); // set minutes to 0
      }
      else{
        currentDate.setHours(10); // 10 AM
        currentDate.setMinutes(0); // 0 minutes
      }

      let timeSlots = [];

      while(currentDate < endTime){
        let formatedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        //add slot to array
        timeSlots.push({
          datetime : new Date(currentDate),
          time: formatedTime,
        
        });

        //increment the time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlot(prev => ([...prev, timeSlots]))

    }
  }

  useEffect(()=>{
    console.log(docSlot);
  }, [docSlot]);

  useEffect(()=>{
    getAvilableSlots();
  }, [docInfo])

    if (!docInfo) {
    return <div className="text-center py-10 text-gray-500">Loading doctor info...</div>;
  }

 

  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        {/* doctor detail  */}
        <div>
          <img className='bg-[#5f6fff] w-full sm:max-w-72 rounded-lg ' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white shadow-lg mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

          {/* doctor info  */} 
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900 '>{docInfo.name}
          <img className='w-5' src={assets.verified_icon} alt="" />
          </p> 
            <div className='flex items-center gap-2 text-gray-600 text-sm mt-1'>
              <h2>{docInfo.degree} - {docInfo.speciality}</h2>
              <button className='py-0.5 px-2 border text-xs rounded-full'>🧑‍⚕️{docInfo.experience}</button>
            </div>


               {/* doctor about    */}
               <div>
                <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
                <p className='text-gray-600 max-w-[700px] mt-1 text-sm '>{docInfo.about}</p>
               </div>

               <p className='text-gray-800 font-medium  mt-4'>
                Appointment fees: <span className='text-gray-600'>{currenySymnol}{docInfo.fees}</span> 
                </p>
        </div>
      </div>

      {/* booking Slot  */}

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p className='text-xl text-gray-800'>Booking Slot</p>
        <div className='flex items-center  gap-3 w-full overflow-x-scroll mt-4'>
          { docSlot.length && docSlot.map((item, index)=>(
            <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#5f6fff] text-white' : 'border border-gray-250'}`} key={index}>
              <p>{item[0] && dayaOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>

          ))
        }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
              docSlot.length && docSlot[slotIndex].map((item, index)=>(
                <p  onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 border rounded-full cursor-pointer  ${item.time === slotTime ? 'bg-[#5f6fff] text-white' : 'border border-gray-250'} `} key={index}>
                  { item.time.toLowerCase()}
                </p>
              ))}
        </div>
            <button className='bg-[#5f6fff] text-white text-sm font-light px-14 py-3 rounded-full my-6 '>Book Appointment </button>
      </div>

      <RelatedDoctors docId = {docId} speciality = {docInfo.speciality} />
    </div>
  );
};

export default Appointment;