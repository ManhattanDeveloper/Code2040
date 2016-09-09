//Pulls in required npm packages.
var request = require('request');
require('dotenv').config();

//Links were provided by Code2040. 
//input_url provides an array and string
var input_url  = 'http://challenge.code2040.org/api/haystack'
var output_url = 'http://challenge.code2040.org/api/haystack/validate'

//Recieves the array and string via POST request.
request.post({url: input_url, form: {token: process.env.TOKEN}}, function (err, res, body) {
	if(err){
		console.log(err);
	}
	
    if (!err && res.statusCode == 200) {

    	//Converts the incoming string into a JSON element.
    	result = JSON.parse(body)

    	//Searches the haystack array for the needle element
        var index = result['haystack'].indexOf(result['needle']);

        //Returns the index of the needle to the server.
        request.post({url: output_url, form: {token: process.env.TOKEN, needle: index}}, 
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


