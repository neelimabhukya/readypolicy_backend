'use strict';


const bcSdk = require('../querym.js');




exports.getmulti = () => {
    
  return new Promise((resolve, reject) => {
      
        
      bcSdk.getmulti({})

      .then((response) => {
            console.log("data in response " + response)

          return resolve({
                status: 200,
                query: response
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