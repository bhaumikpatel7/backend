const express = require("express")
const app = express()

require('dotenv').config();

app.listen(3000, () => {
    console.log("server started at 3000")
})

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',(req,res)=>{ 
    res.send("hello sir");
})

app.post('/api/cars',(req,res)=>{
    const {name,brand} = req.body;
    console.log(name)
    console.log(brand)
    res.send("car submitted sucessfully")
  
})

const mongoose = require("mongoose");

//pest url from .env
mongoose.connect(process.env.MONGODB_URL,{
    useNewurlParser : true,
    useunifiedtopology:true
}).then(()=>{console.log("Connection sucessful")}).catch(()=>{console.log("Connection unsucessful")})