

import {Router} from 'express'
import { authorization } from './../../middleware.js/authorization.js';
import { authentication } from '../../middleware.js/authentication.js'
import { validate } from '../../middleware.js/validation.js';
import { addCartvalidate ,deleteProductFromCartvalidate} from './cart.validation.js';
import { AddToCart,AllCart ,UpdateCart,removeFromCArt,clearCart} from './cart.control.js';


export const  cartRouter = Router()



cartRouter.post('/addToCart' ,  authentication ,authorization('user') ,validate(addCartvalidate) , AddToCart)
cartRouter.get('/AllCart' ,  authentication ,authorization('user')  , AllCart)
cartRouter.patch('/UpdateCart' ,  authentication ,authorization('user') ,validate(addCartvalidate)  , UpdateCart)
cartRouter.patch('/removeFromCArt/:productID' ,  authentication ,authorization('user') ,validate(deleteProductFromCartvalidate)  , removeFromCArt)
cartRouter.patch('/clearCart' ,  authentication ,authorization('user')   , clearCart)