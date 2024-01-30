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

function isFileTypeSupported(fileType,supportedType){
    return supportedType.includes(fileType);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.imageUpload = async (req,res) => {
    try {
        //data fatch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);
        const imageFile = req.files.imageFile;
        

        // validation
        const supportedType = ["jpg","jpeg","png"];
        const fileType = imageFile.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                sucess:false,
                message:"File format not supported"
            })
        }

        //file format supported hai
        const response = await uploadFileToCloudinary(imageFile,"Bhaumik");
        console.log(response);

        // //entry save in db
        // const fileData = await File.create({
        //     name,
        //     tags,
        //     email,
        //     fileUrl: response.secure_url
        // })

        res.json({
            sucess:true,   
            imageUrl:response.secure_url,
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

// video upload handler

exports.videoUpload = async (req, res) => {
    try {
        
        //data fatch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);
        const videoFile = req.files.videoFile;

        const file = req.files.videoFile;

        const supportedType = ["mp4","mov"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                sucess:false,
                message:"File format not supported"
            })
        }

           //file format supported hai
        const response = await uploadFileToCloudinary(file,"Bhaumik");
        console.log(response);

          // //entry save in db
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })

        res.json({
            sucess:true,   
            imageUrl:response.secure_url,
            message:"video uploaded sucessfully"
        })



    } catch (error) {
        console.log(error);
        res.status(400).json({
            sucess:false,
            message:"somwthing went wrong"
        })
    }
}

// image reducer

exports.imageSizeReducer = async (req,res) =>{
    try {
       //data fatch
       const {name,tags,email} = req.body;
       console.log(name,tags,email);
       const imageFile = req.files.imageFile;
       

       // validation
       const supportedType = ["jpg","jpeg","png"];
       const fileType = imageFile.name.split(".")[1].toLowerCase();

       if(!isFileTypeSupported(fileType,supportedType)){
           return res.status(400).json({
               sucess:false,
               message:"File format not supported"
           })
       }

       //file format supported hai
       const response = await uploadFileToCloudinary(imageFile,"Bhaumik",90);
       console.log(response);

       // //entry save in db
    //    const fileData = await File.create({
    //        name,
    //        tags,
    //        email,
    //        fileUrl: response.secure_url
    //    })

       res.json({
           sucess:true,   
           imageUrl:response.secure_url,
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


//-------------------------------------


        
