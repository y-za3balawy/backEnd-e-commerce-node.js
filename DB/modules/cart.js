
import mongoose, { Schema, Types, model } from 'mongoose';

const cartSchema = new Schema({

user:{
    type:Types.ObjectId,
    ref:'user',
    unique:true,
    require:true
},
product:[{
    // _id:false
 productID:{type:Types.ObjectId , ref:'Product'},
 quantity:{type:Number}   
}]

}, {timestamps:true})


export const cartModel = model('cart' , cartSchema)