const Todo = require("../models/todo");

exports.getTodo = async(req,res) => {
    try {
      
        //fetch all todo items from database
        const todos = await Todo.find({});
        //response
        res.status(200).json({
            sucess:true,
            data:todos,
            message:"Entire Todo Data fatched",
        })

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

exports.getTodoById = async (req,res) => {
    try {
      
   //extrect todo items by id
        const id = req.params.id;
        const todo = await Todo.findById({_id: id})

        //data for given id not found
        if(!todo){
            return res.status(404).json({
                message:"No data found",
                sucess:false,
            })
        }
        // data for given id found
        res.status(200).json({
            sucess:true,
            data:todo,
            message:"one Todo Data found",
        })

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