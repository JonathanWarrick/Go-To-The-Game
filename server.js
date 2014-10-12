// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var teamDB = require('./team.controller.js');

// establish connection with mongo
mongoose.connect('mongodb://localhost/gotothegame-dev');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/'));

// USE FOR DEPLOYMENT
// app.get('/api/getTeamData', function(request, response) {
// 	// console.log('made it into express');
// 	getNFLData(function(teams) {
// 		console.log(teams);
// 		response.send(200, teams);
// 	});
// });

// USE FOR DEVELOPEMTN
app.get('/api/getTeamData', teamDB.getTeamData);

var port = process.env.PORT || 5555; 		// set our port

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// Get NFL SportsData

var sportsdata_nfl = require('sportsdata').NFL;
var sportsdata_nhl = require('sportsdata').NHL;
var sportsdata_nba = require('sportsdata').NBA;

sportsdata_nfl.init('t', 1, 'djgc4qqvphhks2yxfefrera9', '2014', 'REG');
sportsdata_nhl.init('t', 3, '6xw497kzfsf76sh35wu9sjmc', '2014', 'REG');
sportsdata_nba.init('t', 3, 'tbrzr7gkbedhndkx7kckck2h', '2013', 'REG');

// var getNFLData = function(callback) {
// 	// console.log('getNFLData called in function');
// 	var teams = [];
// 	sportsdata_nfl.getStandings(function(error, data) {		
// 		// console.log('in getStandings');
// 		var standings = data.standings.conference[0].division[0].team[0].overall[0]['$'].wpct;
// 		console.log(standings);
// 		data.standings.conference.forEach(function(conf) {
// 			conf.division.forEach(function(div) {
// 				div.team.forEach(function(tm) {
// 					var team = {
// 						market: tm['$'].market,
// 						teamName: tm['$'].name,
// 						winPct: tm.overall[0]['$'].wpct
// 					};
// 					// console.log('team is', team);
// 					teams.push(team);
// 				});
// 			});
// 		});
// 	callback(teams);
// 	});
// };

// var getNHLData = function() {
// 	// console.log('getNFLData called in function');
// 	var teams = [];
// 	sportsdata_nhl.getStandings(function(error, data) {		
// 		// console.log('in getStandings');
// 		var standings = data.league.season[0].conference[0].division[0].team[0];
// 		console.log(standings);
// 		data.league.season[0].conference.forEach(function(conf) {
// 			conf.division.forEach(function(div) {
// 				div.team.forEach(function(tm) {
// 					var team = {
// 						market: tm['$'].market,
// 						teamName: tm['$'].name,
// 						winPct: tm['$'].win_pct
// 					};
// 					console.log('team is', team);
// 					teams.push(team);
// 				});
// 			});
// 		});
// 	});
// };

// getNHLData();

var getNBAData = function() {
	// console.log('getNFLData called in function');
	var teams = [];
	sportsdata_nba.getStandings(function(error, data) {		
		// console.log('in getStandings');
		var standings = data.league.season[0].conference[0].division[0].team[0];
		console.log(standings);
		// data.league.season[0].conference.forEach(function(conf) {
		// 	conf.division.forEach(function(div) {
		// 		div.team.forEach(function(tm) {
		// 			var team = {
		// 				market: tm['$'].market,
		// 				teamName: tm['$'].name,
		// 				winPct: tm['$'].win_pct
		// 			};
		// 			console.log('team is', team);
		// 			teams.push(team);
		// 		});
		// 	});
		// });
	});
};

getNBAData();



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
