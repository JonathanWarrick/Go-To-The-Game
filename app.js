angular.module('testApp', [
	'ui.router'
])
.controller('TestController', function($scope, $http) {
	$scope.data = {
		labels: [],
		series: []
	};

	$scope.testTeamData = [
		{
			name: "New York Giants",
			query: "new-york-giants"
		},
		{
			name: "New York Jets",
			query: "new-york-jets"
		}
	];

	$scope.getTeamInfo = function() {
		console.log('test', $scope.teamName);
		var formattedString = 'http://api.seatgeek.com/2/events?performers.slug=' + $scope.selectedTeam.query;
		$http.get(formattedString)
		.success(function(data) {
			console.log('got team data:', data);

			// average ticket price
			var temp_avg_price = [];

			data.events.forEach(function(event) {
				temp_avg_price.push(event.stats.average_price);
				$scope.data.labels.push(event.title);
			});

			$scope.data.series.push(temp_avg_price);

			Chartist.Line('.ct-chart', $scope.data);
		})
		.error(function(data) {
			console.error('got an error sad', error);
		});
	};
});
