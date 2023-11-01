const express = require('express');
const multer = require('multer');
const uploadController = require('../controller/uploadControllers');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.split('/')[0] === 'image') {
      cb(null, true);
    } else {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
    }
  },
  limits: { fileSize: 1000000000, files: 2 },
});

router.post('/upload', upload.array('file'), uploadController.uploadFiles);

module.exports = router;
