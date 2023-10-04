
import {Router} from 'express'
import { authentication } from '../../middleware.js/authentication.js'
import { authorization } from '../../middleware.js/authorization.js'
import { validate } from './../../middleware.js/validation.js'
import { createvalidation,updatevalidation ,deletevalidation} from './coupon.validation.js'
import { addcoupon  ,UpdateCoupon,deletecoupon,allCoupons} from './coupon.control.js'


export const  coupon_router =  Router()


coupon_router.post('/addcoupon' , authentication , authorization('user') ,  validate(createvalidation) , addcoupon)
coupon_router.patch('/UpdateCoupon/:code' , authentication , authorization('user') ,  validate(updatevalidation) , UpdateCoupon)
coupon_router.delete('/deleteCoupon/:code' , authentication , authorization('user') ,  validate(deletevalidation) , deletecoupon)
coupon_router.get('/allCoupons' , authentication , authorization('user') ,   allCoupons)

