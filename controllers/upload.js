const multer = require('multer')
const path = require('path')
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!'
    return cb(new Error('Only image files are allowed!'), false)
  }
  cb(null, true)
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})
const uploader = (req, res) => {
    
  // 'profile_pic' is the name of our file input field in the HTML form
  let upload = multer({
    storage: storage,
    fileFilter: imageFilter,
  }).single('profile_pic')

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
console.log(err)
console.log(req.file)
    if (req.fileValidationError) {
      return res.send(req.fileValidationError)
    } else if (!req.file) {
      return res.send('Please select an image to upload')
    } else if (err instanceof multer.MulterError) {
      return res.send(err)
    } else if (err) {
      return res.send(err)
    }

    // Display uploaded image for user validation
    res.send(req.file.path)
  })
}
module.exports = uploader