import { errorhandling } from "../../utilites/asyncErrorhandler.js"

import voucher_codes  from 'voucher-code-generator'
import { coupon_model } from './../../DB/modules/coupon.js';

const addcoupon = errorhandling(async(req,res,next)=>{
const  code = voucher_codes.generate({length:5})


const  data =  await coupon_model.create({name:code[0] , Discount: req.body.Discount,  createdBy: req.user._id ,
    
    expiredAt: new Date(req.body.expiredAt).getTime()})

if(!data){
    return  next(new Error('cant create coupon'))
}else{
    return    res.json({message:'done' , data})
}
})


const UpdateCoupon = errorhandling(async(req,res,next)=>{


const check =  await coupon_model.findOne({name:req.params.code , expiredAt: {$gt:Date.now()}})

if(!check){
    return  next(new Error('coupon not found'))
}

const data =  await coupon_model.findByIdAndUpdate(check.id,{Discount :req.body.Discount,expiredAt: new Date(req.body.expiredAt).getTime()})


if(!data){
    return   next(new Error('cant update this coupon'))
}else{
    return   res.json({message:'done' , data})


}



})


const deletecoupon =  errorhandling(async (req,res,next)=>{
    const check =  await coupon_model.findOne({name:req.params.code})

    if(!check){
        return    next(new Error('coupon not found'))
    }
if(req.user._id != check.createdBy.toString()  )
return next(new Error('owner only who can delete this coupon'))

const  data = await coupon_model.findByIdAndDelete(check.id)

if(!data){
    return  next(new Error('cant update this coupon'))
}else{
    return res.json({message:'done' , data})


}


})


const allCoupons = errorhandling(async(req,res,next)=>{


const  data = await coupon_model.find()

if(!data){
    return next(new Error('cant update this coupon'))
}else{
    return  res.json({message:'done' , data})


}


})

export{

    addcoupon,
    UpdateCoupon,
    deletecoupon,
    allCoupons

}