const userModel=require('../models/user-model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {generateToken}=require('../utils/generateToken')

module.exports.registerUser= async function(req,res){

    try{

        let {email,password,fullname}=req.body

        let user=await userModel.findOne({email: email})

        if(user){
            req.flash('error',"You already have an account , plz log in")
            return res.redirect('/')
        }

        bcrypt.genSalt(10,function(err,salt){

            bcrypt.hash(password,salt,async function(err,hash){

                if(err){
                    // res.send(err.message)
                    req.flash('error',err.message)
                    return res.redirect('/')
                }
                else{  

                    let user=await userModel.create({
                        email,
                        password: hash,
                        fullname
                    })

                    let token=generateToken(user)
                    res.cookie('token',token)
                    // // res.send('user created successfully') 
                    // console.log("Cookie Token : "+res.cookie.token)
                    req.flash('success',"New user created !!")
                    return res.redirect('/shop')
                    
                    
                } 
            })
        })
    }
    catch(err){
        // res.send(err.message)
        req.flash('error','user NOT created try again MSG: '+err.message)
        return res.redirect('/')
 
    }

}

module.exports.loginUser=async function(req,res){

    let {email,password}=req.body

    let user=await userModel.findOne({email:email})

    if(!user){

        // return res.send("Email or password incorrect || user Email dosnt exist")

        req.flash('error',"You do not have an account plz create one")
        return res.redirect('/')
    }

    bcrypt.compare(password,user.password,(err,result)=>{

        if(result){

            let token=generateToken(user)
            res.cookie("token",token)//cookie is sent or set
            // res.send("You can login")
            req.flash('success',"Log in successful")
            return res.redirect('/shop')
            
        }
        else{
            // return res.send("Email or password incorrect || password incorrect")
            // req.flash('error',"password incorrect")
            // return res.redirect('/')

        req.flash('error','Incorrect password')
        return res.redirect('/')

        }
    })
}

module.exports.logoutUser= function(req,res){

    res.cookie("token","")
    res.redirect('/')
}