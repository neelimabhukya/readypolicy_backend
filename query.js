'use strict';
/*
 * Copyright IBM Corp All Rights Reserved
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/*
 * Hyperledger Fabric Sample Query Program
 */

var hfc = require('fabric-client');
var path = require('path');

var options = {
    wallet_path: path.join(__dirname, './creds'),
    user_id: 'PeerAdmin',
    channel_id: 'mychannel',
    chaincode_id: 'digi-16',
    network_url: 'grpc://localhost:7051',
};

var channel = {};
var client = null;

function getMydocs(params) {
    return Promise.resolve().then(() => {
        console.log("Create a client and set the wallet location");
        client = new hfc();
        return hfc.newDefaultKeyValueStore({ path: options.wallet_path });
    }).then((wallet) => {
        console.log("Set wallet path, and associate user ", options.user_id, " with application");
        client.setStateStore(wallet);
        return client.getUserContext(options.user_id, true);
    }).then((user) => {
        console.log("Check user is enrolled, and set a query URL in the network");
        if (user === undefined || user.isEnrolled() === false) {
            console.error("User not defined, or not enrolled - error");
        }
        channel = client.newChannel(options.channel_id);
        channel.addPeer(client.newPeer(options.network_url));
        return;
    }).then(() => {
        var rapidID = params.rapidID;
        console.log(rapidID);
        console.log("Make query");
        var transaction_id = client.newTransactionID();
        console.log("Assigning transaction_id: ", transaction_id._transaction_id);

        // queryCar - requires 1 argument, ex: args: ['CAR4'],
        // queryAllCars - requires no arguments , ex: args: [''],
        const request = {
            chaincodeId: options.chaincode_id,
            txId: transaction_id,
            fcn: 'getMydocs',
            args: [rapidID]
        };
        return channel.queryByChaincode(request);
    }).then((query_responses) => {
        console.log("returned from query");
        if (!query_responses.length) {
            console.log("No payloads were returned from query");
        } else {
            console.log("Query result count = ", query_responses.length)
        }
        if (query_responses[0] instanceof Error) {
            console.error("error from query = ", query_responses[0]);
        }
        console.log("Response is ", query_responses[0].toString());

        var userdocs = JSON.parse(query_responses[0].toString());
        console.log("userdocs", userdocs);
        return userdocs;
    }).catch((err) => {
        console.error("Caught Error", err);
    });
}

function readAllRequest(params) {
    return Promise.resolve().then(() => {
        console.log("Create a client and set the wallet location");
        client = new hfc();
        return hfc.newDefaultKeyValueStore({ path: options.wallet_path });
    }).then((wallet) => {
        console.log("Set wallet path, and associate user ", options.user_id, " with application");
        client.setStateStore(wallet);
        return client.getUserContext(options.user_id, true);
    }).then((user) => {
        console.log("Check user is enrolled, and set a query URL in the network");
        if (user === undefined || user.isEnrolled() === false) {
            console.error("User not defined, or not enrolled - error");
        }
        channel = client.newChannel(options.channel_id);
        channel.addPeer(client.newPeer(options.network_url));
        return;
    }).then(() => {
        var index1 = params.index1;
        var index2 = params.index2;
        console.log("myindex"+index1, index2);
        console.log("Make query");
        var transaction_id = client.newTransactionID();
        console.log("Assigning transaction_id: ", transaction_id._transaction_id);

        // queryCar - requires 1 argument, ex: args: ['CAR4'],
        // queryAllCars - requires no arguments , ex: args: [''],
        const request = {
            chaincodeId: options.chaincode_id,
            txId: transaction_id,
            fcn: "readAllRequest",    
            args: [index1, index2]
        };
        return channel.queryByChaincode(request);
    }) .then((query_responses) => {
            console.log("returned from query");
            if (!query_responses.length) {
                console.log("No payloads were returned from query");
            } else {
                console.log("Query result count = ", query_responses.length)
            }
            if (query_responses[0] instanceof Error) {
                console.error("error from query = ", query_responses[0]);
            }
            console.log("Response is ", query_responses[0].toString());
          //  console.log("parsed data",JSON.parse(query_responses[0].toString()))
            return (JSON.parse(query_responses[0].toString()));
        })
        .catch((err) => {
            console.error("Caught Error", err);
        });
}

function getHistory(params) {
    return Promise.resolve().then(() => {
        console.log("Create a client and set the wallet location");
        client = new hfc();
        return hfc.newDefaultKeyValueStore({ path: options.wallet_path });
    }).then((wallet) => {
        console.log("Set wallet path, and associate user ", options.user_id, " with application");
        client.setStateStore(wallet);
        return client.getUserContext(options.user_id, true);
    }).then((user) => {
        console.log("Check user is enrolled, and set a query URL in the network");
        if (user === undefined || user.isEnrolled() === false) {
            console.error("User not defined, or not enrolled - error");
        }
        channel = client.newChannel(options.channel_id);
        channel.addPeer(client.newPeer(options.network_url));
        return;
    }).then(() => {
        var rapidID = params.rapidID;
        console.log("myindex"+rapidID);
        console.log("Make query");
        var transaction_id = client.newTransactionID();
        console.log("Assigning transaction_id: ", transaction_id._transaction_id);

        // queryCar - requires 1 argument, ex: args: ['CAR4'],
        // queryAllCars - requires no arguments , ex: args: [''],
        const request = {
            chaincodeId: options.chaincode_id,
            txId: transaction_id,
            fcn: "getHistory",    
            args: [rapidID]
        };
        return channel.queryByChaincode(request);
    }).then((query_responses) => {
        console.log("returned from query",query_responses);
        if (!query_responses.length) {
            console.log("No payloads were returned from query");
        } else {
            console.log("Query result count = ", query_responses.length)
        }
        if (query_responses[0] instanceof Error) {
            console.error("error from query = ", query_responses[0]);
        }
        console.log("Response is ", query_responses[0].toString());
        return (JSON.parse(query_responses[0].toString()));
        // var history = query_responses[0].toString();
        // console.log("readIndex", history);
        // return history;
    }).catch((err) => {
        console.error("Caught Error", err);
    });
}
module.exports = {
    getMydocs: getMydocs,
    readAllRequest:readAllRequest,
    getHistory:getHistory
}