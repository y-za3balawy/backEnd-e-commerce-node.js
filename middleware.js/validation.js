



import { Types } from 'mongoose'


export const isvalidObject =  (value,helper)=>{

    if(Types.ObjectId.isValid(value)){
        return true
    }else{
        return helper.message('invalid object')
    
    }
    }


export const  validate = (schema)=>{

    return (req,res , next ) =>{

        const allreq = {...req.body,...req.params,...req.query  }

        const  validate_result =  schema.validate(allreq , {abortEarly:false})
    
        if(validate_result.error){
    
            next(new Error(validate_result.error) , {cause:400})
        }else{
           return next()
        }
    
    
    }
    
    }