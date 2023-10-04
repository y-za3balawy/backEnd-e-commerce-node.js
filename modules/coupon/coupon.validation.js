

import joi from 'joi'



export const  createvalidation  =  joi.object({

    Discount:joi.number().min(0).max(100).required(),
    expiredAt:joi.date().greater(Date.now()).required()


}).required()



export const  updatevalidation  =  joi.object({
code:joi.string().length(5).required(),
    Discount:joi.number().min(0).max(100),
    expiredAt:joi.date().greater(Date.now())


}).required()


export const  deletevalidation  =  joi.object({
    code:joi.string().length(5).required(),
    
    
    }).required()