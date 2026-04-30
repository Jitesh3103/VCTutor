import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

import express from "express"
import cors from "cors"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js" 
import adminRouter from "./routes/adminRoute.js";
import tutorRouter from "./routes/tutorsRoute.js";
import userRouter from "./routes/userRoute.js";
const app = express()
const port = process.env.PORT || 5000

connectDB() 
connectCloudinary()

//Middleware setup

app.use(express.json())
app.use(cors())
  
//Define API Routes
app.use('/api/admin',adminRouter)
app.use('/api/tutor',tutorRouter)
app.use('/api/user', userRouter)

//Root endpoint to check api status
app.get('/',(req,res)=>{
    res.send('API successfully connected!')
})

//Start the starter
app.listen(port, ()=>console.log(`Server is running on PORT: ${port}`))