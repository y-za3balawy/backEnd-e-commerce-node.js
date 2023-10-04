

import  express  from "express";
import { authentication } from "../../middleware.js/authentication.js";
import { authorization } from "../../middleware.js/authorization.js";
import { Update_category, add_category, delete_category  ,AllCategory } from "./category.control.js";
import { validate } from "./../../middleware.js/validation.js";
import {   category_Update_validation, category_validation  ,category_delete_validation} from "./category.validation.js";
import { fileUpload, filterObject } from "../../utilites/multer.js";

export const category_router = express.Router()




category_router.post('/add_category',authentication , authorization('user'),fileUpload(filterObject.image).single('category')  ,validate(category_validation) , add_category )

category_router.patch('/UpdateCategory/:categoryId' ,authentication,authorization('user'),fileUpload(filterObject.image).single('category') ,validate(category_Update_validation), Update_category)

category_router.delete('/deleteImg/:categoryId' ,authentication,authorization('user'),validate(category_delete_validation), delete_category)

category_router.get('/AllCategory',AllCategory)