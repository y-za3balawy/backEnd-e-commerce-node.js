
import { errorhandling } from "../../utilites/asyncErrorhandler.js"
import { user_model } from './../../DB/modules/user.js';
import bcrypt from 'bcrypt'
import { sendemail } from "../../utilites/send.email.js";
import { htmlcode } from "../../utilites/email.later.js";
import crypto from 'crypto'
import  Jwt  from 'jsonwebtoken';
import randomstring from  'randomstring'
import { token_model } from "../../DB/modules/token.module.js";
import { cartModel } from "../../DB/modules/cart.js";
const registration = errorhandling(async(req,res,next) =>{
    const  {name, email, password} = req.body
    const check_user_email = await user_model.findOne({email})
    if(check_user_email){
    next(new Error("email already exist"))
    }
    const hash =  bcrypt.hashSync(password, Number(process.env.salt_round))

    const activationcode = crypto.randomBytes(64).toString('hex')
    console.log("sss",activationcode)
   
        const data= await  user_model.create({name, email, password:hash ,activationcode  });

        const link = `http://localhost:3000/confirmEmail/${activationcode}`;


 const  isSend =await  sendemail({to:email  , subject:'hhhhhhhhhhhh' , html:htmlcode(link)})

    //  await user_model.findOneAndUpdate({email} , {isonline:true})
    //  const  token = JsonWebTokenError.sign({name:data.name , id:data.id} , process.env.key)
     
    if(isSend){
        res.json({meaage:'reviwe your Email'})

    }else{
        next(new Error("something wrong"))

        
    
    
    }
    
})






 const  activationAcount =errorhandling(async (req,res,next) =>{

const  {activationcode} =req.params  
 

    const user = await user_model.findOneAndUpdate({activationcode},{confirm:true , $unset:{activationcode:1}} )

    if(!user){  
        return next(new Error("user not found"))

    }

    await cartModel.create({user:user._id})


    return  res.json({message:'done',activationcode})

})


const  login =errorhandling(async (req,res, next)=>{

    const {email , password } = req.body
    
     const data =  await user_model.findOne({email})
    
     
    if(!data){
        return    next(new  Error('user not found'))
    }
    
    
if(!data.confirm){
    return  next(new Error('please confirm your email'))
}


  
    if(data && data.confirm && bcrypt.compareSync(password , data.password)){
    
     await user_model.findOneAndUpdate({email} , {isonline:true})
    
    const  token = Jwt.sign({name:data.name , id:data.id} , process.env.key)
    const x = await token_model.create({token , user:data._id ,agent:req.headers['user-agent']})
        res.json({messgae:'logined'  , data , token ,x}  )
    
   
    
    }else{
     
        return   next(new  Error('wrong password or email'))
    
    }
    
    }
    )


    const  forget_password = errorhandling(async(req,res ,next ) =>{

        const {email} =  req.body

        const user =  await user_model.findOne({email})

        if(!user){
            return    next(new Error('invalide email '))
        }

        const code = randomstring.generate({
            length:5,
            charset:'numiric'
        })

        user.forgetcode = code;
        await user.save();
        
const isSend =  await sendemail({to:email  , subject:'hhhhhhhhhhhh' , html:htmlcode("",code)})


 if(isSend){
    return res.json({meaage:'reviwe your Email'})

}else{
    return   next(new Error("something wrong"))

    


}




    })

    
    const reset_password =  errorhandling( async (req,res,next)=>{
        
      const {forgetcode} =  req.body 

      let  user = await user_model.findOne({forgetcode})
 
      if(!user){
        return   next(new Error('user not found ')) 
      }

   if(user){
    user =  await user_model.findOneAndUpdate({email:user.email} ,{$unset:{forgetcode:1}})
    user.password = bcrypt.hashSync(req.body.password ,Number(process.env.salt_round))

    await user.save()

    const tokens= await token_model.find({user:user._id})

    tokens.forEach(async (id)=>{

        id.isvalid=false
        await user.save()

    })


    return res.json({message:'done try login'})
   }
    })

export{
    registration,
    activationAcount,
    login,
    forget_password,
    reset_password
   
}