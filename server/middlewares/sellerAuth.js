import jwt from 'jsonwebtoken'

export const sellerAuth = (req,res,next)=>{
  try {
    const {token} = req.cookies

    if(!token){
      return res.status(401).json({message:'Unauthorized seller'})
    }

    const decodedToken = jwt.verify(token,process.env.JWT_PASSWORD)

    if(!decodedToken){
      return res.status(401).json({message:'admin not authorized'})
    }

    if(decodedToken.role !== 'seller' && decodedToken.role !== 'admin'){
      return res.status(400).json({message:'seller not authorized'})
    }

    req.seller = decodedToken
    next()
    
  } catch (error) {
    return res.status(500).json({message:'Internal server error'})
  }
}