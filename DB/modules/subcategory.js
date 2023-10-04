import mongoose, { Schema, Types, model } from "mongoose";






const  subcategory_schema = new Schema({
    
    name:{require:true , type:String},
    slug:{require:true , type:String},
    image:{

        url:{type:String , require:true}, 
        id:{type:String , require:true} 
       
    },
    categoryId:{
        type:Types.ObjectId,
        require:true,
        ref:'category'
    },
    createdBy:{
        require:true,
        type:Types.ObjectId,
        ref:'user'
    },
    Brand:{type: Types.ObjectId, ref:'Brand' , require:true} 

},{timestamps:true })


export const subcategory_model = mongoose.models.SubCategory || model("SubCategory", subcategory_schema)