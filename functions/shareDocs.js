'use strict';


var bcSdk = require('../invoke');

//const nodemailer = require('nodemailer');

return new Promise((resolve, reject) => {

    exports.approvedReject = (rapidID, to) => {
    console.log("to=====================>in shareddocs",to)

  

                           const sharedDocDetails =({
                                rapidID: rapidID,
                                to: to
                                })
                             bcSdk.shareDocument({
                                
                                    sharedDocs: sharedDocDetails
                                })

                        return resolve({
                                    status: 201,
                                    message: 'success'
                                })
                    
                            
        

    }
})
