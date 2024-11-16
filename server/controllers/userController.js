import { User } from "../models/userModel.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/token.js"

export const userSignup  = async(req,res)=>{
  try {
    const {name,email,password}=req.body

    if(!name || !email || !password){
      return res.status(400).json({message:'all fields required'})
    }

    const userExist = await User.findOne({email})

    if(userExist){
      return res.status(400).json({message:'user already exists'})
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({name,email,password:hashPassword})
    await newUser.save()

    const token = generateToken(newUser,'user')

    res.cookie('token',token)

    res.status(200).json({ success:true, message:'signup successful' })

  } catch (error) {
    res.status(500).json({message:error.message || 'Internal server error'})
  }
}


export const userLogin = async(req,res)=>{
  try {
    const {email,password} = req.body

    if( !email || !password ){
      return res.status(400).json({message:'all fields required'})
    }

    const userExist = await User.findOne({email})

    if(!userExist){
      return res.status(400).json({message:'user does not exist'})
    }

    const matchedPassword = bcrypt.compareSync(password,userExist.password)

    if(!matchedPassword){
      return res.status(400).json({message:'Invalid User'})
    }

    const token = generateToken(userExist,'user')

    res.cookie('token',token)

    res.json({ success:true, message:'Login successful' })

  } catch (error) {
    res.status(500).json({message:error.message || 'Internal server error'})
  }
}


export const userProfile = async(req,res)=>{
  try {

    const userId = req.user.id

    const userProfile = await User.findById(userId).select("-password")

    if (!userProfile) {
      return res.status(404).json({ success: false, message:'User not found' });
    }

    res.json({ success:true, data:userProfile })
    
  } catch (error) {
    res.status(500).json({message:error.message || 'Internal server error'})
  }
}


export const userLogout = async(req,res,next)=>{
  try {
    res.clearCookie('token')
    res.json({ success:true, message:"Logout successful" })
    
  } catch (error) {
    res.status(500).json({message:error.message || "Internal server error"})
  }
}


export const updateUserProfile = async (req,res)=>{
  try {
    const userId = req.user.id;
    const { name, email, mobileNumber,address } = req.body;

    if (!name && !email && !mobileNumber) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, mobileNumber, address },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success:true, message:'Profile updated successfully',user });

  } catch (error) {
    res.status(500).json({ message:'Server error', error:error.message });
  }
};


export const deleteUserAccount = async (req,res) => {
  try {
    const userId = req.user.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.clearCookie('token')

    res.status(200).json({ success:true, message:'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const checkUser = async(req,res,next)=>{
  try {
    res.json({ success:true, message:"user authorized" }) 
  } catch (error) {
    res.status(500).json({message:error.message || "Internal server error"})
  }
}