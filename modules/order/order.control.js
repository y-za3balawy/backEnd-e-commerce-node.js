
import { cartModel } from "../../DB/modules/cart.js";
import { coupon_model } from "../../DB/modules/coupon.js";
import { orderModel } from "../../DB/modules/order.model.js";
import { createInvoice } from "../../createInvoice.js";
import { errorhandling } from "../../utilites/asyncErrorhandler.js";
import { Product_model} from './../../DB/modules/Product.js'
import {fileURLToPath}  from 'url'
import { sendemail } from "../../utilites/send.email.js";
import { updatestock  , clearcart} from "./order.service.js";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import cloudinary from "../../utilites/cloud.js"
import Stripe from "stripe";

const createOrder = errorhandling(async(req,res,next)=>{

const {address , phone , coupon , payment } = req.body 


let checkcoupon;
if(coupon){
   checkcoupon = await coupon_model.findOne(
      
        {
            name :coupon,
            expiredAt:{$gt:Date.now()}
        }
    )
    
}

if(!coupon){
   return next(new Error('invalid coupon'))
}


const cart = await  cartModel.findOne({user : req.user._id})
const products=  cart.product


if(products.length <1){
    return next(new Error('cart empty'))
}

let orderProducts = []
let orderPrice = 0;

for (let i = 0; i < products.length; i++) {
    const product = await Product_model.findById(products[i].productID)
    if(!product){
        return  next(new Error(`product  ${products[i].productID} not found`))
    }
    if(product.AvailableItem < products[i].quantity ){
        return next(new Error('only less items availble'))

    }
     

    orderProducts.push({
 productID:product._id,
 quantity:products[i].quantity,
name:product.name,
 itemprice: product.finalprice ,   
 totalprice:products[i].quantity * product.finalprice,   
 
    })
    orderPrice+= products[i].quantity *  product.finalprice
  
}





const order  = await orderModel.create({
    user:req.user._id,
    product:orderProducts,
    address,
    phone,
    coupon:{
        id:checkcoupon?._id,
        name:checkcoupon?.name,
        discount:checkcoupon?.Discount,
    },
    payment,
    price:orderPrice
})
 



// generate invoice 
const  user = req.user

const invoice ={
    shipping:{
        name : user.name ,
        address:order.address,
        country:'egypt'
    },
    items:order.product,
    subtotal:order.price,
    paid: order.orderPrice,
    invoice_nr:order._id

}


const invoicepdf = path.join(__dirname  , `./../../craeteinvoice/${order._id}.pdf`)
console.log(invoicepdf)

createInvoice(invoice, invoicepdf);

//update cloudinary


const {secure_url , public_id} = await cloudinary.uploader.upload( invoicepdf,{folder:`${process.env.folder_cloude}/order/invoice/${user._id}`})

//add invoice order 


order.invoice= {id:public_id , url:secure_url}

await order.save()

//send email 

// const  isSend =await  sendemail({to:user.name  , subject:'order invoice' , attachments:[{path:secure_url, contentType:'application/pdf'}]})
// if(!isSend){
//     next(new Error('cant  send email;'))
// }

updatestock(order.product , true)
clearcart(user._id)

if(payment == 'visa'){
    
const stripe = new Stripe(process.env.stripkey)


let existcoupon;
if(order.coupon.name !== undefined){
    existcoupon = await stripe.coupons.create({
        percent_off:order.coupon.discount,
        duration:'once'
    })
}



const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    mode:'payment',
    success_url:process.env.success_url,
    cancel_url:process.env.cancel_url,
    discounts:existcoupon?  [{coupon : existcoupon.id}]:[],
    line_items:order.product.map((product)=>{
        return {
            price_data:{
                currency:'egp',
                product_data:{
                    name:product.name,

                },
                unit_amount:product.itemprice *100 ,

            },
            quantity:product.quantity,

        }

    })
})

return res.json({message:'done '  ,  result: session.url})
}


res.json({message:'done'})

})

const  cancelOrder = errorhandling(async(req,res,next)=>{
const order= await   orderModel.findById(req.params.orderID)

if(!order){
    return next(new Error('order not found'))
}


if(order.status === 'shapped' || 'delivered'){
    return next(new Error('cant  canceled'))
}

order.status ='canceled'
await order.save()



updatestock(order.product, false)

return res.json({message:'done'})

})

export{
    createOrder,
    cancelOrder
}