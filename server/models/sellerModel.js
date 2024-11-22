import mongoose from 'mongoose'

const sellerSchema = new mongoose.Schema(
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
    mobileNumber:{
      type:String,
      required:false
    },
    profiePic:{
      type:String,
      default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
    }
 },
 {timestamps:true}
)

export const Seller = mongoose.model('Seller', sellerSchema)