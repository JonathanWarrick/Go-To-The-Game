angular.module('testApp', [
	'ui.router'
])
.controller('TestController', function($scope, $http, TeamData) {
	$scope.data = {
		labels: [],
		series: []
	};

	$scope.teamData = TeamData.teamData;

	console.log($scope.teamData);

	$scope.getTeamInfo = function() {
		$scope.data.labels = [];
		$scope.data.series = [];
		var formattedString = 'http://api.seatgeek.com/2/events?performers[home_team].slug=' + $scope.selectedTeam.name.toLowerCase().split(' ').join('-');
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
		{ name: "St Louis Rams"},
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
