'use strict';
var user = "risabh.s";
//const request = require('../models/request');
const bcSdk = require('../query');



exports.getMongoDocs = (rapidID) => {
    return new Promise((resolve, reject) => {

        bcSdk.getHistory({
            rapidID:rapidID
            
            
        })

                // request.find({
                //         "rapidID": rapidID
                //     })

                    .then((docs) => {
                        console.log("docs",docs)
                        console.log("recorddates",docs[0].Records.date)
                        

                     return resolve({
                            status: 201,
                            docs: docs
                        })
                    })
            })
                
            .catch(err => {

                console.log("error occurred" + err);

                return reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
            })

};
