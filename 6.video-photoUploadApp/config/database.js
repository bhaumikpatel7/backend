const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(console.log("DB connection Sucessfull")).catch((error)=>{
        console.log("error in DB connection");
        console.error(error);
        process.exit(1);
    })
}