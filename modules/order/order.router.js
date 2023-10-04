

import { authorization } from './../../middleware.js/authorization.js';
import { authentication } from '../../middleware.js/authentication.js'
import { validate } from '../../middleware.js/validation.js';

import { Router } from "express";
import { Createordervalidatrion , cancelvalidation } from './order.validation.js';
import { createOrder , cancelOrder } from './order.control.js';

export const orderRouter = Router()


orderRouter.post('/createOrder' ,  authentication ,authorization('user') ,validate(Createordervalidatrion) , createOrder)
orderRouter.patch('/:orderID' ,  authentication ,authorization('user') ,validate(cancelvalidation), cancelOrder)