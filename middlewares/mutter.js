const multer = require('multer')
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

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1590000,
  },
  fileFilter: fileFilter,
})

module.exports = upload
