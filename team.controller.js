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
