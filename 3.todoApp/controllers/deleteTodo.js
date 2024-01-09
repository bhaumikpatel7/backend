const Todo = require("../models/todo");

//define route handler

exports.deleteTodo = async(req,res) => {
    try {
        const { id } = req.params;
    
    
        await Todo.findByIdAndDelete(id);
    
        res.status(200).json({
          sucess: true,
          message: "todo data deleted sucessfully fatched",
         
        });


    } catch (error) {
        console.error(error);
        console.log(error);
        res.status(500),json({
            sucess:false,
            data:"internal server error",
            message:error.message,
        })
    }
}