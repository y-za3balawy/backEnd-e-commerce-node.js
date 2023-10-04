
import { isvalidObject } from '../../middleware.js/validation.js'

import joi from  'joi'


export const addCartvalidate = joi.object({
    productID: joi.string().custom(isvalidObject).required(),
    quantity: joi.number().required().min(1).integer()
}).required()


export const deleteProductFromCartvalidate =joi.object({
    productID: joi.string().custom(isvalidObject).required(),
}).required()