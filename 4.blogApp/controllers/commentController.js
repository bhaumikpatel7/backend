/*//import model

const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

//business logic

exports.createComment = async (req, res) => {
  try {
    //fetch data from request
    const { post, user, body } = req.body;
    //create commment obj
    const comment = new Comment({
      post,
      user,
      body,
    });

    //save the new comment into the database
    const saveComment = await comment.save();

    //find the post by ID , add the new comment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: saveComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();
    //populate the comments array with comment doc
    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "error while creating comment",
    });
  }
};*/


//--------------------------------------------

// import model 
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const { response } = require("express");

// business Logic
exports.createComment = async (req, res) => {
    try {
        // fetch data from request body 
        const { post, user, body } = req.body;

        // create comment object
        const comment = new Comment({
            post, user, body
        })

        // save the new comment object into the db 
        const savedComment = await comment.save();

        // Find the Post By Id and the new comment to its comment array 
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } },
            { new: true })
            .populate("comments") //Populates the comment array with the comments document
            .exec();

        res.json({
            post: updatedPost,
        })
    }
    catch (err) {
        return res.status(500).json({
            error : "Error while creating comment",            
        })
    }
}