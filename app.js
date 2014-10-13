angular.module('testApp', [
	'ui.router',
	'ui.bootstrap'
])
.controller('TestController', function($scope, $http) {
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
	  	console.log('teamData is', teamData);
	  	for (var team in teamData) {
	  		var teamName = teamData[team].market + ' ' + teamData[team].teamName;
	  		$scope.winLossData[teamName] = teamData[team].winPct;
	  		$scope.teamList.push(teamName);
	  	}
	  	console.log('teamList is', $scope.teamList);
	  	console.log('winLossData is', $scope.winLossData);
	  });

	$scope.getTeamInfo = function() {
		$scope.data.labels = [];
		$scope.data.series = [];
		var formattedString = 'http://api.seatgeek.com/2/events?performers[home_team].slug=' + $scope.selectedTeam.toLowerCase().replace('.', '').split(' ').join('-');
		$http.get(formattedString)
		.success(function(data) {
			console.log('got team data:', data);

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
				var teamWinPct = $scope.winLossData[$scope.selectedTeam];
				console.log('teamWin', teamWinPct);
				var oppWinPct = +$scope.winLossData[opponent];
				console.log('oppWinPct', oppWinPct)
				var weightedWinPct = (+teamWinPct + oppWinPct) / 2;
				console.log('weightedWinPct', weightedWinPct);
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
}).controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      backdrop: false,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}).controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
