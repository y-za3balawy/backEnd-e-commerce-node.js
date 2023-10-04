
import joi from 'joi'

export const register  = joi.object({

    name:joi.string().min(3).max(30).required(),
    email: joi.string().required().email({tlds:{allow:['com' , 'youisef']}}),
    password:joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).min(3),
    repassword:joi.string().required().valid(joi.ref('password'))
    // age:joi.number().min(10).max(90).required(),
    // gender:joi.string().required().default('male').valid('male', 'female'),
    // phone:joi.number().required(),
    
}).required()


export const activation  = joi.object({

    activationcode:joi.string().required()
    
}).required()


export const loginschema = joi.object({
    email: joi.string().required().email(),
    password:joi.string().required()
}).required()


export const reset = joi.object({
    email :joi.string().email().required()
})


export const reset_pass =  joi.object({
    email :joi.string().email().required(),

    forgetcode:joi.string().required(),
password:joi.string().required(),
repassword :joi.string().required().valid(joi.ref('password')) 

})