var js2xmlparser = require("js2xmlparser");
//var xml2jsparser = require("xml2jsparser")
var parser = require('xml2json');
var request = require("request");
var utf8 = require('utf8');

exports.brandnewupdatevehical = (updatevehical) =>{
return new Promise((resolve, reject) => {
   

  // const brandnewupdatevehical = ({
  //     updatevehical
  //    // rapid_doc_ID: rapid_doc_ID
  //   // docinfo: docinfo
  // })


var object = js2xmlparser.parse("CALCULATEPREMIUMREQUEST", updatevehical)
console.log("object=======================>",object)


request.post({
    url:"https://dtc.royalsundaram.net/DTCWS/Services/Product/TwoWheeler/UpdateVehicleDetails ",
    port: 9000,
    method:"POST",
    headers:{
        'Content-Type': 'application/xml',
    },
     body: object
},

function(error, response, body){
   
  //  console.log("status",response.StatusCode);
    console.log("body",body);
    console.log(error);
    //console.log(xml2jsparser.parse("CALCULATEPREMIUMREQUEST", body))
    var json = parser.toJson(body);
    var json1 = JSON.parse(json)
    console.log("to json -> %s", JSON.stringify(json1.PREMIUMDETAILS.DATA.CGST));
//console.log("to json -> %s", json);
return  resolve({
    status: 201,
    message:"Success",
    Response:json 
})
}



);
})
}