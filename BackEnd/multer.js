const multer = require("multer");
const path = require("path");

//  Storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,"./uploads/");   // Destination Folder
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// File filter to accept only image
const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith("image/")){
        cb(null, true);
    }else{
        cb(new Error("Only image are allowed"),false);
    }
};

const upload = multer({storage, fileFilter});
module.exports = upload;