let multichain = require("multichain-node")({
    port: 9252,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "Axh1jhvBukXTXLAr8aVJzG829JFUZDrvptvqkoYkWyZd"
});


function getmulti() {
    
   return new Promise((resolve) => {
        var info = [];
        var response;    
   multichain.listStreamItems({stream: "mystream"}, (err, res) => {
        console.log(res)
        if(err == null){

           for (let i = 0; i < res.length; i++) {
                var string = '';
                var data=res[i].data;
                for (var j = 0; j < data.length; j += 2) {
                   string += String.fromCharCode(parseInt(data.substr(j, 2), 16))
                    }
               
               info.push({
                                            "publishers": res[i].publishers[0],
                                            "key": res[i].key,
                                            "data": string,
                                            "confirmations": res[i].confirmations,
                                            "blocktime": res[i].blocktime,
                                            "txid": res[i].txid,
                                            
                                       });
                }   

       console.log("info",info);

        return resolve({response:info});
        }else{
            console.log(err)
        }
    })

})
   
}



       




module.exports = {
    getmulti:getmulti
    

};