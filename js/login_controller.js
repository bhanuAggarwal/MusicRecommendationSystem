app.controller('login_controller',function($scope,mainservice){
	$scope.inProcess = false;
	$scope.enable = function(){
		if($scope.username!="" && $scope.username!= undefined && $scope.pass!="" && $scope.pass != undefined && $scope.inProcess==false)
		{
			if($scope.pass.length>=6)
			{
				return false;
			}
		}
		return true;
	};
	$scope.process = function(){
		$scope.inProcess=true;
		var data = {
			"username": $scope.username,
			"password": $scope.pass
		};
		 var response = mainservice.login(data);
		// response.promise.then(function(res){
			
		// 		response action
			
		//});
	};
});