const user = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async(req,res) => {
try{
const {name,email,password,username} = req.body;
const userExists = await user.findOne({email});
if(userExists){
return res.status(400).json({message:"User already exists"});
}
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password,salt);

const newUser = await user.create({
    name,
    email,
    username,
    password:hashedPassword 
});

res.status(201).json({
    message:"User registered successfully",
    user1: newUser
});
}
catch(error){
    res.status(500).json({error:error.message});
}
};
exports.loginUser = async(req,res) => {
    try{
        const {username,password} = req.body;
        const User = await user.findOne({username});

        if(!User){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, User.password);
        console.log(password);
        console.log(User.password);
        console.log(isMatch)
        if(!isMatch){
            return res.status(400).json({mesasge:"Invalid credentials"});
        }
        const token = jwt.sign({id: User._id},process.env.JWT_SECRET,
        {expiresIn: "1d" });
        res.json({
            message:"Login successful",
            token,
            User:{
                id:user._id,
                name:user.name,
                email:user.email,
                username:user.username
            }
        });
        }catch(error){
            res.status(500).json({error:error.message});
        }
    };