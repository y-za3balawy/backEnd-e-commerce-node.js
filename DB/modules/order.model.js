import { Schema, Types, disconnect, model } from "mongoose";





const orderschena =new  Schema({
    user:{
        type:Types.ObjectId,
        ref:'user',
        unique:true,
        require:true
    },
    product:[{
        // _id:false
     productID:{type:Types.ObjectId , ref:'Product'},
     quantity:{type:Number ,min:1},
  name:{type:String}  ,
     itemprice:Number,   
     totalprice:Number,   
    }],
    invoice:{id:String, url:String},
    address:{
        type:String,
        require:true
    },
    phone:{type:String,
    require:true},
    price:{type:Number,
        require:true},

        coupon:{
      id:{type:Types.ObjectId , ref:'coupon'},
      name:String,
      discount:{type:Number , min:1 ,  max:100}
        },
        status:{
            type:String,
            enum:['placed', "shapped" ,  "delivered" , 'canceled' , 'refunded' ],
            default:"placed"
        },
        payment:{
            type:String,
            enum:['visa', 'cash' ],
            default:"cash"

        }

}, {timestamps:true  })


orderschena.virtual('orderPrice').get(function(){

     if(this.coupon){
        return Number.parseFloat(
            this.price -(this.price * this.coupon.discount )/100
        ).toFixed(2)
    }else{
        return this.price
    }
})


export const orderModel = model( 'order', orderschena)