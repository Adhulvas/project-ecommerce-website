import jwt from 'jsonwebtoken'

export const userAuth = (req,res,next)=>{
  try {
    const {token} = req.cookies

    if(!token){
      return res.status(401).json({message:'Unauthorized user'})
    }

    const decodedToken = jwt.verify(token,process.env.JWT_PASSWORD)

    if(!decodedToken){
      return res.status(401).json({message:'user not authorized'})
    }

    req.user = decodedToken

    if(decodedToken.role !== 'user') {
      return res.status(403).json({ message: 'Access forbidden, only users are allowed' });
    }
    next()
    
  } catch (error) {
    return res.status(500).json({message:'Internal server error'})
  }
}