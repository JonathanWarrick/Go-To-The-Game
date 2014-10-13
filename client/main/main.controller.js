angular.module('goToTheGameApp')
.controller('GoToTheGameController', function($scope, $http) {
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
	  		$scope.teamList.push(teamName);
	  	}
	  });

	$scope.getTeamInfo = function() {
		$scope.data.labels = [];
		$scope.data.series = [];
		var formattedString = 'http://api.seatgeek.com/2/events?performers[home_team].slug=' + $scope.selectedTeam.toLowerCase().replace('.', '').split(' ').join('-');
		$http.get(formattedString)
		.success(function(data) {

			// average ticket price
			var temp_avg_price = [];
			var temp_price_by_pct = [];

			data.events.forEach(function(event) {
				temp_avg_price.push(event.stats.average_price);
				var opponent;
				event.performers.forEach(function(performer) {
					if (!performer.home_team) {
						opponent = performer.name.trim();
					}
				});
				$scope.data.labels.push(opponent);
				var oppWinPct = +$scope.winLossData[opponent];
				temp_price_by_pct.push(oppWinPct * event.stats.average_price);
			});

			$scope.data.series.push(temp_avg_price);
			$scope.data.series.push(temp_price_by_pct);

			Chartist.Line('.ct-chart', $scope.data);
			$scope.showLegend = true;
		})
		.error(function(data) {
			console.error('got an error sad', error);
		});
	};
});
