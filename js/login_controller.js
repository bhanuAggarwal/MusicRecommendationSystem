app.controller('login_controller',function($scope,mainservice,$location,$mdToast){
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
			if(res.data.id==1)
			{
				$mdToast.show($mdToast.simple().content('Logged In!!').position('top right'));
				$location.path('/player');
			}

			else if(res.data.id==-1){
				$mdToast.show($mdToast.simple().content('Wrong username or password').position('top right'));
				$scope.inProcess=false;
			}
			else{
				$mdToast.show($mdToast.simple().content('Wrong username or password').position('top right'));
				$scope.inProcess=false;
			}
		});
	};
	$scope.senable = function(){
		if($scope.susername!="" && $scope.susername!= undefined && $scope.sid!="" && $scope.sid!= undefined && $scope.spass!="" && $scope.spass != undefined && $scope.inProcess==false)
		{
			if($scope.spass.length>=6 && $scope.spass==$scope.sre_pass)
			{
				return false;
			}
		}
		return true;
	};
	$scope.s_process = function(){
		$scope.inProcess=true;
		var data = {
			"name": $scope.susername,
			"email": $scope.sid,
			"password": $scope.spass
		};
		var response = mainservice.signup(data);
		response.then(function(res){
			console.log(res.data.id);
			if(res.data.id>0)
			{
				$mdToast.show($mdToast.simple().content('Account created!! Welcome!!').position('top right'));
				$location.path('/evaluate');
			}
			else{
				$mdToast.show($mdToast.simple().content('Error Occured').position('top right'));
				$scope.inProcess=false;
			}
		});
	};
});