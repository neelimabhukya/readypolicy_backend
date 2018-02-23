'use strict';

var bcSdk = require('../invoke');
const user = 'risabh.s';
const doc = require('../models/request');

exports.removedocs = (rapidID, docs) => {
    console.log(rapidID,"rapidId11")
    console.log(docs,"docType")

return new Promise((resolve, reject) => {

        const deleteDocs = new doc ({
            rapidID: rapidID,
            docs: docs

        });

        bcSdk.removedocs({
            user: user,
            deleteDocs: deleteDocs
        })
        doc.deleteMany({ "rapidID": rapidID })

       .then(() => resolve({
            status: 201,
            message: 'doc deleted Sucessfully !'
        }))


        .catch(err => {

            reject({
                status: 500,
                message: 'Internal Server Error !'
            });
        })
    })};