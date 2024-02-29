const User = require('../models/user')
const {hashPassword,comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req,res)=>{
    res.json('test is working')
}
// reg endpoint
const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        //check if name was enterd
        if(!name){
            return res.json({
                error : 'name is requird'
            })
        }
        //check if password is good
        if(!password|| password.length < 6){
            return res.json({
                error:"password is required and shoud be at least 6 characters loang"
            })
        }
        //cheack the email
        const exist = await User.findOne({email})
        if(exist){
            error:'Email is taken already'
        }

        const hashashPassword = await hashPassword(password)
        //create user
        const user = await User.create({
            name,email,password : hashashPassword
        })
        return res.json(User)
    }catch(error){
        console.log(error)
    }
}

//login endpoint
const loginUser = async(req,res)=>{
    try{
        const{email,password} = req.body;

        //check if user exit
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error:'No user found'
            })
        }

        //check if password match
        const match = await comparePassword(password,user.password)
        if(match){
            jwt.sign({email:user.email,id:user._id, name: user.name},process.env.JWT_SECRET,{},(err,token)=>{
                res.cookie('token',token).json(user)
            })
        }
        if(!match){
            res.json({
                error: 'Password do not match'
            })
        }
    }catch(error){
        console.log(error)
    }
}

const getProfile = (req,res) =>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    }else{
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}