angular.module('testApp', [
	'ui.router'
])
.controller('TestController', function($scope, $http, TeamData) {
	// data that will be used to populate chart
	$scope.data = {
		labels: [],
		series: []
	};

	// upon page load, get list of all teams in array and create object of win/loss
	$scope.winLossData = {};
	$scope.teamList = [];

	$http.get('/api/getTeamData')
	  .success(function(teamData) {
	  	for (var team in teamData) {
	  		var teamName = teamData[team].market + ' ' + teamData[team].teamName;
	  		$scope.winLossData[teamName] = teamData[team].winPct;
	  		teamList.push(teamName);
	  	}
	  	console.log('teamList is', $scope.teamList);
	  	console.log('winLossData is', $scope.winLossData);
	  });

	$scope.winLossData;
	$scope.convertedWinLossData = {};
	
	// console.log teamInfo to see if it works
	$http.get('/api/getTeamData')
	.success(function(teamData) {
		$scope.winLossData = teamData;
		for (var team in $scope.winLossData) {
			// if ($scope.winLossData[team].market === "New England") {
				var teamName = $scope.winLossData[team].market + ' ' + $scope.winLossData[team].teamName;
				$scope.convertedWinLossData[teamName] = $scope.winLossData[team].winPct;
			// }
		}
		console.log($scope.convertedWinLossData);
		testFunction();
	});
	

	
	// for each teamInfo (getTeamInfo)
	var testFunction = function() {
		$scope.winLossData.forEach(function(team) {
			if (team.market === 'New England' || team.market === 'Buffalo') {
				console.log('team going into this loop is ', team);
				// store team name and win percentage
				var teamName = team.market + ' ' + team.teamName;
				var winPct = team.winPct;

				// console.log(teamName, 'teamName after conversion is');
				// call getTeamInfo
				var formattedString = 'http://api.seatgeek.com/2/events?performers[home_team].slug=' + teamName.toLowerCase().replace('.', '').split(' ').join('-');
				console.log(formattedString);
				$http.get(formattedString)
				.success(function(data) {
					console.log('got team data:', data);
					var temp_avg_price = [];
					var temp_labels = [];

					data.events.forEach(function(event) {
						temp_avg_price.push(event.stats.average_price);
						var opponent;
						event.performers.forEach(function(performer) {
							if (!performer.home_team) {
								opponent = performer.name;
								if (opponent === 'St Louis Cardinals') {
									opponent = 'St. Louis Cardinals';
								}
							}
						});
						var opponentWP = $scope.convertedWinLossData[opponent];
						$scope.data2.labels.push((winPct + opponentWP) / 2);
					});
					$scope.data2.series.push(temp_avg_price);
					// $scope.data2.labels.concat(temp_labels);
				});
			}
		});
		setTimeout(function() {
			console.log($scope.data2);
			Chartist.Line('.ct-chart', $scope.data2, {showLine: false});
		}, 1000);
	};





	$scope.teamData = TeamData.teamData;

	console.log($scope.teamData);

	$scope.getTeamInfo = function() {
		$scope.data.labels = [];
		$scope.data.series = [];
		var formattedString = 'http://api.seatgeek.com/2/events?performers[home_team].slug=' + $scope.selectedTeam.name.toLowerCase().replace('.', '').split(' ').join('-');
		$http.get(formattedString)
		.success(function(data) {
			console.log('got team data:', data);

			// average ticket price
			var temp_avg_price = [];

			data.events.forEach(function(event) {
				temp_avg_price.push(event.stats.average_price);
				var opponent;
				event.performers.forEach(function(performer) {
					if (!performer.home_team) {
						opponent = performer.name;
					}
				});
				$scope.data.labels.push(opponent);
			});

			$scope.data.series.push(temp_avg_price);

			Chartist.Line('.ct-chart', $scope.data);
		})
		.error(function(data) {
			console.error('got an error sad', error);
		});
	};
}).
factory('TeamData', function() {
		var teamData = [
		{ name: "New York Giants" },
		{ name: "Philadelphia Eagles"},
		{ name: "Dallas Cowboys"},
		{ name: "Washington Redskins"},
		{ name: "Detroit Lions"},
		{ name: "Green Bay Packers"},
		{ name: "Minnesota Vikings"},
		{ name: "Chicago Bears"},
		{ name: "Carolina Panthers"},
		{ name: "Atlanta Falcons"},
		{ name: "New Orleans Saints"},
		{ name: "Tampa Bay Buccaneers"},
		{ name: "Arizona Cardinals"},
		{ name: "Seattle Seahawks"},
		{ name: "St. Louis Rams"},
		{ name: "San Francisco 49ers"},
		{ name: "Buffalo Bills"},
		{ name: "New England Patriots"},
		{ name: "New York Jets"},
		{ name: "Miami Dolphins"},
		{ name: "Cincinnati Bengals"},
		{ name: "Baltimore Ravens"},
		{ name: "Pittsburgh Steelers"},
		{ name: "Cleveland Browns"},
		{ name: "Houston Texans"},
		{ name: "Indianapolis Colts"},
		{ name: "Jacksonville Jaguars"},
		{ name: "Tennessee Titans"},
		{ name: "San Diego Chargers"},
		{ name: "Denver Broncos"},
		{ name: "Kansas City Chiefs"},
		{ name: "Oakland Raiders"}
	];
	
	return {
		teamData: teamData
	};
});
