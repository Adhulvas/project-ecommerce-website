import { Seller } from "../models/sellerModel.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/token.js"

export const sellerSignup  = async(req,res,next)=>{
  try {
    const {name,email,password}=req.body

    if(!name || !email || !password){
      return res.status(400).json({message:'all fields required'})
    }

    const sellerExist = await Seller.findOne({email})

    if(sellerExist){
      return res.status(400).json({message:'seller already exists'})
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const newSeller = new Seller({name,email,password:hashPassword})
    await newSeller.save()

    const token = generateToken(newSeller,'seller')

    res.cookie('token',token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    })

    res.status(200).json({ success:true, message:'signup successful' })

  } catch (error) {
    res.status(500).json({message:error.message || 'Internal server error'})
  }
}

export const sellerLogin = async(req,res,next)=>{
  try {
    const {email,password} = req.body

    if( !email || !password ){
      return res.status(400).json({message:'all fields required'})
    }

    const sellerExist = await Seller.findOne({email})

    if(!sellerExist){
      return res.status(400).json({message:'seller does not exist'})
    }

    const matchedPassword = bcrypt.compareSync(password,sellerExist.password)

    if(!matchedPassword){
      return res.status(400).json({message:'Invalid Seller'})
    }

    const token = generateToken(sellerExist,'seller')

    res.cookie('token',token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    })

    res.json({ success:true, message:'Login successful' })

  } catch (error) {
    res.status(500).json({message:error.message || 'Internal server error'})
  }
}


export const sellerProfile = async(req,res,next)=>{
  try {

    const sellerId = req.seller.id

    const sellerProfile = await Seller.findById(sellerId).select("-password")

    if (!sellerProfile) {
      return res.status(404).json({ success: false, message:'Seller not found' });
    }

    res.json({ success:true, data:sellerProfile })
    
  } catch (error) {
    res.status(500).json({message:error.message || 'Internal server error'})
  }
}


export const sellerLogout = async(req,res,next)=>{
  try {
    res.clearCookie('token',token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    })
    res.json({ success:true, message:"Logout successful" })
    
  } catch (error) {
    res.status(500).json({message:error.message || "Internal server error"})
  }
}


export const updateSellerProfile = async (req,res,next)=>{
  try {
    const { name, email, mobileNumber, address } = req.body;
    const sellerId = req.seller.id;

    if (!name && !email && !mobileNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const seller = await Seller.findByIdAndUpdate(
      sellerId,
      { name, email, mobileNumber, address },
      { new: true, runValidators: true }
    );

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json({ success:true, message:'Profile updated successfully',seller });
    
  } catch (error) {
    res.status(500).json({ message:'Server error',error });
  }
};


export const deleteSellerAccount = async (req, res) => {
  try {
    const sellerId = req.seller.id;


    const deletedSeller = await Seller.findByIdAndDelete(sellerId);

    if (!deletedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.clearCookie('token',token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    })

    res.status(200).json({ success:true, message:'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



export const checkSeller = async(req,res,next)=>{
  try {
    res.json({ success:true, message:"seller authorized" })
    
  } catch (error) {
    res.status(500).json({message:error.message || "Internal server error"})
  }
}