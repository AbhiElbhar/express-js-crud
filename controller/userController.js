const asyncHandler =require("express-async-handler")
const bcrypt =require("bcrypt")
const User = require("../models/userModel")
const jwt = require('jsonwebtoken');

const loginUser =asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    if(!email  || !password){
        res.status(400);
        throw new Error("All Feilds Are Required !");
    }
    const user = await User.findOne({email});
    console.log(user)
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }
  
    const token = jwt.sign({ user:{
        username:user.username,
        email:user.email,
        id:user.id
    },
     }, process.env.SECRET_KEY);
    console.log(token)
    res.status(200).json({ token });
});

const registerUser =asyncHandler(async (req, res) => {
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All Feilds Are Required !");
    }
    const userAvailable = await User.findOne({email});

    if(userAvailable){
        res.status(400);
        throw new Error("This Email Has Alredy Register !");
    }
    //Hash Passsword
    const hashPassword = await bcrypt.hash(password,10);
   
    const user = await User.create({
        username,
        email,
        password: hashPassword
    })
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }
    else{
        res.status(400);
        throw new Error("User data not Valid");
    }
   
});

const currentUser =asyncHandler(async (req, res) => {
   
    res.status(200).json("current")
});

module.exports ={loginUser,registerUser,currentUser}