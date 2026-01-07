import express from 'express'
import {  protectedRoute  } from '../controllers/auth.js'
import { authorize } from '../middlewares/authorize.js'
const router = express.Router()

router.get('/dashboard' ,  protectedRoute ,   authorize('admin' ) , (req , res)=> {
    res.json(`welcome admin dashboard! ${req.user.name}`)
})


export default router