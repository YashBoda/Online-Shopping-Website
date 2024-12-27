const express=require('express')
const router=express.Router()
const ownerModel=require('../models/owner-model')


if(process.env.NODE_ENV==='development'){

    router.post('/create',async (req,res)=>{

        let owners= await ownerModel.find()
        if(owners.length>0){

           return  res.status(500).send("Sorry you don't have permission to create owner ; Owner already exists")
        }
            // res.send("You can create owner")

        let {fullname,email,password}=req.body

        let createdOwner=await ownerModel.create({

            fullname,
            email,
            password

        })

        res.status(201).send(createdOwner)

    })  
}

router.get('/admin',(req,res)=>{

    // res.render('createproducts')
    let success=req.flash('success')
    res.render('createproducts',{success})
})


module.exports=router