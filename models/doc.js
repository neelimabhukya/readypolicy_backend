'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const docSchema = mongoose.Schema({

    to: String,
    docNo: { type: String, unique: true },
    requestID: String,
    rapidID: String,
    docTypes: String,
    from: String,
    period:String,
});

                              
                                
                               
                                
                          
                               

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });
mongoose.connect('mongodb://rpqb:rpqb123@ds131583.mlab.com:31583/digitalid', { useMongoClient: true });

module.exports = mongoose.model('doc', docSchema);