import jwt from 'jsonwebtoken'

export const adminAuth = (req,res,next)=>{
  try {
    const {token} = req.cookies

    if(!token){
      return res.status(401).json({message:'Unauthorized admin'})
    }

    const decodedToken = jwt.verify(token,process.env.JWT_PASSWORD)
    console.log("Decoded Token:", decodedToken);


    if(!decodedToken){
      return res.status(401).json({message:'admin not authorized'})
    }

    if(decodedToken.role !== 'admin'){
      return res.status(400).json({message:'admin not authorized'})
    }

    req.admin = decodedToken
    next()
    
  } catch (error) {
    return res.status(500).json({message:'Internal server error'})
  }
}