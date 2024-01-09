const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse json request body

app.use(express.json());

//import routes for Todo App
const todoRoutes = require("./routes/todos")

app.use("/api/v1",todoRoutes);

//start server

app.listen(PORT,() => {
    console.log("server started at 3000");
})

//connect to DB
const dbConnect = require("./config/database");
dbConnect();

app.get("/",(req,res)=>{
    res.send(`<h1>This is homepage<h1`)
})

