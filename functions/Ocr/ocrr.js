//Load the request module
var request = require('request');
var trim = require('trim');
var tempstr = "";
var str = "";
//Lets configure and request
var options = {

    url: 'https://api.projectoxford.ai/vision/v1.0/ocr?', //URL to hit
    qs: {
        "language": "unk",
        "detectOrientation ": "true"
    }, //Query string data

    method: 'POST', //Specify the method

    headers: { //We can define headers too
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '5f99789bf19f45e2b6c19b6264d3ecf9'
    },

    body: "{'url':'https://kuverabucket.s3.amazonaws.com/px1vrb27nbocx1bgetedk4dffkcf1tuh9oumhb510xtgfvtph_NeelabhSanyalPan%20Card%20Copy.jpg'}",
};

function callback(error, response, body) {
    if (error) {
        console.log(error);
    } else {
        var jsonObj = JSON.parse(body);
    
        var ob = jsonObj;
        console.log("ob",ob)
        for (i = 0; i < ob.regions.length; i++) {
            for (j = 0; j < ob.regions[i].lines.length; j++) {
                for (k = 0; k < ob.regions[i].lines[j].words.length; k++) {
                    str = str + " " + ob.regions[i].lines[j].words[k].text;
                }
                str = str + "\n";
            }
        }
        console.log(str);
        console.log(str.indexOf("OF BIRTH"));
        var arr = str.split("\n");
        console.log(arr);
        console.log(arr.indexOf("OF BIRTH"));
        for (i = 0; i < arr.length; i++) {
            arr[i] = trim(arr[i]);
        }
        for (i = 0; i < arr.length; i++) {
            if (arr[i].indexOf("NUMBER") > -1) {
                console.log("NUMBER is : ");
                console.log(arr[i + 1]);
            } else if (arr[i].indexOf("FATHER") > -1) {
                console.log("Father's Name is : ");
                console.log(arr[i + 1]);
                if (arr[i + 2].indexOf("BIRTH") === -1) {
                    console.log(arr[i+2]);
                }
            } else if (arr[i].indexOf("NAME") > -1) {
                console.log("NAME is : ");
                console.log(arr[i + 1]);
                if (arr[i + 2].indexOf("FATHER") === -1) {
                    console.log(arr[i+2]);
                }
            } else if (arr[i].indexOf("BIRTH") > -1) {
                console.log("Birth is : ");
                console.log(arr[i + 1]);
            }
        }
        /*
        if(arr.length==11){
            console.log("Name:"+ arr[1]+" "+ arr[2]);
            console.log("Father's name:"+arr[3]+" "+arr[4]);
            console.log("Date of birth:"+arr[5]);
            console.log("PAN:" + arr[7]);
        }

        else if(arr.length==9){
            console.log("Name:"+ arr[1]);
            console.log("Father's name:"+arr[2]);
            console.log("Date of birth:"+arr[3]);
            console.log("PAN:" + arr[5]);
        }
        else if(arr.length==10){
            if(arr[1].length>arr[2].length){
                console.log("Name:"+ arr[1]+" "+arr[2]);
                console.log("Father's name:"+arr[3]);
            }
            else{
                console.log("Name:"+ arr[1]);
                console.log("Father's name:"+arr[2]+" "+arr[3]);
            }
            console.log("Date of birth:"+arr[4]);
            console.log("PAN:" + arr[6]);
        }
        else{
            console.log("Image not of proper quality!");
            console.log("Name:"+ arr[1]);
            console.log("Father's name:"+arr[2]);
            console.log("Date of birth:"+arr[3]);
            console.log("PAN:" + arr[5]);
        }*/

    }
};
request(options, callback);