import { token_model } from "../DB/modules/token.module.js";
import { errorhandling } from "../utilites/asyncErrorhandler.js";
import  Jwt  from 'jsonwebtoken';
import { user_model } from './../DB/modules/user.js';

 
 export const  authentication = errorhandling(async(req,res,next)=>{
const {token}  =  req.headers 

if(!token){
    next(new Error('token required'))
}
const check_token =  await token_model.findOne({token})

if(!check_token){
    next(new Error('token expired'))
}
const decoded =  Jwt.verify(token , process.env.key)

if(!decoded){
    next(new Error('invalid token'))
}
const user = await user_model.findOne({_id:decoded.id})
if(!user){
    next(new Error('user not found'))
}
// res.json({message:'done' , decoded})

req.user = user


return next()
})