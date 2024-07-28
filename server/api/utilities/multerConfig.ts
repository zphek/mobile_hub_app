import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
        cb(null, 'uploads/');
    },
    filename: function (req:any, file:any, cb:any) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function fileFilter(req:any, file:any, cb:any) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

export default upload;
