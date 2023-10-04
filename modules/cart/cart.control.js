import { cartModel } from "../../DB/modules/cart.js";
import { errorhandling } from "../../utilites/asyncErrorhandler.js";
import { Product_model } from './../../DB/modules/Product.js';





export const AddToCart= errorhandling(async(req,res,next)=>{

const { productID, quantity} =  req.body

const product = await  Product_model.findById(productID)

if(!product){
    return next(new Error('product not found'))
}



if(product.AvailableItem < quantity){
   return next(new Error(`sorry only  ${product.AvailableItem} left on the stock`   ))
}



const data = await cartModel.findOneAndUpdate({user:req.user._id} , {$push:{product :{productID,quantity}}},{new :true})
if(!data){
    return next(new Error('cant add to cart'))

}

return res.json({message:'done', data})

})


export const AllCart = errorhandling(async(req,res,next)=>{
const  data =  await cartModel.findOne({user:req.user._id}).populate('product.productID' ,"name defaultImage.url")
if(!data){
    return next(new Error('cart embty'))

}
res.json({message:'done' , data})
})


export const UpdateCart = errorhandling(async(req,res,next )=>{

    const { productID, quantity} =  req.body

    const product = await  Product_model.findById(productID)
    
 if(!product){
        return next(new Error('product not found'))
    }
    if(quantity>product.AvailableItem){
       return next(new Error(`sorry only  ${product.AvailableItem} left on the stock`   ))
    }

    const data = await cartModel.findOneAndUpdate({user:req.user._id , "product.productID":productID} ,{ $set:{"product.$.quantity":quantity}} ,{   new :true})

    if(!data){
        return next(new Error('cant add to cart'))
    
    }
    
    return res.json({message:'done', data})

})

export const removeFromCArt = errorhandling(async(req,res,next)=>{

    const data = await cartModel.findOneAndUpdate({user:req.user._id},{$pull:{ product:  { productID:req.params.productID}}})
    if(!data){
        return next(new Error('cant remove product'))
    
    }
    
    return res.json({message:'done', data})
})


export const clearCart = errorhandling(async(req,res,next)=>{
    const data = await cartModel.findOneAndUpdate({user:req.user._id} , {product:[]} , {new :true})
  
    res.json({message:'done' , data})
    })