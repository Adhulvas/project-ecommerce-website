import jwt from 'jsonwebtoken'

export const generateToken = (user,role)=>{
  try {
    const token = jwt.sign({ id: user._id, role:role },process.env.JWT_PASSWORD,{ expiresIn: '1h'})
    return token
  } catch (error) {
    console.log(error)
  }
}