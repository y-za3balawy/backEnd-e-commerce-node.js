
import joi from 'joi'
import { isvalidObject } from '../../middleware.js/validation.js'




    export  const category_validation = joi.object({
        name:joi.string().required().min(3).max(20),
        createdBy: joi.string().custom(isvalidObject)
        
    }).required() 
    export  const category_Update_validation = joi.object({
        name:joi.string().required().min(3).max(20),
        category_id: joi.string().custom(isvalidObject)

       
        
    }).required() 
    export  const category_delete_validation = joi.object({
        categoryId: joi.string().custom(isvalidObject).required()

    }).required() 



