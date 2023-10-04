


import  mongoose, { Schema, Types  , model} from "mongoose";
 



const Brand_schema =  new Schema({

    name:{require:true , type:String},
    slug:{require:true , type:String},
    image:{

        url:{type:String , require:true}, 
        id:{type:String , require:true} 
       
    },
    createdBy:{type: Types.ObjectId, ref:'user' , require:true} 



},{timestamps:true , toJSON:{virtuals:true} , toObject:{virtuals:true}})

// Brand_schema.virtual("Brand" , {
//     ref:"Brand",
//     localField:'_id',
//     foreignField:'BrandId'

// })

export const  Brand_model   =  model( 'Brand' , Brand_schema )