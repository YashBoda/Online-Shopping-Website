 const mongoose=require('mongoose')
 const config=require('config')
 const dbgr=require("debug")("development:mongoose")

 console.log(process.env.NODE_ENV)

 mongoose.connect(`${config.get("MONGODB_URI")}/scatch`).then(()=>{
   dbgr("Connection successful")//$env:DEBUG="development:*" in console to enable it,  $env:DEBUG="" to desable it
 }).catch((err)=>{
    console.log(err)
 })


 module.exports=mongoose.connection