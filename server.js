// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var http = require('http');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/'));

var port = process.env.PORT || 5555; 		// set our port

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// http.get('http://api.seatgeek.com/2/events?performers.slug=new-york-giants', function(response) {
// 	console.log(response);
// 	// var test = JSON.parse(response);
// 	// console.log(test);
// });

// var httpOptions = {
// 	host: 'api.seatgeek.com',
// 	path: '/2/events?performers.slug=new-york-giants'
// };

// var buffer = '';

// http.get(httpOptions, function (resp) {
//   resp.on('data', function (chunk) {
//     buffer += chunk;
//   });
//   resp.on('end', function () {
//   	var data = JSON.parse(buffer);
//     var games = [];
//     data.events.forEach(function(game) {
//     	games.push(game);
//     });
//     games.forEach(function(game) {
//     	console.log('highest ticket price is', game.stats.highest_price);
//   	});
//   });
// });