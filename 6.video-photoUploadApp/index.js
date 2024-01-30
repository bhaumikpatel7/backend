// app create
const express = require("express");
const app = express();

//PORT found
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir:'/tmp/'
}));

//db connection
const db = require("./config/database");
db.connect();

// cloud connecg
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload',Upload)

//activate server
app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})