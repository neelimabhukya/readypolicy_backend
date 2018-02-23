'use strict';


var bcSdk = require('../invokem.js');

exports.sendmulti = (data,key) => {
    return new Promise((resolve, reject) => {
    const transactiondetails = ({
        data: data,
        key:key
    });
        console.log("entering in sendmulti.......!tx details",transactiondetails)
        
    bcSdk.sendmulti({
       Transactiondetails:transactiondetails   
        })

      .then((requestarray) => {
            console.log("data in requestArray" + requestarray)

          return resolve({
                status: 200,
                query: requestarray
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
                    message: 'Internal Server Error !'
                });
            }
        })
    })
};