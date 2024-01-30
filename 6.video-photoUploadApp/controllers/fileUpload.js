const File = require("../models/File");

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