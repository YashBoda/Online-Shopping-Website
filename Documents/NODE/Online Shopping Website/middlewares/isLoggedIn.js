const jwt=require('jsonwebtoken')
const userModel=require('../models/user-model')
const cookieParser=require('cookie-parser')

module.exports=async (req,res,next)=>{

    if(!req.cookies.token){

        req.flash('error','You need to login first')
        return res.redirect('/')
    }

    try{

        let decoded=jwt.verify(req.cookies.token,process.env.JWT_KEY)// data which was encoded &hashed earlier will be decoded and stored in decoded variable
        // console.log(decoded)
        let user=await userModel.findOne({email: decoded.email}).select('-password')// password will not be stored in user variable

        req.user=user

        next() // move ahed[go further from wherever this function was invoked]

    }

    catch(err){

        req.flash('error','Something went wrong')
        res.redirect('/')
    }
}