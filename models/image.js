'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//  schema
var ocrSchema = mongoose.Schema({
    result: String
});

mongoose.Promise = global.Promise;

// connect to mongo
//mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });
mongoose.connect('mongodb://rpqb:rpqb123@ds131583.mlab.com:31583/digitalid', { useMongoClient: true });

// our model
module.exports = mongoose.model('image', ocrSchema);