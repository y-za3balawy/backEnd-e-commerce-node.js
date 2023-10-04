


import  Router  from "express";
import { validate } from "../../middleware.js/validation.js";
import {    loginschema, register, reset, reset_pass } from './user.validation.js';
import { registration , activationAcount, login, forget_password, reset_password } from "./user.control.js";


export const user_router = Router()



user_router.post('/registration' , validate(register) , registration)

user_router.get('/confirmEmail/:activationcode' , activationAcount)

user_router.post('/login' , validate(loginschema) , login)
user_router.patch('/forget_password' , validate(reset) ,forget_password)
user_router.patch('/reset_password' , validate(reset_pass) ,reset_password)




