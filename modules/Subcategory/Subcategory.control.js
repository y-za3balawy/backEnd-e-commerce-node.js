
import { category_model } from '../../DB/modules/category.js';
import { subcategory_model } from '../../DB/modules/subcategory.js';
import { errorhandling } from './../../utilites/asyncErrorhandler.js';
import cloudinary from './../../utilites/cloud.js';
import slugify from "slugify";









const Add_Subcategory = errorhandling(async(req,res,next)=>{

    const {name} =  req.body


    const {categoryId}  = req.params

const createdBy= req.user._id


    const checkCateghory = await category_model.findById(categoryId)

    if(!checkCateghory){
        return   next(new Error('catgory not found'))
    }
    if(!req.file){
        return  next(new Error('image is required'))
    }
    

    // const {secure_url , public_id} = cloudinary.uploader.upload(req.file.path,{folder:`${process.env.folder_cloude}/subcategory` })
    const {secure_url , public_id} = await cloudinary.uploader.upload( req.file.path,{folder:`${process.env.folder_cloude}/subcategory`})
   

const  data  = await  subcategory_model.create({name ,createdBy,slug: slugify(name) , categoryId:req.user._id , image:{
    id:public_id,
    url:secure_url
},
categoryId

})
if(!data){
    return   next(new Error('enter valide data'))
}else{


    return res.json({message:'done' ,  data})
}
})


const Update_Subcategory =  errorhandling(async (req,res,next )=>{
    const {categoryId ,SubcategoryId}  = req.params
const {name} = req.body
    const check_category = await category_model.findById(categoryId)

    if(!check_category){
        return   next(new Error('category not found'))
    }


    const check_Subcategory = await subcategory_model.findById(SubcategoryId)

    if(!check_Subcategory){
        return  next(new Error('subcategory not found'))
    }
    if(!req.file){
        return   next(new Error('image is required'))
    }
console.log(check_Subcategory)
    const {secure_url , public_id} = await cloudinary.uploader.upload( req.file.path,{
        public_id:check_Subcategory.image.id
    })

    const  data = await subcategory_model.findByIdAndUpdate(SubcategoryId ,{ name,slug: slugify(name) , url:secure_url ,id:public_id

    })

    if(!data){
        return  next(new Error('wrong data'))
    }else{
        return  res.json({message:'done', data })
    }


    





})


const delete_subcategory =errorhandling(async(req,res,next)=>{

    const  {categoryId,SubcategoryId} =req.params  
    

    const data =  await category_model.findById(categoryId)
    if(!data){
        return  next(new Error('category  not found'))
    }
    
    const data_subcategory =  await subcategory_model.findById(SubcategoryId)
    if(!data_subcategory){
        return next(new Error('subcategory  not found'))
    }
    const Edite = await cloudinary.uploader.destroy(data_subcategory.image.id)

    if(!Edite){
        return   next(new Error('image not found in cloudinary'))
    }

    const data_base_img = await subcategory_model.findByIdAndRemove(SubcategoryId)
    if(!data_base_img){
        return  next(new Error('image not found in data base'))
    }
    if(data_base_img&&Edite ){


        
        return  res.json({message:'done' })
    }



 })

 const AllsubCategory = errorhandling(async (req,res,next )=>{

    // const data = await subcategory_model.find().populate('categoryId')
const data = await subcategory_model.find().populate([{path:"categoryId" , select:"name"},{path:"createdBy" , select:"name"}]) // meltipe populate

    if(!data){
        return   next(new Error('no category found'))
    }else{
        return  res.json({message:'done' , data})
    }
    
     })
    
export{
    Add_Subcategory,
    Update_Subcategory,
    delete_subcategory,AllsubCategory
}