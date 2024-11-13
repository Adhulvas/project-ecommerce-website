import { connect } from 'mongoose';


export const connectDB = async() => {
  try {
    const response = await connect(process.env.MONGODB_URI)
    console.log('DB connected successfully')
    
  } catch (error) {
    console.log('DB connection failed')
  }
}