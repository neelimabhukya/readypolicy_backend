'use strict';

const user = require('../models/newuserlogin');

// const users = 'risabh.s';


exports.newlogin = (phonetosend,otp) => {
    return new Promise((resolve, reject) => {
    console.log("Entering in to the new login function");

    const newUser = new user({

        phone: phonetosend,
        otp: otp,
        created_at: new Date(),
        count:0
    });
    newUser
        .save()
        .then(() => resolve({status: 201, message: 'Please verify your phone no'}))
        .catch(err => {

            if (err.code == 11000) {

                reject({status: 409, message: 'number already registered!'});

            } else {

                reject({status: 500, message: 'Internal Server Error !'});
            }
        });
    });
}
