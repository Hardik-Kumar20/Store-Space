const multer = require('multer');
const {cloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinary');
const { param } = require('../Routers/bookingRoute');


const storage = new cloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Store-Space',
        allowed_formats: ['jpg', 'jpeg', 'png']
    }
});

const upload = multer({storage});
module.exports = upload;