var express = require('express');
var app = express();
var axios = require('axios');
const request = require('superagent');

app.use(express.json());

app.get('/', function(req, res) {
	res.send('hi');
})

/*const credentials = {
  client: {
    id: '',
    secret: '<client-secret>'
  },
  auth: {
    tokenHost: 'https://api.oauth.com'
  }
};

const oauth2 = require('simple-oauth2').create(credentials);*/

var server = app.listen(3002, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});

app.get('/oauth', function(req, res) {
  axios({
		method:'get',
		url:`https://github.com/login/oauth/authorize?clientId=73027a965065212c02ac`
	}).then((response) => {
		console.log('sending...');
		res.send('oops');
	})
});

app.get('/callback', function(req, res, next) {
	console.log('redirected sucessfully!');
	
	const { query } = req;

	const { code } = query;

	console.log('code is ..... ' + code);

	token = '';
	request
	.post('https://github.com/login/oauth/access_token')
	.send({
		client_id: '73027a965065212c02ac',
		client_secret: '3d3b581788e225f4e6bd9fe96bfe0d322c3a79c1',
		code: code
	})
	.set('Accept', 'application/json')
	.then((res) => {
		console.log('access_token is ' + JSON.stringify(res.body.access_token));
		token = res.body.access_token;
	})

	res.cookie('auth', token);
	res.send('successss!!');


});