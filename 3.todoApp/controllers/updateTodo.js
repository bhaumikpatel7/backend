const Todo = require("../models/todo");

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description, updatedAt: Date.now() }
    );

    res.status(200).json({
      sucess: true,
      message: "todo data sucessfully fatched",
      data: todo,
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500),
      json({
        sucess: false,
        data: "internal server error",
        message: error.message,
      });
  }
};
