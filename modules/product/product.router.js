
import exprss from 'express' 
import { authentication } from '../../middleware.js/authentication.js'
import { authorization } from '../../middleware.js/authorization.js'
import { fileUpload, filterObject } from '../../utilites/multer.js'
import { validate } from './../../middleware.js/validation.js'
import { create_product, productvalidation } from './product.validation.js'
import { AddProduct, deletProduct, getAllProduct, singleproduct , categoryProduct} from './product.control.js'






export  const product_router =  exprss.Router()


product_router.post('/addProduct' , authentication , authorization('user') , fileUpload(filterObject.image).fields([{name:"defaultimage" , maxCount:1},{name:"SubImage" , maxCount:6}]) , validate(create_product) , AddProduct)


product_router.delete('/deleteProduct/:productId', authentication , authorization('user')  , deletProduct )


product_router.get('/getAllProduct' , authentication,authorization('user'), getAllProduct)

product_router.get('/singleproduct/:productID' , authentication,authorization('user') , validate(productvalidation) , singleproduct)

product_router.get('/:categoryId/product', authentication,authorization('user') ,  categoryProduct )