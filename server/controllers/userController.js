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


export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user.id;

    if (!address) {
      return res.status(400).json({ success: false, message: "Address is required" });
    }

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Add the address to the user's addresses array
    user.addresses.push(address);
    await user.save();

    res.status(200).json({ success: true, data: user.addresses });
  } catch (error) {
    console.error("Error adding address:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const updateAddress = async (req, res) => {
  const { addressId } = req.params; 
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    const updatedAddress = {
      ...user.addresses[addressIndex],
      ...req.body 
    };


    user.addresses[addressIndex] = updatedAddress;


    await user.save();

    res.status(200).json({
      message: "Address updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteAddress = async(req,res)=>{
  const { addressId } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedAddresses = user.addresses.filter(
      (address) => address._id.toString() !== addressId
    );

    if (updatedAddresses.length === user.addresses.length) {
      return res.status(404).json({ message: "Address not found" });
    }

    user.addresses = updatedAddresses;
    await user.save();

    res.status(200).json({
      message: "Address deleted successfully",
      data: updatedAddresses,
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const userLogout = async(req,res)=>{
  try {
    res.clearCookie('token', {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    })
    res.json({ success:true, message:"Logout successful" })
    
  } catch (error) {
    res.status(500).json({message:error.message || "Internal server error"})
  }
}


export const updatePersonalDetails = async (req, res) => {
  const { name, gender, dob } = req.body;
  const userId = req.user.id

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, gender, dob },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update personal details' });
  }
}


export const updateLoginDetails = async (req, res) => {
  const userId = req.user.id
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const hashedPassword = newPassword ? await bcrypt.hash(newPassword, 10) : undefined;

    user.email = email || user.email;
    user.password = hashedPassword || user.password;

    await user.save();

    res.status(200).json({ message: 'Credentials updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update credentials' });
  }
}


export const deleteUserAccount = async (req,res) => {
  try {
    const userId = req.user.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.clearCookie('token', {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    })

    res.status(200).json({ success:true, message:'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const checkUser = async(req,res)=>{
  try {
    res.json({ success:true, message:"user authorized" }) 
  } catch (error) {
    res.status(500).json({message:error.message || "Internal server error"})
  }
}