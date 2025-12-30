// eleven multer use for img

import multer from "multer";

const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, Date.now() + file.originalname) // using Date.now() prevent duplicate name errors
    }
})

const upload = multer({storage})

export default upload