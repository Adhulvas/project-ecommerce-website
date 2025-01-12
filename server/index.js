import express from 'express'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import { apiRouter } from './router/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()

const app = express()
const port = 3000

app.use(express.json())
app.use(cors({
  origin:["http://localhost:5173","https://project-ecommerce-website-client.vercel.app"],
  credentials:true,
  methods: ["GET","POST","PUT","PATCH","DELETE"]
}))
app.use(cookieParser())

connectDB()

app.get("/", (req, res) => {
  res.send( "Hello world" );
});


app.use('/api', apiRouter)

app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})


app.all("*",(req,res)=>{
  res.status(404).json({message:'endpoint does not exist'})
})