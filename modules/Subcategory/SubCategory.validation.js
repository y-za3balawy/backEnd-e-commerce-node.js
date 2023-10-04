import joi from "joi";
import { isvalidObject } from "../../middleware.js/validation.js";









export  const Add_Subcategory_validation = joi.object({
    categoryId: joi.string().custom(isvalidObject).required(),
    name:joi.string().required().min(3).max(20),

}).required() 


export  const Update_Subcategory_validation = joi.object({
    categoryId: joi.string().custom(isvalidObject).required(),
    SubcategoryId: joi.string().custom(isvalidObject).required(),
    name:joi.string().required().min(3).max(20),

}).required() 

export  const delete_Subcategory_validation = joi.object({
    categoryId: joi.string().custom(isvalidObject).required(),
    SubcategoryId: joi.string().custom(isvalidObject).required()

}).required() 


