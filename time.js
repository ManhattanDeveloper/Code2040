var request = require('request');
require('dotenv').config();


//Links were provided by Code2040. 
//input_url provides an array and string
var input_url  = 'http://challenge.code2040.org/api/dating';
var output_url = 'http://challenge.code2040.org/api/dating/validate';

//Recieves the array and string via POST request.
request.post({url: input_url, form: {token: process.env.TOKEN}}, function (err, res, body) {
	if(err){
		console.log(err);
	}
	
    if (!err && res.statusCode == 200) {

        // Parsing input data
    	var input_time = JSON.parse(body)['datestamp'];
    	var interval   = JSON.parse(body)['interval'];

        //Converts the input into a date element and adds the interval
        var time = new Date(input_time);
        time.setSeconds(parseInt(time.getSeconds()) + parseInt(interval));
        var ISO_time = time.toISOString(); 

        //This is done to remove unnessary precision in seconds.
        var ans = ISO_time.substring(0,19) + ISO_time.substring(ISO_time.length-1);

        

        var dict = {
            token: process.env.TOKEN,
            datestamp: ans
        }
        
        request.post({url: output_url, form: dict}, 
        function (err, res, body) {
            if(err){
                console.log(err);
            }
            if (!err && res.statusCode == 200) {
                console.log(body);
            }    
    });
    
    	
    }    
});