const mongoose = require("mongoose");

const userSchema =mongoose.Schema({
    username:{
        type:String,
        required:[true, "please add the user name"]
    },
    email:{
        type:String,
        required:[true, "please add the user email"],
        unique :[true,"this email address is already taken plz try another email"]
    },
    password:{
        type:String,
        required:[true, "please add the user password"]
    },
},{
    timestamps:true,
})

module.exports=mongoose.model("User",userSchema);