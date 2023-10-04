import { cartModel } from "../../DB/modules/cart.js"
import {Product_model}  from './../../DB/modules/Product.js'





export const clearcart = async(userID)=>{
const  data=await cartModel.findOneAndUpdate({user:userID},{products:[]})

}

export const updatestock = async (products , placeOrder) =>{
  if(placeOrder){
    for (const product of products) {
        await Product_model.findOneAndUpdate(product.productID ,{
            $inc:{
                AvailableItem:-product.quantity,
                SoldItem:product.quantity

            }
        })
        
    }
  }else{
    for (const product of products) {
        await Product_model.findOneAndUpdate(product.productID ,{
            $inc:{
                AvailableItem:product.quantity,
                SoldItem:-product.quantity

            }
        })
        
    }

  }
}