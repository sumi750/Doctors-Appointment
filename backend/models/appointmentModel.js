import mongoose from "mongoose"; 

const appointmentSchema = new mongoose.Schema({
    userId : {type : String, required : true},
    docId : {type : String, required : true},
    slotDate : {type : String, required : true},
    slotTime : {type : Object, required : true},
    userData : {type : Object, required : true},
    docData : {type : Object, required : true},
    amount : {type : Number, required : true},
    date : {type : Number, required : true},
    canceled : {type : Boolean, default : false},
    payment : {type : Boolean, default : false},
    isCompleted : {type : Boolean, default : false},
    expiresAt: { type: Date, default: null, index: { expires: 0 } },
})

const appointmentModel = mongoose.model.appointment || mongoose.model('appointment',appointmentSchema)
export default appointmentModel