var Team = require('./team.model.js');

exports.saveNewTeam = function(teamInfo) {
	console.log('save new team called with teaminfo', teamInfo);
	var newTeam = new Team(teamInfo);
	newTeam.save(function(err, team) {
		if (err) {
			console.error('received an error', error);
		} else {
			console.log('team successfully saved', team);
		}
	});
};

exports.getTeamData = function(request, response) {
	console.log('made it into getTeamData on DB handler side');
	Team.find(function(err, teams) {
		if (err) {
			response.send(500);
		} else {
			return response.json(200, teams);
		}
	});
};
