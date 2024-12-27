const express=require('express')
const router=express.Router()
const cookieParser=require('cookie-parser')
router.use(cookieParser())
const isLoggedIn=require('../middlewares/isLoggedIn')
const {registerUser,loginUser,logoutUser}=require('../controllers/authController')


router.get('/',(req,res)=>{

    res.send('Hey [users Router]')    

})

router.post('/register',registerUser)

router.post('/login',loginUser)

router.get('/logout',logoutUser)

module.exports=router