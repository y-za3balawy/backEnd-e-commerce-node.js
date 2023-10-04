

import joi from 'joi'
import { isvalidObject } from '../../middleware.js/validation.js'


export  const  create_product = joi.object({
    name:joi.string().required().min(3).max(20),
    description:joi.string().required(),
    AvailableItem:joi.number().min(1).required(),
    Price:joi.number().min(1).required(),
    Discount:joi.number().min(1).max(100),
    category:joi.string().custom(isvalidObject),
    subcategory:joi.string().custom(isvalidObject),
    Brand:joi.string().custom(isvalidObject),
    

}).required() 



export const productvalidation = joi.object({
    
    productID:joi.string().custom(isvalidObject).required()

}).required()