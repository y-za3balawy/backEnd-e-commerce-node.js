import express from 'express'
import { dbconnect } from './DB/DBconnection.js'
import { category_router } from './modules/category/category.router.js'
import dotenv from 'dotenv'
import { user_router } from './modules/user/user.router.js';
import { global_error_handlingh } from './utilites/asyncErrorhandler.js';
import { Subcategory_router } from './modules/Subcategory/Subcategory.router.js';
import { Brand_router } from './modules/Brand/Brand.router.js';
import { product_router } from './modules/product/product.router.js';
import { coupon_router } from './modules/coupon/coupon.router.js';
import { cartRouter } from './modules/cart/cart.router.js';
import morgan from 'morgan';
import { orderRouter } from './modules/order/order.router.js';
import  './pdfkitinvoice.js';

const app = express()
const port = 3000



// const whitelist = ['http://127.0.0.1:5000']



// app.use((req,res,next)=>{

// if(req.originalUrl.includes('/confirmEmail')){
//     res.setHeader("Access-Control-Allow-Origin" , "*");
//     res.setHeader("Access-Control-Allow-Methods" , "get");
//     return next()
// }
//     if(!whitelist.includes(req.header('origin'))){
//         return next(new Error('blocked by cors'))
//     }else{
//         res.setHeader("Access-Control-Allow-Origin" , "*");
//         res.setHeader("Access-Control-Allow-Headers" , "*");
//         res.setHeader("Access-Control-Allow-Methods" , "*");
//         res.setHeader("Access-Control-Allow-Private-Network" , true);
//         return next()
//     }
// })

app.use(express.json())
app.use(morgan('common'))
app.use(category_router)
app.use(Brand_router)
app.use(cartRouter)
app.use(product_router)
app.use(coupon_router)
app.use(user_router)
app.use(orderRouter)
app.use(Subcategory_router)
dotenv.config()
app.use(global_error_handlingh)
app.use('*' , (req ,  res ,  next)=>{
    new Error('Error 404 ')
    })


dbconnect()

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))