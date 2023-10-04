import { Schema, Types , model } from "mongoose";





const couponSchema = new Schema({

    name:{require:true , type:String},
    Discount:{type:Number ,  min: 1 , max:100},
    expiredAt:Number,
    
createdBy:{require:true , type:Types.ObjectId , ref:'user'} ,

},{timestamps:true})


export const coupon_model =  model("coupon" ,  couponSchema)