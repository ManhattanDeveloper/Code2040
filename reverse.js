//Pulls in required npm packages.
var request = require('request');
require('dotenv').config();

//Links were provided by Code2040. 
//input_url provides a string that is to be send to output_url in reverse
var input_url  = 'http://challenge.code2040.org/api/reverse'
var output_url = 'http://challenge.code2040.org/api/reverse/validate'

//Recieves the string via POST request.
request.post({url: input_url, form: {token: process.env.TOKEN}}, function (err, res, body) {
	if(err){
		console.log(err);
	}
	
    if (!err && res.statusCode == 200) {

    	//Flips the string and sends it back to the output URL
        send( flip(body) , output_url);
    }    
});

//Returns flipped version of input text.
//EX: abcd becomes dcba

var flip = function(text){

	var flipped_test =  text.split('').reverse().join('');
	console.log(text + " became " + flipped_test);
	return flipped_test;
}

//Sends given text to give URL via POST request. Automatically includes Code2040 token.
var send = function(text, provided_url){
	request.post({url: provided_url, form: {token: process.env.TOKEN, string: text}}, 
    	function (err, res, body) {
    		if(err){
				console.log(err);
			}
		    if (!err && res.statusCode == 200) {
		        console.log(body);
		    }    
	});
}
