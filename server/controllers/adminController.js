import { Admin } from "../models/adminModel.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/token.js"

export const adminSignup  = async(req,res,next)=>{
  try {
    const {name,email,password}=req.body

    if(!name || !email || !password){
      return res.status(400).json({message:'all fields required'})
    }

    const adminExist = await Admin.findOne({email})

    if(adminExist){
      return res.status(400).json({message:'admin already exists'})
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const newAdmin = new Admin({name,email,password:hashPassword})
    await newAdmin.save()

    const token = generateToken(newAdmin,'admin')

    res.cookie('token',token)

    res.status(200).json({ success:true, message:'signup successful' })

  } catch (error) {
    res.status(500).json({message:error.message || 'Internal server error:'})
  }
}

export const adminLogin = async(req,res,next)=>{
  try {
    const {email,password} = req.body

    if( !email || !password ){
      return res.status(400).json({message:'all fields required'})
    }

    const adminExist = await Admin.findOne({email})

    if(!adminExist){
      return res.status(400).json({message:'admin does not exist'})
    }

    const matchedPassword = bcrypt.compareSync(password,adminExist.password)

    if(!matchedPassword){
      return res.status(400).json({message:'Invalid Admin'})
    }

    const token = generateToken(adminExist,'admin')

    res.cookie('token',token)

    res.json({ success:true, message:'Login successful' })

  } catch (error) {
    res.status(500).json({message:error.message || 'Internal server error'})
  }
}


export const adminProfile = async(req,res,next)=>{
  try {

    const adminId = req.admin.id

    const adminProfile = await Admin.findById(adminId).select("-password")

    if (!adminProfile) {
      return res.status(404).json({ success: false, message:'Admin not found' });
    }

    res.json({ success:true, data:adminProfile })
    
  } catch (error) {
    res.status(500).json({message:error.message || 'Internal server error'})
  }
}


export const adminLogout = async(req,res,next)=>{
  try {
    res.clearCookie('token')
    res.json({ success:true, message:"Logout successful" })
    
  } catch (error) {
    res.status(500).json({message:error.message || "Internal server error"})
  }
}


export const updateAdminProfile = async (req,res,next)=>{
  try {
    const { name, email, mobileNumber, address } = req.body;
    const adminId = req.admin.id;

    if (!name && !email && !mobileNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { name, email, mobileNumber, address },
      { new: true, runValidators: true }
    );

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ success:true, message:'Profile updated successfully',admin });
    
  } catch (error) {
    res.status(500).json({ message:'Server error',error });
  }
};


export const deleteAdminAccount = async (req, res) => {
  try {
    const adminId = req.admin.id;


    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.clearCookie('token')

    res.status(200).json({ success:true, message:'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



export const checkAdmin = async(req,res,next)=>{
  try {
    res.json({ success:true, message:"Admin authorized" })
    
  } catch (error) {
    res.status(500).json({message:error.message || "Internal server error"})
  }
}