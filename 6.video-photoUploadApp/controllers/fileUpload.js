const File = require("../models/File");
const cloudinary = require("cloudinary")

// locslFileUploader ka handlers create kro

exports.localFileUpload = async (req,res) => {
    try {
        //fetch file
        const file = req.files.file;
        console.log("File Aagyi -->",file);

        let path = __dirname + "/files" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("PATH -->",path);
        file.mv(path,(error)=>{
            console.log(error);
        })

        res.json({
            sucess:true,
            message:"local file uploaded sucessfully"
        })
    } catch (error) {
        console.log(error);
    }
}

//image upload handler

function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type);
}

async function uploadFileToCloudinary(file,folder){
    const options = {folder};
    await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req,res) => {
    try {
        //data fatch
        const {name,tags,email} = req.body;
        console.log((name,tags,email));
        const file = req.file.imageFile;
        console.log(file);

        // validation
        const supportedType = ["jpg","jpeg","png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                sucess:false,
                message:"File format not supported"
            })
        }

        //file format supported hai
        const response = await uploadFileToCloudinary(file,"Bhaumik");

        //entry save in db
        // const  fileData = await File.create({
        //     name,
        //     tags,
        //     email,
        //     imageUrl
        // })

        res.json({
            sucess:true,
            message:"Image uploaded sucessfully"
        })



    } catch (error) {
        console.log(error);
        res.status(400).json({
            sucess:false,
            message:"somwthing went wrong"
        })
    }
}