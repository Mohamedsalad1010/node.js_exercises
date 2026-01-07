import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { errorHandling } from './middlewares/errorHandling.js'
import authRoute from './Routes/auth.js'
import adminRoute from './Routes/admin.js'
dotenv.config()
const app = express()
app.use(express.json())

const PORT = process.env.PORT ||5000


// use routes
app.use('/auth' , authRoute )
app.use('/admin' , adminRoute)

// use errorhandling
app.use(errorHandling)
// connect to moonse to db locallay
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('✅connect locally mongodb'))
.catch((err) => console.log('❌ no connect locally mongodb' ,err))

app.listen(PORT , ()=>{
    console.log(`server is running on  ${PORT} `)
})