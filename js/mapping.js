app.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/player',{
		templateUrl:'templates/player.html',
		controller:'player_controller'
	})
	.when('/upload',{
		templateUrl: 'templates/upload.html',
		controller:'upload_controller'
	})
	.when('/evaluate',{
		templateUrl: 'templates/evaluate.html',
		controller:'evaluate_controller'
	})
	.when('/login',{
		templateUrl: 'templates/login.html',
		controller:'login_controller'
	});
}]);