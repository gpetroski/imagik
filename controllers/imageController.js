var uploaderService = require('../services/uploaderService');

exports.uploadImage = function() {
    return function(req, res) {
        var guid = uploaderService.upload(req.file.path);
        res.json({ collectionId: guid });
    };
};

exports.getImageCollection = function() {
    return function(req, res) {
        res.json(uploaderService.getImageCollection(req.params.collectionId));
    };
};