let multichain = require("multichain-node")({
    port: 9253,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "Axh1jhvBukXTXLAr8aVJzG829JFUZDrvptvqkoYkWyZd"        
});


function sendmulti(params) {
  
    return new Promise((resolve) => {
        var response;

   var key = params.Transactiondetails.key;
    var data = params.Transactiondetails.data;
    var hex = '';
    for(var i=0;i<data.length;i++) {
        hex += ''+data.charCodeAt(i).toString(16);
    }
    console.log("hex",hex);
    
   multichain.publish({stream: "mystream",key: key,data: hex }, (err, res) => {
        console.log(res)
        if(err == null){
         return resolve({response:res});
        }else{
            console.log(err)
        }
    })

})
   
}
module.exports = {
    sendmulti: sendmulti
    

};