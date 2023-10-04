

import express from "express";
import { authentication } from "../../middleware.js/authentication.js";
import { authorization } from "../../middleware.js/authorization.js";
import { fileUpload ,filterObject} from "../../utilites/multer.js";
import { validate } from "../../middleware.js/validation.js";
import { Add_Subcategory_validation, Update_Subcategory_validation  ,delete_Subcategory_validation} from "./SubCategory.validation.js";
import { Add_Subcategory,AllsubCategory,Update_Subcategory,delete_subcategory } from "./Subcategory.control.js";


export const Subcategory_router =  express.Router()
// export const Subcategory_router =  Router({mergeParams:true})




// Subcategory_router.post('/:categoryId/Add_Subcategory' , authentication , authorization('user') , fileUpload(filterObject),validate(Add_Subcategory_validation) ,Add_Subcategory )

Subcategory_router.post('/:categoryId/categoryId' ,authentication , authorization('user'),fileUpload(filterObject.image).single('subcategory'),validate(Add_Subcategory_validation) ,Add_Subcategory)
Subcategory_router.patch('/categoryId/:categoryId/SubcategoryId/:SubcategoryId' ,authentication , authorization('user'),fileUpload(filterObject.image).single('subcategory'),validate(Update_Subcategory_validation) ,Update_Subcategory)
Subcategory_router.delete('/categoryId/:categoryId/SubcategoryId/:SubcategoryId' ,authentication , authorization('user'),validate(delete_Subcategory_validation) ,delete_subcategory)
Subcategory_router.get('/allsubcategory' ,AllsubCategory)



