import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  addressTitle: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber:{
    type:Number,
    required:false
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const userSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      trim:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
      type:String,
      required:true
    },
    profiePic:{
      type:String,
      default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
    },
    addresses: [addressSchema],
 },
 {timestamps:true}
)

export const User = mongoose.model('User', userSchema)