
import mongoose, { Schema, model } from "mongoose";



// userName , email , password hashed , age , gender , phone

const userschema =  new Schema({

name:{
    type:String,
    minLength:[3],
    maxLength:[30],
    require:true
},
email:{
    type:String,
    require:true,
    unique: true,
    lowercase:true
},
password:{
    type:String,
    require:true,
    minlength:[3],
   
},
repassword:{
    type:String,
    require:true,
    minlength:[3],
   

},
age:{
    type:Number,
    require:true,
    min:[10],
    max:[90]
},
gender:{
    type:String,
    require:true,
    default:'male',
    enum:['male' , 'female']

},
phone:{
    require:true,
    type:Number
},
confirm:{
    type:Boolean,
    default:false
},
isonline:{
    type:Boolean,
    default:false,
    
},
role:{
    type:String,
    default:'user',
    enum:['user' , 'admin']

},
forgetcode:String, 
activationcode:String,
profileimage:{
    url:{
        type:String,
        default:"https://res.cloudinary.com/dg3uulmza/image/upload/v1692400929/olympic_flag.jpg"
    },
    id:{
        type:String,
        default:"v1692400929/olympic_flag"
    }
},
coverimage:[{url:{type:String,require:true}, id:{type:String , require:true}}]

})


export const user_model =mongoose.models.user || model('user' , userschema)