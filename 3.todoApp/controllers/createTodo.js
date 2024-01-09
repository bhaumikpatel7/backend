//import schema

const Todo = require("../models/todo");

//define route handler

exports.createTodo = async(req,res) => {
    try {
        const {title,description} = req.body;
        //create a new todo object and insert it in the db
        const response = await Todo.create({title,description});
        //send a json response with the sucess flag
        res.status(200).json({
            sucess:true,
            data:response,
            message:'entry created sucessfully'
        });


    } catch (error) {
        console.error(err);
        console.log(err);
        res.status(500),json({
            sucess:false,
            data:"internal server error",
            message:err.message,
        })
    }
}