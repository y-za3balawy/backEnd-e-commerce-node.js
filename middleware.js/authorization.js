import { errorhandling } from "../utilites/asyncErrorhandler.js"



export const authorization = (role)=>{

    return errorhandling(async (req,res,next)=>{

        if(role !== req.user.role){
            next(new Error('authentaction first'))
        }else{
            next()
        }
    })

}