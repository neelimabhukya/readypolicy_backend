'use strict';

var User = require('../models/image');



exports.ocrUser = (result) =>{
    console.log('result',result)

   return new Promise((resolve, reject) => {

       const ocrUser = new User({

           result: result,
        });
       
        ocrUser.save()

         .then(() => 
       resolve({
            status: 200,
            message: 'Image Saved Sucessfully !'
        }))

        .catch(err => {

           if (err.code === 11000) {

               reject({
                    status: 409,
                    message: 'Error'
                });

           } else {

               reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
            }
        });
    })
};
