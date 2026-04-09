const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
        },
        title:{
            type:String,
        },
        description:{
            type:String
        },
        profileImage:{
            type:String
        },
        location:{
            type:String
        },
        projects:[{
            name:String,
            description:String,
            techStack:[String],
            github:String,
            live:String,
            image:String
        }],
        skills:{
            technical:[String],
            nonTechnical:[String],
            tools:[String]
        },
        contact : {
            email: String,
            phone: String,
            github: String,
            linkedin: String,
        },
        education:[{
            institution:String,
            degree:String,
            fieldOfStudy:String,
            startYear:Number,
            endYear:Number
        }],
        experience:[{
            company:String,
            role:String,
            duration:String,
            description:String
        }],
        achievements:[String],

        template:{
            type:String,
            default:"minimal"
        },
    },
    {timestamps:true}
);
module.exports = mongoose.model("Portfolio", PortfolioSchema);  