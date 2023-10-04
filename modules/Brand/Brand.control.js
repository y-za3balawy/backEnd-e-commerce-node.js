import slugify from "slugify";
import { errorhandling } from "../../utilites/asyncErrorhandler.js"
import cloudinary from "../../utilites/cloud.js"
import { Brand_model } from './../../DB/modules/Brand.js';



const  add_Brand= errorhandling(async (req, res ,next)=>{

    const {name}= req.body
const createdBy = req.user._id

if(!req.file){
    return next(new Error('Brand image  requierd'))
}
console.log(req.file)
const {secure_url , public_id} = await cloudinary.uploader.upload( req.file.path,{folder:`${process.env.folder_cloude}/Brand`})


const data =await Brand_model.create({name , createdBy , image:{url:secure_url, id:public_id},slug:slugify(req.body.name)})

if(!data){
    return next(new Error('worng inputs') )
}
return res.json({message:'done' ,  data})

 })



 const Update_Brand = errorhandling(async(req,res,next)=>{

    const  {BrandId} =req.params  
    

const data =  await Brand_model.findById(BrandId)

if(!data){
    return next(new Error('image not found'))
}

if(!req.file){
        return next(new Error('Brand image  requierd'))
    }

   


    const {secure_url , public_id} = await cloudinary.uploader.upload(req.file.path , {

        public_id:data.image.id
    })

const Edite = await Brand_model.findByIdAndUpdate(BrandId ,{name:req.body.name , slug:slugify(req.body.name) ,url:secure_url , id:public_id})

if(!Edite){
    return next(new Error('something wrong'))
}else{

    return res.json({message:'done' , Edite })

}
 })


 const delete_Brand =errorhandling(async(req,res,next)=>{
    

    const  {BrandId} =req.params  


    const data =  await Brand_model.findById(BrandId)
    if(!data){
        return next(new Error('image not found'))
    }
    
    const Edite = await cloudinary.uploader.destroy(data.image.id)

    if(!Edite){
        return next(new Error('image not found in cloudinary'))
    }

    const data_base_img = await Brand_model.findByIdAndRemove(BrandId)
    if(!data_base_img){
        return next(new Error('image not found in data base'))
    }
    if(data_base_img&&Edite ){


        
        return res.json({message:'done' })
    }



 })


 const AllBrand = errorhandling(async (req,res,next )=>{

const data = await Brand_model.find() // nested populatw

console.log(data)
if(!data){
    return next(new Error('no Brand found'))
}else{
    return  res.json({message:'done' , data})
}

 })



export{
    add_Brand,
    Update_Brand,
    delete_Brand,
    AllBrand
    
}