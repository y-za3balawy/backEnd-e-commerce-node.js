
import { Schema, Types, model } from "mongoose";



const  Product_schema =new  Schema({

name:{type:String , require:true , min:3 , max:20},
description:String,
image:[{
    id:{require:true ,  type:String},
    url:{require:true ,  type:String},

}],

AvailableItem:{type:Number ,  require:true , min:1},
SoldItem :{type:Number  ,default:0},
Price :{type:Number ,  require:true ,min:1},
Discount:{type:Number ,  min: 1 , max:100},
createdBy:{require:true , type:Types.ObjectId , ref:'user'} ,
category:{type:Types.ObjectId ,ref:"category"},
subcategory:{type:Types.ObjectId ,  ref:"SubCategory"},
Brand:{type:Types.ObjectId ,  ref:"SubCategory"},
cloudFolder:{type:String , require:true},
defaultImage:{
    id:{require:true ,  type:String},
    url:{require:true ,  type:String},

},
},{timestamps:true, strictQuery:true , toJSON:{virtuals:true}})

Product_schema.query.pignate= function (page) {
   page = !page||page<1||isNaN(page) ? 1 :page 
    const limit =2
const skip = (page-1)*limit 

   return  this.skip(skip).limit(limit)
}
Product_schema.query.costumselect= function (fields) {

    if(!fields) return this


   const modelkey =  Object.keys(Product_model.schema.paths)
   const  querykeys = fields.split()
 const  matchkeeys =  querykeys.filter((key)=>modelkey.includes(key))

return this.select(matchkeeys)

}

Product_schema.methods.inStock = function(quantity){
    return this.AvailableItem>= quantity ?true:false;
}


Product_schema.virtual('finalprice').get(function(){

    if(this.Price){
       return Number.parseFloat(
           this.Price -(this.Price * this.Discount || 0)/100
       ).toFixed(2)
   }
})

export const Product_model = model("Product" , Product_schema)


