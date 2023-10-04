

import  express  from "express";
import { authentication } from "../../middleware.js/authentication.js";
import { authorization } from "../../middleware.js/authorization.js";
import { Update_Brand, add_Brand, delete_Brand  ,AllBrand } from "./Brand.control.js";
import { validate } from "./../../middleware.js/validation.js";
import {   Brand_Update_validation, Brand_validation  ,Brand_delete_validation} from "./Brand.validation.js";
import { fileUpload, filterObject } from "../../utilites/multer.js";

export const Brand_router = express.Router()




Brand_router.post('/add_Brand',authentication , authorization('user'),fileUpload(filterObject.image).single('Brand')  ,validate(Brand_validation) , add_Brand )

Brand_router.patch('/UpdateBrand/:BrandId' ,authentication,authorization('user'),fileUpload(filterObject.image).single('Brand') ,validate(Brand_Update_validation), Update_Brand)

Brand_router.delete('/deletebrand/:BrandId' ,authentication,authorization('user'),validate(Brand_delete_validation), delete_Brand)

Brand_router.get('/AllBrand',AllBrand)


