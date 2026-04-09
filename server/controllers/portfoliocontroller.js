const Portfolio = require("../models/Portfolio");
const mongoose = require("mongoose");
const User = require("../models/User");
exports.createPortfolio = async(req,res) => {
    try {
        const portfolio = await Portfolio.create({
            user:req.user.id,
            title:req.body.title,
            description:req.body.description,
            profileImage:req.file?.path,
            location:req.body.location,
            projects:JSON.parse(req.body.projects),
            skills:JSON.parse(req.body.skills),
            contact:JSON.parse(req.body.contact),
            education:req.body.education,
            experience:req.body.experience,
            achievements:req.body.achievements,
            template:req.body.template
        });
        res.status(201).json(portfolio);
        
    } catch (error) {   
        res.status(500).json({error:error.message});
    }
};
exports.getMyPortfolios = async(req,res) => {
    try {
        const portfolios = await Portfolio.find({user:req.user.id}).populate("user","username");
        res.json(portfolios);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
exports.updatePortfolio = async(req,res) => {
    try {
        const portfolio = await Portfolio.findOneAndUpdate({ _id:req.params.id, user: req.user.id}, req.body,{returnDocument:"after"});
        console.log(req.params.id)
        console.log(req.user.id)
        console.log(portfolio)
        if(!portfolio){
            return res.status(404).json({message: "Portfolio not found"});
        }
        res.json(portfolio);
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
exports.deletePortfolio = async (req, res) =>{
    try {
        const portfolio = await Portfolio.findOneAndDelete({ _id: req.params.id, user:req.user.id});
        if(!portfolio){
            return res.status(404).json({ message: "Portfolio not found"});
        }
        res.json({message:"Portfolio deleted successfully"});
    } catch (error) {
        res.status(500).json({error:error.message});
        
    }
};
exports.getPortfolioById = async(req,res)=>{
    try{
        const portfolio = await Portfolio.findById(req.params.id);
        if(!portfolio){
            return res.status(404).json({message:"Portfolio not found"});
        }
        res.json(portfolio);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
exports.getPortfolioByUsername = async(req,res)=>{
    try{
        const user = await User.findOne({username:req.params.username});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const portfolio = await Portfolio.findOne({user:user._id});
        if(!portfolio){
            return res.status(404).json({message:"Portfolio not found"});
        }
        res.json(portfolio);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};