app.controller('login_controller',function($scope,mainservice,$location){
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
			"email": $scope.username,
			"password": $scope.pass
		};
		var response = mainservice.login(data);
		response.then(function(res){
			console.log(res.data.id);
			if(res.data.id==1)
				$location.path('/evaluate');
			else
				$scope.inProcess=false;
		});
	};
});