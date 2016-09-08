var request = require('request');
require('dotenv').config();

var input_url = 'http://challenge.code2040.org/api/reverse'

request.post({url: input_url, form: {token: process.env.TOKEN}}, function (err, res, body) {
	if(err){
		console.log(err);
	}
    if (!err && res.statusCode == 200) {
        console.log(body);
    }    
});

