import slugify from "slugify";
import { errorhandling } from "../../utilites/asyncErrorhandler.js"
import cloudinary from "../../utilites/cloud.js"
import { category_model } from './../../DB/modules/category.js';



const  add_category= errorhandling(async (req, res ,next)=>{

    const {name}= req.body
const createdBy = req.user._id

if(!req.file){
    return next(new Error('category image  requierd'))
}
console.log(req.file)
const {secure_url , public_id} = await cloudinary.uploader.upload( req.file.path,{folder:`${process.env.folder_cloude}/category`})


const data =await category_model.create({name , createdBy , image:{url:secure_url, id:public_id},slug:slugify(req.body.name)})

if(!data){
    return  next(new Error('worng inputs') )
}
return res.json({message:'done' ,  data})

 })



 const Update_category = errorhandling(async(req,res,next)=>{

    const  {categoryId} =req.params  
    

const data =  await category_model.findById(categoryId)

if(!data){
    return  next(new Error('image not found'))
}

if(!req.file){
    return  next(new Error('category image  requierd'))
    }

   


    const {secure_url , public_id} = await cloudinary.uploader.upload(req.file.path , {

        public_id:data.image.id
    })

const Edite = await category_model.findByIdAndUpdate(categoryId ,{name:req.body.name , slug:slugify(req.body.name) ,url:secure_url , id:public_id})

if(!Edite){
    return  next(new Error('something wrong'))
}else{

    return res.json({message:'done' , Edite })

}
 })


 const delete_category =errorhandling(async(req,res,next)=>{

    const  {categoryId} =req.params  
    

    const data =  await category_model.findById(categoryId)
    if(!data){
        return    next(new Error('image not found'))
    }
    
    const Edite = await cloudinary.uploader.destroy(data.image.id)

    if(!Edite){
        return   next(new Error('image not found in cloudinary'))
    }

    const data_base_img = await category_model.findByIdAndRemove(categoryId)
    if(!data_base_img){
        return     next(new Error('image not found in data base'))
    }
    if(data_base_img&&Edite ){


        
        return  res.json({message:'done' })
    }



 })


 const AllCategory = errorhandling(async (req,res,next )=>{

const data = await category_model.find().populate({path: 'SubCategory' , populate:[{path:"createdBy"}]}) // nested populatw

console.log(data)
if(!data){
    return   next(new Error('no category found'))
}else{
    return res.json({message:'done' , data})
}

 })



export{
    add_category,
    Update_category,
    delete_category,
    AllCategory
    
}