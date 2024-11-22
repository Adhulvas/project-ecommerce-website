import express from 'express'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import { apiRouter } from './router/index.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const port = 3000
connectDB()


app.use(express.json())
app.use(cookieParser())


app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})

app.use('/api', apiRouter)

app.all("*",(req,res)=>{
  res.status(404).json({message:'endpoint does not exist'})
})