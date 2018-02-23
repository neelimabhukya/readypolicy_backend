'use strict';

const reqdocs = require('../models/request');
var bcSdk = require('../invoke');
const users = 'risabh.s';


exports.reqstDocs = (from, to, email, rapidID,docs,period,date,status) =>{
    console.log("from",from)

return    new Promise((resolve, reject) => {

        const request = new reqdocs({
           
            from:from,
            to:to,
            email:email,
            rapidID:rapidID,
            docs:docs,
            period:period,
            date:date,
            status:status,
        });

        request.save()

            .then(() => resolve({
                status: 201,
                message: "Hello" +to+ "We Request You to Share Your" +docs+ "to" +from+ "for a Period of" +period+ ""
            }))

            .then(() => bcSdk.UserDocs({
                user: users,
                UserDocs: request
            }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({
                        status: 409,
                        message: 'request Already sent !'
                    });

                } else {

                    reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
                }
            });
    })};