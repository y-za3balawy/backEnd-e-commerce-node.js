

import mongoose, { Schema, Types, model } from "mongoose";



const tokenschema = new  Schema({

token:{
    require:true,
    type:String
}, 
user:{
    type:Types.ObjectId,
    ref:'user'
},
isvalid:{
    type:Boolean,
    default:false
},
agent:{
type:String
},
expiredat:{
    type:String
}

},{
    timestamps:true
})


export const  token_model   =  model( 'token' , tokenschema )