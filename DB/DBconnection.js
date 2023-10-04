
import mongoose from "mongoose";


export function dbconnect(){

mongoose.connect('mongodb://127.0.0.1:27017/e-commerce').then(()=>{
    console.log("db-connected...")

}).catch((error)=>{
    console.log( 'db-Error',error)

})

}