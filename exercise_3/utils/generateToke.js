import jwt from 'jsonwebtoken'

export const generateToken = (userId) => {
 return jwt.sign({userId }, process.env.JWB_TOKEN , {expiresIn: '2d'})
    
 }
