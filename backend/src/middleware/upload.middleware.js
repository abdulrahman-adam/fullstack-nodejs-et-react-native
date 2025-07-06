

// multer is a middleware for handling multipart/form-data, whitch is primary used for file upload

import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

    if(file.mimeType.startWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
}


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 5*1024*1024} // 5MB limit
})

export default upload;