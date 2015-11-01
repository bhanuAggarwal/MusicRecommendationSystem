app.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/player',{
		templateUrl:'templates/player.html',
		controller:'player_controller'
	})
	.when('/upload',{
		templateUrl: 'templates/upload.html',
		controller:'upload_controller'
	});
}]);