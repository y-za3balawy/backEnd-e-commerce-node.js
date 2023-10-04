
import joi from 'joi'
import { isvalidObject } from '../../middleware.js/validation.js'



 export const Createordervalidatrion = joi.object({
address:joi.string().min(10).required(),
coupon:joi.string().length(5),
phone:joi.string().required(),
payment:joi.string().valid('cash','visa').required()
}).required()

export const cancelvalidation = joi.object({
    orderID:joi.string().required().custom(isvalidObject)
    }).required()