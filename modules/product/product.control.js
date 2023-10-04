import { errorhandling } from "../../utilites/asyncErrorhandler.js";

import {nanoid} from 'nanoid'
import cloudinary from "../../utilites/cloud.js";
import { Product_model } from './../../DB/modules/Product.js';
import slugify from "slugify";
import { category_model } from "../../DB/modules/category.js";




const AddProduct = errorhandling(async(req,res,next ) =>{
    const {name, description,AvailableItem, Price,Discount, category, subcategory, Brand} =req.body
    const createdBy = req.user._id

if(!req.files){
    return next(new Error('image required'), {cause:400})
}


const cloudFolder = nanoid()
const image =[]
//upload subfile

for (const file of req.files.SubImage) {
    const {public_id , secure_url} =  await  cloudinary.uploader.upload(file.path ,{folder:`${process.env.folder_cloude}/products/${cloudFolder}`})

    image.push({id:public_id ,url:secure_url})
}


const {public_id , secure_url} =  await  cloudinary.uploader.upload(req.files.defaultimage[0].path,{folder:`${process.env.folder_cloude}/products/${cloudFolder}`})

const product =  await Product_model.create({slug:slugify(name),image,name, description,AvailableItem, Price,Discount, category, subcategory,Brand ,  cloudFolder , createdBy ,defaultImage:{url: secure_url,id:public_id} })
  


if(!product){
    return next(new Error('faild to create data'))
}else{
    return  res.json({message:'done' , product})
}



})


const deletProduct =errorhandling(async (req,res,next)=>{

const{productId}= req.params
const userId = req.user._id
const  data = await Product_model.findById(productId)

 if(!data){
    return next(new Error('product noy found'))
 }

 if(userId.toString()  != data.createdBy.toString() ){
    return  next(new Error('CREATOR who can delete this product'))
 }

const arrids =data.image
const ids = arrids.map((ele)=>{
   return ele.id
})

ids.push(data.defaultImage.id)

const result = await cloudinary.api.delete_resources(ids)

if(!result){
    return next(new Error('faild to delete image on cloudinary'))
}

const delete_folder = await cloudinary.api.delete_folder(`${process.env.folder_cloude}/products/${data.cloudFolder}`)

if(!delete_folder){
    return next(new Error('faild to delete delete_folder on cloudinary'))
}

const delete_folder_data = await Product_model.findByIdAndDelete(productId)
if(!delete_folder_data){
    return next(new Error('faild to delete delete_folder_data on database'))
}

return res.json({message:'done ' ,data})
    
})


const getAllProduct = errorhandling(async (req,res,next)=>{
 const {keyword,page , sort , fields}=req.query


 //pagination
 //     const limit =2
// const skip = limit *(page     -1)
// .skip(skip).limit(limit)
// page?!page||page<1||isNaN(page) :1 
// const data = await Product_model.find({$or:[ {description:{$regex:keyword , $options:'i'}} ,{name:{$regex:keyword , $options:'i'}}]})


// if(!data){
//     next(new Error('no product found'))
// }

// if(data){
//     res.json({message:'done' , data})
// }

// ====>>> sort
// const data = await Product_model.find().sort(sort)



// if(!data){
//     next(new Error('no product found'))
// }

// if(data){
//     res.json({message:'done' , data})
// }
//=================================>>>>>

//select

// const modelcase=  Object.keys(Product_model.schema.paths)

// const keys =  fields.split()

// const match =   keys.map((ele)=>{ele.includes(modelcase)})
// const data = await Product_model.find().select(match)



//==========

const data = await Product_model.find().sort(sort).costumselect(fields).pignate(page)
if(!data){
    return  next(new Error('no product found'))
}

if(data){
    return  res.json({message:'done' , data})
}

})


const singleproduct =  errorhandling(async (req,res,next)=>{
const { productID}=req.params


    const data = await Product_model.findById(productID)
    if(!data){
        return  next(new Error('no product found'))
    }
    
    if(data){
        return  res.json({message:'done' , data})
    }
    
})

const categoryProduct  = errorhandling(async(req,res ,next )=>{

const {categoryId}= req.params

const categoryData = await category_model.findById(categoryId)


if(!categoryData){
    return  next(new Error('category not found'))
}

const  data = await Product_model.find({category:categoryId})
if(!data){
    return  next(new Error('no products found in this category'),{cause:404})
}

if(data){
    return  res.json({message:'done' , data})
}


})
export{
    AddProduct,
    deletProduct,
    getAllProduct,
    singleproduct,
    categoryProduct
}