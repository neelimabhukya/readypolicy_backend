'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = mongoose.Schema({

    to : String,
    from: String,
    rapidID: String,
    email: String,
    docs: Array,
    status: String,
    period: String,
    date: String,
    status:String,
});


mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });
mongoose.connect('mongodb://rpqb:rpqb123@ds131583.mlab.com:31583/digitalid', { useMongoClient: true });
module.exports = mongoose.model('request', requestSchema);