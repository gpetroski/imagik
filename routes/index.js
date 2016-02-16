var express = require('express');
var router = express.Router();
var multer  = require('multer');
var path = require('path');
var upload = multer({ dest: '/tmp/' });
var imageController = require('../controllers/imageController')

router.post("/image", upload.single('image'), imageController.uploadImage());
router.get("/image/:collectionId", imageController.getImageCollection());
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

module.exports = router;
