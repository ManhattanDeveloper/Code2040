//Pulls in required npm packages.
var request = require('request');
require('dotenv').config();

//Links were provided by Code2040. 
//input_url provides an array and string
var input_url  = 'http://challenge.code2040.org/api/prefix'
var output_url = 'http://challenge.code2040.org/api/prefix/validate'

//Recieves the array and string via POST request.
request.post({url: input_url, form: {token: process.env.TOKEN}}, function (err, res, body) {
	if(err){
		console.log(err);
	}
	
    if (!err && res.statusCode == 200) {
    	console.log(body);
    	var result    = JSON.parse(body);
    	var ans_array = prefix(result['prefix'] , result['array']);
    	

    	var dict = {
    		"token": process.env.TOKEN,
    		"array": ans_array
    	}

    	
    	console.log(dict);
		request.post({url: output_url, form: dict}, 
    	function (err, res, body) {
    		console.log(body);
    		if(err){
				console.log(err);
				console.log('Error');
			}
		    if (!err && res.statusCode == 200) {
		        console.log(body);
		        console.log('Sucess');
		    }    
		});
    	
    	
    }    
});

var prefix = function(prefix, array){

    	console.log("Prefix: " + prefix);
    	var ans = [];
    	for (var i = 0; i < array.length; i++){
    		var word = array[i];
    		if(word.length >= prefix.length){
    			if(word.substring(0,prefix.length) != prefix){
    				ans.push(word);
    			}
    		}
    	}
    	return ans;
}