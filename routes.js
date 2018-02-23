'use strict';
var crypto = require('crypto');
var cors = require('cors');
const jwt = require('jsonwebtoken');
var fs = require('fs');

const auditUser = require('./functions/auditUser');
var cloudinary = require('cloudinary');
const getMongoDocs = require('./functions/getMongoDocs');
const approvedReject = require('./functions/shareDocs');
//const pdf = require('./functions/pdf')
const requestDocs = require('./functions/requestDocs');
const brandnewupdatevehical = require('./functions/brandnewupdatevehical');
const calculatepremium = require('./functions/calculatepremium');
const gproposal = require('./functions/gproposal');
const gproposalcar = require('./functions/gproposalcar');
const calculatecarpremium = require('./functions/calculatecarpremium');
const updatevehicalcardetails = require('./functions/updatevehicaldetails');
const register = require('./functions/register');
const doc = require('./functions/addDoc');
const fetchRequests = require('./functions/fetchRequests');
const registerOrg = require('./functions/registerorg');
const newlogin = require('./functions/newlogin');
const login = require('./functions/login');
const profile = require('./functions/profile');
const password = require('./functions/password');
const config = require('./config/config.json');
const user = require('./models/user');
const fetchUsersdocs = require('./functions/fetchUserdocs');
const shareDocument = require('./functions/sharedocument');
const revokeAccess = require('./functions/revokeAccess');
const getSharedDocs = require('./functions/getSharedDocs');
const getIndex = require('./functions/getIndex');
const getmulti = require('./functions/getmulti')
//const getSharedDocs = require('./functions/getSharedDocs');
const removedocs = require('./functions/removedocs');
const nodemailer = require('nodemailer');
const ocr = require('./functions/ocr');
const sendmulti = require('./functions/sendmulti.js');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var request = require('request');
var tesseract = require('node-tesseract');
var multer  = require('multer');
//var url = 'https://3.imimg.com/data3/NW/NK/MY-14074030/adhar-card-printing-service-500x500.jpg'
var filename = 'pic.jpg'
module.exports = router => {

    router.get('/', (req, res) => res.send("Welcome to digital identity !"));

//========================================================================================================================//
    router.get('/rapidID', cors(), (req, res) => {
        const rapidID = getrapidID(req);
        res.send({
            "rapidId": rapidID
        })

    });

//========================================================================================================================//

router.post('/login', cors(), (req, res) => {
            const emailID = req.body.email;
            const email = new Buffer(emailID).toString('base64');
            console.log(email,"email")
            const pinNo = req.body.pin;
            const pin = new Buffer(pinNo).toString('base64');
            console.log(pin,"pin")
    
            if (!email) {
    
                res.status(400).json({
                    message: 'Invalid Request !'
                });
    
    
            } else {
    
                login.loginUser(email, pin)
    
                .then(result => {
    
    
    
                    if ('orgname' in result.users._doc) {
    
                        const token = jwt.sign(result, config.secret, {
                            expiresIn: 60000000000
                        })
    
    
                        res.status(result.status).json({
                            message:"Sucessful",
                            token: token,
                             rapidID : result.users.rapidID,
                            usertype: "org",
                            username: result.users.orgname
                        });
    
                    } else {
                        const token = jwt.sign(result, config.secret, {
                            expiresIn: 600000000000
                        })
    
                        res.status(result.status).json({
                            message: "Sucessfull",
                            token: token,
                             rapidID : result.users.rapidID,
                            usertype: "ind",
                            username: result.users.firstname
                        });
                    }
                })
    
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
            }
        });
 //=============================================USERGETSREQUESTINFOBYKEYIND===========================================================================//     
     router.get('/getMongodocs',(req,res)=>{
        const rapidID = "bEp/BkES/ZGEEGTc9/4TBRC7j/Kx+1Y+XGrPvSHIfso=";
        console.log(rapidID,"rapidID")
                 if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
        // const rapidID = "6EILKlUHtPK1kmiDbuwc2MnmFhCeqefEe66NkHu7tdg=";
        // console.log(rapidID)
      //  const ID = getrapidID(res)
    //  //   console.log(ID,"rapidID")
    //             if (!rapidID) {
    //         console.log(" invalid body ")
    //         return res.status(400).json({
    //             message: 'Invalid Request !'
    //         });

    //     }
                    getMongoDocs.getMongoDocs(rapidID)
                    .then(result=>{
                       res.status(result.status).json({
                        docs: result.docs
                    })
                })
                
                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
            
        
    });

     //=============================================USERGETSREQUESTINFOBYKEYORG===========================================================================//     
     router.get('/getMongodocs1',(req,res)=>{
        const rapidID = "BfpEGxSv6LezTmKCl/lqxPIaXv07zIJ5RX0raf1ujc8=";
        console.log(rapidID,"rapidID")
                 if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }
        // const rapidID = "6EILKlUHtPK1kmiDbuwc2MnmFhCeqefEe66NkHu7tdg=";
        // console.log(rapidID)
      //  const ID = getrapidID(res)
    //  //   console.log(ID,"rapidID")
    //             if (!rapidID) {
    //         console.log(" invalid body ")
    //         return res.status(400).json({
    //             message: 'Invalid Request !'
    //         });

    //     }
                    getMongoDocs.getMongoDocs(rapidID)
                    .then(result=>{
                       res.status(result.status).json({
                        docs: result.docs
                    })
                })
                
                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
            
        
    });

    
//========================================================================================================================//    
router.post('/registerUser', cors(), (req, res) => {
    
            const firstname = req.body.firstname;
            console.log(firstname);
            const lastname = req.body.lastname;
            const emailID = req.body.email;
            const email = new Buffer(emailID).toString('base64');
            console.log(email,"email");
            const phone = req.body.phone;
            console.log(phone);
            const pinNo = req.body.pin;
            const pin = new Buffer(pinNo).toString('base64');
            console.log(pin);
            const rapidID = crypto.createHash('sha256').update(email.concat(phone)).digest('base64');
    
            if (!firstname || !lastname || !email || !pin || !phone) {
    
                res.status(400).json({
                    message: 'Invalid Request !'
                });
    
            } else {
    
                register.registerUser(firstname, lastname, email, phone, pin, rapidID)
    
                .then(result => {
    
                    res.status(result.status).json({
                        message: result.message,
                        ind: true
                    })
                })
    
                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
            }
        });
    

//========================================================================================================================//
//------------------organisation send request service-------------------------//    
router.post('/sendrequestdocs', (req, res) => {
            const from = getorgname(req);
            console.log(from,"from")
            const to = req.body.to;
            const email = req.body.email;
            const rapidID = "BfpEGxSv6LezTmKCl/lqxPIaXv07zIJ5RX0raf1ujc8=";
            console.log(rapidID,"rapidID")
            var docs = req.body.docs;
            const period = req.body.period;
            const date =  new Date();
            const time = date.getHours();
            console.log("time",date);
           // const status = req.body.status;
         //check if token is valid
            if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
           })
        }
             //body required field validation
        if ( !rapidID || !docs) {
            console.log(" invalid body ")
            return res.status(400).json({
                message: 'Invalid Request !'
            });

        }
             
        requestDocs.reqstDocs(from ,to ,email, rapidID,  docs, period,date)

                .then(result => {
                    var transporter = nodemailer.createTransport("SMTP", {
                        host: 'smtp.ipage.com',
                        port: 587,
                        secure: true,
                        auth: {
                            user: "rahul.desai@rapidqube.com",
                            pass: "Rpqb@12345"
                        }
                    });
                                       
                                        var mailOptions = {
                                            transport: transporter,
                                            from: 'rahul.desai@rapidqube.com',
                                            to: email,
                                            subject: 'Document requirnment',
                    
                                            html: "Hello,<pre>"+to+ "</pre>We Request You to Share Your &nbsp;"+docs+"&nbsp;to&nbsp;"+from+""+"("+rapidID+")"+"<br>for a Period of&nbsp;"+period+""
                                        };
                                        transporter.sendMail(mailOptions, (error, info) => {
                                            if (error) {}
                                        });
                                       
                   
            
            

                    res.status(result.status).json({
                        message: result.message,

                    })
                })
                

                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
                
})

//========================================================================================================================//
//------------------individual send response service-------------------------//    
router.post('/responsedocs', (req, res) => {
    const from = getindname(req);
    console.log(from,"from")
    const to = req.body.to;//getorgname(req);
    const email = "rahdesai7@gmail.com";
    const rapidID = "bEp/BkES/ZGEEGTc9/4TBRC7j/Kx+1Y+XGrPvSHIfso="//getrapidID(req)
    var docs = req.body.docs;
    const period = req.body.period;
    const date =  new Date();
    const time = date.getHours();
    console.log("time",date);
    const status = req.body.status;
    console.log("status",status);
 //check if token is valid
    if (!checkToken(req)) {
    console.log("invalid token")
    return res.status(401).json({
        message: "invalid token"
   })
}

     //body required field validation
if ( !rapidID || !status) {
    console.log(" invalid body ")
    return res.status(400).json({
        message: 'Invalid Request !'
    });

}
     
requestDocs.reqstDocs(from ,to ,email, rapidID,  docs, period ,date ,status)

        .then(result => {

                res.status(result.status).json({
                message: result.message,

            })
        })
        

        .catch(err => res.status(err.status).json({
            message: err.message
        }).json({
            status: err.status
        }));
        
})
//========================================================================================================================//
//===================Acknowledge Request===================================================//    

 router.post('/approveReject', (req, res) => {  
    const rapidID = (Math.floor(1000 + Math.random() * 9000)).toString();   
    console.log(rapidID);
    //getrapidID(req);
        // const docTypes = req.body.docTypes;
        const to = req.body.to.result;
        console.log("rapidid",rapidID);
        //body required field validation
        if (!rapidID || !to ) {
            console.log(" invalid body ")
            return res.status(400).json({
                message: 'Invalid Request !'
            });

        }
 
        approvedReject.approvedReject(rapidID, to)

            res.status(200).json({
                message: "sucess"

            })
        
           
               
           
 
 })



    
//========================================================================================================================//
  
        router.get('/fetchrequests', (req, res) => {
           
        //            if (!checkToken(req)) {
        //     console.log("invalid token")
        //     return res.status(401).json({
        //         message: "invalid token"
        //     })
        // }

             const email = getemail(req);

        //      if (!email) {
        //     console.log(" invalid body ")
        //     return res.status(400).json({
        //         message: 'Invalid Request !'
        //     });

        // }
                fetchRequests.fetchrequest(email)

                .then(result => {
                    var activeRequest = [];
                    //  console.log("length of result array"+result.campaignlist.body.campaignlist.length);
                    for (let i = 0; i < result.notifications.length; i++) {

                        if (result.notifications[i].status === "request sent") {

                            activeRequest.push(result.notifications[i]);


                        } else if (result.notifications[i].status === "active") {

                            return res.json({
                                status: 409,
                                message: 'requests not found'
                            });


                        }
                    }
                    res.status(result.status).json({
                        message: result.message,
                        requests: activeRequest
                    })
                })

                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status
                }));
            
      
    });
    
//========================================================================================================================//
router.post('/registerOrg', cors(), (req, res) => {
    
            const orgname = req.body.orgname;
            const emailID = req.body.email;
            const email = new Buffer(emailID).toString('base64');
            const orgcontact = req.body.orgcontact;
            const pinNo = req.body.pin;
            const pin = new Buffer(pinNo).toString('base64');
            const rapidID = crypto.createHash('sha256').update(email.concat(orgcontact)).digest('base64');
    
    
            if (!orgname || !email || !pin || !orgcontact || !rapidID || !orgname.trim() || !email.trim() || !pin.trim() || !orgcontact.trim()) {
    
                res.status(400).json({
                    message: 'Invalid Request !'
                });
    
            } else {
    
                registerOrg.registerOrg(orgname, email, orgcontact, pin, rapidID)
    
                .then(result => {
    
                  //  res.setHeader('Location', '/org/' + email);
                    res.status(result.status).json({
                        message: result.message,
                        org: true
                    })
                })
    
                .catch(err => res.status(err.status).json({
                    message: err.message,
                    status: err.status
                }));
            }
        });
//========================================================================================================================//
//----------------add document---------------------//    
router.post('/addDoc', cors(), (req, res) => {

            const docType = req.body.docType;
            const docNo = req.body.docNo;
          //  const rapid_doc_ID = crypto.createHash('sha256').update(docNo).digest('base64');
           const rapidID = '123'//getrapidID(req);
           console.log(rapidID,"rapidId")
          // const docinfo = req.body.docinfo;
            
             if (!checkToken(req)) {
            console.log("invalid token")
            return res.status(401).json({
                message: "invalid token"
            })
        }

             if (!docType||!docNo||!rapidID) {
            console.log(" invalid body ")
            return res.status(400).json({
                message: 'Invalid Request !'
            });

        }

                doc.addDoc(docType, docNo, rapidID)

                .then(result => {
            res.status(result.status).json({
                        message: result.message
                    })
                })

                .catch(err => res.status(err.status).json({
                    message: err.message
                }));

        
    });

//========================================================================================================================//

    router.get('/getMydocs', cors(), (req, res) => {
        //token validation
        // if (!checkToken(req)) {
        //     console.log("invalid token")
        //     return res.status(401).json({
        //         message: "invalid token"
        //     })
        // }
            const rapidID = getrapidID(req);

                if (!rapidID) {
                console.log("invalid json input")
                return res.status(400).json({
                message: 'invalid user,token not valid or found'
                })
                }

                fetchUsersdocs.fetchUsersdocs(rapidID)

                .then(result => {


                    res.status(result.status).json({
                        docObj: result.docArray,
                        message: "fetched successfully"
                    })
                })

                .catch(err => res.status(err.status).json({
                    message: err.message
                }));

            })
//========================================================================================================================//         

   
router.get('/getIndex',  (req, res) => {
    var requestList = [];
     const index1 ='0000';
       const index2 = '9999';
   getIndex.getIndex(index1, index2)
.then(function(result) {
        console.log("result==============>",result)

res.status(result.status).json({ message: result.query});
})

.catch(err => res.status(err.status).json({
    message: err.message
}));

})


//---------------------Report Generation------------------------------//
    router.get('/reportGeneration', cors(), (req, res) => {
        // if (!checkToken(req)) {
        //     console.log("invalid token")
        //     return res.status(401).json({
        //         message: "invalid token"
        //     })
        // }
            const rapidID = "EzPfNzKmn20zz6x4pVzKma7rvRHs0Q9kQwXfNfvE69M=" //getrapidID(req);

            if (!rapidID) {
                console.log("invalid json input")
                return res.status(400).json({
                message: 'invalid user,token not valid or found'
                })
                }

                auditUser.auditUser(rapidID)

                .then(result => {


                    res.status(result.status).json({
                        org: result.orgname,
                        dates: result.timestamp,
                        doctypes: result.documentid,
                        message: "organisation fetched sucessfully"
                    })
                })

                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
    });

//========================================================================================================================//
   //----------Remove documents-------------// 
   router.post('/removedocs', cors(), (req, res) => {
    if (!checkToken(req)) {
         console.log("invalid token")
         return res.status(401).json({
             message: "invalid token"
         })
     }
         const rapidID = "bEp/BkES/ZGEEGTc9/4TBRC7j/Kx+1Y+XGrPvSHIfso=";
         const docs = req.body.docType
         
        
         if (!rapidID || !docs) {
             console.log("invalid json")
           return  res.status(400).json({
                 message: 'wrong json input'
             });

         }
             removedocs.removedocs(rapidID, docs)

             .then(result => {


                 res.status(result.status).json({
                     message: result.message
                 })
             })

             .catch(err => res.status(err.status).json({
                 message: err.message
             }));           

 });


//========================================================================================================================//   
    router.get('/getSharedDocs', cors(), (req, res) => {
        if (checkToken(req)) {
            console.log("invalid token")
            const rapidID = getrapidID(req);
            if (!rapidID) {

                res.status(400).json({
                    message: 'invalid user,token not valid or found'
                });

            } else {

                getSharedDocs.getSharedDocs(rapidID)

                .then(result => {


                    res.status(result.status).json({
                        message: result.sharedDocs
                    })
                })

                .catch(err => res.status(err.status).json({
                    message: err.message
                }));

            }
        }

    });

//========================================================================================================================//
  //------------Revoke Acess-----------//
    router.post('/revokeAccess', cors(), (req, res) => {
        const rapidID = getrapidID(req);
        const orgID = req.body.orgID;
        const rapid_doc_ID = req.body.rapid_doc_ID;

        if (!rapidID || !rapid_doc_ID || !orgID) {
            res.status(400).json({
                message: 'invalid user,token not valid or found'
            });
        } else {
            revokeAccess.revokeAccess(rapidID, rapid_doc_ID, orgID)

            .then(result => {


                res.status(result.status).json({
                    message: result.message
                })
            })

            .catch(err => res.status(err.status).json({
                message: err.message
            }));

        }
    });
//========================================================================================================================//
    // router.get('/audit', cors(), function(req, res) {
    //     if (checkToken(req)) {

    //         console.log(req.body)

    //         res.send([{
    //                 "date": "25 july 2017",
    //                 "docType": "aadhar",
    //                 "org": "icici"
    //             },
    //             {
    //                 "date": "12 july 2017",
    //                 "docType": "aadhar",
    //                 "org": "hdfc"
    //             },
    //             {
    //                 "date": "10 july 2017",
    //                 "docType": "pan card",
    //                 "org": "icici"
    //             },
    //             {
    //                 "date": "2 july 2017",
    //                 "docType": "passport",
    //                 "org": "swiss bank"
    //             }
    //         ])
    //     } else {
    //         res.status(400).json({
    //             message: 'invalid user,token not valid or found'
    //         });

    //     }
    // });
//========================================================================================================================//

    // router.put('changePassword', (req, res) => {

    //     if (checkToken(req)) {

    //         const oldPin = req.body.pin;
    //         const newPin = req.body.newPin;

    //         if (!oldPin || !newPin || !oldPin.trim() || !newPin.trim()) {

    //             res.status(400).json({
    //                 message: 'Invalid Request !'
    //             });

    //         } else {

    //             password.changePassword(req.params.id, oldPassword, newPassword)

    //             .then(result => res.status(result.status).json({
    //                 message: result.message
    //             }))

    //             .catch(err => res.status(err.status).json({
    //                 message: err.message
    //             }));

    //         }
    //     } else {

    //         res.status(401).json({
    //             message: 'Invalid Token !'
    //         });
    //     }
    // });

//========================================================================================================================//
//   router.post('/forgotPassword', (req, res) => {

//         const email = req.params.id;
//         const token = req.body.token;
//         const newPassword = req.body.password;

//         if (!token || !newPassword || !token.trim() || !newPassword.trim()) {

//             password.resetPasswordInit(email)

//             .then(result => res.status(result.status).json({
//                 message: result.message
//             }))

//             .catch(err => res.status(err.status).json({
//                 message: err.message
//             }));

//         } else {

//             password.resetPasswordFinish(email, token, newPassword)

//             .then(result => res.status(result.status).json({
//                 message: result.message
//             }))

//             .catch(err => res.status(err.status).json({
//                 message: err.message
//             }));
//         }
//     });
//=====================================DataInMultichain=============================//
router.post("/postMultichain", cors(), (req, res) => {
    
               const key = req.body.key;
               const data = req.body.data;
                console.log("data", data);
                console.log("key",key)
               sendmulti.sendmulti(data,key)
                    .then((result) =>{
    
                       return res.json({
                            "status": 200,
                            "message": result.query
                        });
                    })
                    .catch(err => res.status(err.status).json({
                        message: err.message
                    }));
           
             
            
        });
        //==================================================GETdtafromMultichain===================================//
        router.get("/getMultichain", cors(), (req, res) => {
            
                  
            
            
            
            
                       getmulti.getmulti()
                            .then(function(result) {
                                console.log("result.query---->", JSON.stringify (result.query));
                                return res.json({
                                    "status": 200,
                                    "getdata": JSON.stringify (result.query)
                                });
                            })
                            .catch(err => res.status(err.status).json({
                                message: err.message
                            }));
                     
                    
                    
                });
//===============================================brandnewupdatevehical==============================================================//
router.post('/brandnewupdatevehical', (req, res) => {

    const updatevehical = req.body.CALCULATEPREMIUMREQUEST;
   
  
   console.log(updatevehical,"brandnewupdatevehical")
  
    
    

     if (!updatevehical) {
    console.log(" invalid body ")
    return res.status(400).json({
        message: 'Invalid Request !'
    });

}else{

    brandnewupdatevehical.brandnewupdatevehical(updatevehical)

    .then(result => {
       
            res.status(result.status).json({
                message: result.message,
                response: result.Response
            })
        })

        .catch(err => res.status(err.status).json({
            message: err.message
        }));

    }
});
//=================================================calculatepremium=====================================================//
router.post('/calculatepremium', (req, res) => {

    const premiumrequest = req.body.CALCULATEPREMIUMREQUEST;
   
  
   console.log(premiumrequest,"premiumrequest")
  
    
    

     if (!premiumrequest) {
    console.log(" invalid body ")
    return res.status(400).json({
        message: 'Invalid Request !'
    });

}else{

    calculatepremium.calculatepremium(premiumrequest)

    .then(result => {
       
            res.status(result.status).json({
                message: result.message,
                response: result.Response
            })
        })

        .catch(err => res.status(err.status).json({
            message: err.message
        }));

    }
});   

//=================================================gproposal=====================================================//
router.post('/gproposalrequest', (req, res) => {

    const proposalrequest = req.body.GPROPOSALREQUEST;
   
  
   console.log(proposalrequest,"proposalrequest")
  
    
    

     if (!proposalrequest) {
    console.log(" invalid body ")
    return res.status(400).json({
        message: 'Invalid Request !'
    });

}else{

        gproposal.gproposal(proposalrequest)

    .then(result => {
       
            res.status(result.status).json({
                message: result.message,
                response: result.Response
            })
        })

        .catch(err => res.status(err.status).json({
            message: err.message
        }));

    }
});   

//=================================================calculatecarpremium=====================================================//
router.post('/calculatecarpremium', (req, res) => {

    const calculatepremium = req.body.CALCULATEPREMIUMREQUEST;
   
  
   console.log(calculatepremium,"calculatepremium")
  
    
    

     if (!calculatepremium) {
    console.log(" invalid body ")
    return res.status(400).json({
        message: 'Invalid Request !'
    });

}else{

        calculatecarpremium.calculatecarpremium(calculatepremium)

    .then(result => {
       
            res.status(result.status).json({
                message: result.message,
                response: result.Response
            })
        })

        .catch(err => res.status(err.status).json({
            message: err.message
        }));

    }
});  

//=================================================updatevehical=====================================================//
router.post('/updatevehicalcardetails', (req, res) => {

    const updatevehical = req.body.CALCULATEPREMIUMREQUEST;
   
  
   console.log(updatevehical,"updatevehical")
  
    
    

     if (!updatevehical) {
    console.log(" invalid body ")
    return res.status(400).json({
        message: 'Invalid Request !'
    });

}else{

        updatevehicalcardetails.updatevehical(updatevehical)

    .then(result => {
       
            res.status(result.status).json({
                message: result.message,
                response: result.Response
            })
        })

        .catch(err => res.status(err.status).json({
            message: err.message
        }));

    }
});

//=================================================gproposalcar=====================================================//
router.post('/gproposalcar', (req, res) => {

    const gpproposalcar = req.body.GPROPOSALREQUEST;
   
  
   console.log(gpproposalcar,"gpproposalcar")
  
    
    

     if (!gpproposalcar) {
    console.log(" invalid body ")
    return res.status(400).json({
        message: 'Invalid Request !'
    });

}else{

        gproposalcar.gpcar(gpproposalcar)

    .then(result => {
       
            res.status(result.status).json({
                message: result.message,
                response: result.Response
            })
        })

        .catch(err => res.status(err.status).json({
            message: err.message
        }));

    }
});

//====================================================calculatepremium(rollover)==================================================//
router.post('/calculatepremiumrollover', (req, res) => {

    const calculatepremiumrollover = req.body.GPROPOSALREQUEST;
   
  
   console.log(gpproposalcar,"gpproposalcar")
  
    
    

     if (!gpproposalcar) {
    console.log(" invalid body ")
    return res.status(400).json({
        message: 'Invalid Request !'
    });

}else{

        gproposalcar.gpcar(gpproposalcar)

    .then(result => {
       
            res.status(result.status).json({
                message: result.message,
                response: result.Response
            })
        })

        .catch(err => res.status(err.status).json({
            message: err.message
        }));

    }
});
router.post('/newLogin', cors(), (req, res) => {


    var phonetosend = req.body.phone;

    var otp = "";
    var possible = "0123456789";
    for (var i = 0; i < 4; i++)
        otp += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log("otp" + otp);

    var otptosend = 'your otp is ' + otp;

    if (!phonetosend) {

         res
            .status(400)
            .json({
                message: 'Invalid Request !'
            });

    } else {

        newlogin
            .newlogin(phonetosend, otp)
            .then(result => {



                nexmo
                    .message
                    .sendSms('919768135452', phonetosend, otptosend, {
                        type: 'unicode'
                    }, (err, responseData) => {
                        if (responseData) {
                            console.log(responseData)
                        }
                    });
              return res
                    .status(result.status)
                    .json({
                        message: result.message,
                        phone: phonetosend
                    });

            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));
    }
});
//===========================================================================================================================//
function checkToken(req) {

        const token = req.headers['x-access-token'];

        if (token) {

            try {

                var decoded = jwt.verify(token, config.secret);

                return true;


            } catch (err) {

                return false;
            }

        } else {

            return false;
        }
   }

    function getrapidID(req) {

        const token = req.headers['x-access-token'];

        if (token) {

            try {

                var decoded = jwt.verify(token, config.secret);
                return decoded.users.rapidID;


            } catch (err) {

                return false;
            }

        } else {

            return false;
        }
    }

    function getorgname(req) {

        const token = req.headers['x-access-token'];

        if (token) {

            try {

                var decoded = jwt.verify(token, config.secret);
                var orgname = decoded.users.orgname;
                // var rapidID = decoded.users.rapidID;

                return orgname

            } catch (err) {

                return false;
            }

        } else {

            return false;
        }
    }


    function getindname(req) {
        
                const token = req.headers['x-access-token'];
        
                if (token) {
        
                    try {
        
                        var decoded = jwt.verify(token, config.secret);
                        var firstname = decoded.users.firstname;
                        // var rapidID = decoded.users.rapidID;
        
                        return firstname
        
                    } catch (err) {
        
                        return false;
                    }
        
                } else {
        
                    return false;
                }
            }

    function getemail(req) {

        const token = req.headers['x-access-token'];

        if (token) {

            try {

                var decoded = jwt.verify(token, config.secret);
                var email = decoded.users.email;


                return email



            } catch (err) {

                return false;
            }

        } else {

            return false;
        }
    }



/*=========================================================================================== */
router.post('/ocrUser',  multipartMiddleware, function(req, res, next) {
    var writeFileStream = fs.createWriteStream(filename)
     //result = new Result(req.body);
     console.log("req.files.image" + JSON.stringify(req.files));
      var imageFile = req.files.file.path;
      console.log(imageFile,"imageFile")
    cloudinary.config({ 
      cloud_name: 'dazhtqo71', 
      api_key: '132377556556233', 
      api_secret: 'pM5lX9Ue7WzoOiSrskkxI3JiU34' 
    });
    
    cloudinary.uploader.upload(imageFile, function(result) { 
      console.log("file uploded to cloudnary")
      result = result
      console.log("result"+result)
      ocr.ocrUser(result)
    
    
    request(result).pipe(writeFileStream).on('close', function() {
      console.log(result, 'saved to', filename)
    
    
    tesseract.process('pic.png', (err, text) => {
        if(err){
            return console.log("An error occured: ", err);
        }
        
     console.log("text",text);
     var len = text.length
      var arr = text.split("\n");
      console.log("firstName"+arr[1])
     //console.log("lastName"+arr[2])
      console.log("lastName"+arr[3])
     // console.log("DOB"+arr[4])
      console.log("DOB"+arr[5])
      console.log("PanNo"+arr[8])
      
     console.log("length"+len)
      for (var i = 0; i < len; i++) {
                // if (arr[i].indexOf("NUMBER") > -1) 
                {
                    console.log("NUMBER is : ");
                    console.log(arr[i + 1]);
                }
      }
       console.log("Recognized text:");
        // the text variable contains the recognized text
       
         res.send([{
                        "firstame": arr[1],
                        "lastname": arr[3],
                        "dob": arr[5],
                        "panno": arr[8]    
                       
                    },
                  
                ])
        });    
    })
    });
    }) 
//===========================================================================================================================//
// router.post('/individualDetails', cors(), (req, res) => {

//         const name = req.body.orgname;
//         const email = req.body.email;
//         const orgcontact = req.body.orgcontact;
//         const pin = req.body.pin;
//         const rapidID = crypto.createHash('sha256').update(email.concat(orgcontact)).digest('base64');


//         if (!orgname || !email || !pin || !orgcontact || !rapidID || !orgname.trim() || !email.trim() || !pin.trim() || !orgcontact.trim()) {

//             res.status(400).json({
//                 message: 'Invalid Request !'
//             });

//         } else {

//             registerOrg.registerOrg(orgname, email, orgcontact, pin, rapidID)

//             .then(result => {

//                 res.setHeader('Location', '/org/' + email);
//                 res.status(result.status).json({
//                     message: result.message,
//                     org: true
//                 })
//             })

//             .catch(err => res.status(err.status).json({
//                 message: err.message,
//                 status: err.status
//             }));
//         }
//     });
    };
   