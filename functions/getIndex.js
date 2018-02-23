'use strict';
var user = "risabh.s";
//const doc = require('../models/doc');
const bcSdk = require('../query');
//var ownsLedgerData = [];
//var docArray = [];



exports.getIndex = (index1, index2) => {
 
    return new Promise((resolve, reject) => {

        bcSdk.readAllRequest({
            user: user,
            index1: index1,
            index2: index2
        })
    
       .then((index) => {
           console.log("index",index);
           var key =index[0].Key
            var value = index[0].Value
            console.log("key==============>",key)
            console.log("value===============>",value);

            return resolve({
                status: 200,
                query: index
            })
        })

        .catch(err => {

            if (err.code == 401) {

                return reject({
                    status: 401,
                    message: 'cant fetch !'
                });

            } else {
                console.log("error occurred" + err);

                return reject({
                    status: 500,
                    message: 'Internal Server !'
                });
            }
        })
    })
        
    
}




