


import  mongoose, { Schema, Types  , model} from "mongoose";
 



const category_schema =  new Schema({

    name:{require:true , type:String},
    slug:{require:true , type:String},
    image:{

        url:{type:String , require:true}, 
        id:{type:String , require:true} 
       
    },
    createdBy:{type: Types.ObjectId, ref:'user' , require:true} ,
    BrandId:{type: Types.ObjectId, ref:'Brand' , require:true} 



},{timestamps:true , toJSON:{virtuals:true} , toObject:{virtuals:true}})

category_schema.virtual("SubCategory" , {
    ref:"SubCategory",
    localField:'_id',
    foreignField:'categoryId'

})


export const  category_model   =  model( 'category' , category_schema )