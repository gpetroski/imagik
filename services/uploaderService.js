var Uploader = require('s3-uploader');

function UploaderService() {
    // Do nothing
}

UploaderService.prototype.init = function(s3bucket, config) {
    this.client = new Uploader(s3bucket, config);
    this.imageCollections = {};
    this.counter = 0;
};

UploaderService.prototype.upload = function(filePath) {
    var collectionId = this.collectionId();
    var self = this;
    var imageCollection = {
        collectionId: collectionId
    };
    this.client.upload(filePath, {}, function(err, versions, meta) {
        if (err) {
            console.log(err);
            imageCollection["error"] = err;
        } else {
            var imageUrls = [];
            versions.forEach(function(image) {
                console.log("uploaded: " + image.url);
                imageUrls.push(image.url);
            });
            imageCollection["urls"] = imageUrls;
        }
        self.imageCollections[collectionId] = imageCollection;
    });
    return collectionId;
};

UploaderService.prototype.getImageCollection = function(collectionId) {
    var collection = this.imageCollections[collectionId];
    return collection ? collection : { collectionId: collectionId };
};

UploaderService.prototype.collectionId = function() {
    if (this.counter >= 1000) {
        this.counter = 0;
    } else {
        this.counter++;
    }
    return this.counter;
};

module.exports = new UploaderService();