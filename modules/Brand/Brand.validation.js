
import joi from 'joi'
import { isvalidObject } from '../../middleware.js/validation.js'




    export  const Brand_validation = joi.object({
        name:joi.string().required().min(3).max(20),

        
    }).required() 
    export  const Brand_Update_validation = joi.object({
        name:joi.string().required().min(3).max(20),
        BrandId: joi.string().custom(isvalidObject).required()

       
        
    }).required() 
    export  const Brand_delete_validation = joi.object({
        BrandId: joi.string().custom(isvalidObject).required()

    }).required() 



