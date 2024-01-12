const mongoose = require("mongoose");
require("dotenv").config();

exports.Connect = () =>{

    mongoose.connect(process.env.DATABASE_URL ,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("DB connected sucessfully");}).catch((error)=>{
        console.log(error);
        console.log("DB not connected ");
    })

}