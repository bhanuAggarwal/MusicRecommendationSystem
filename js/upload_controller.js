app.controller('upload_controller',function($scope,mainservice){
	$scope.enable = function(){
		if($scope.name!=""&&$scope.name!=undefined&&
			$scope.category!=""&&$scope.category!=undefined&&
			$scope.tags!=""&&$scope.tags!=undefined&&
			$scope.artist!=""&&$scope.artist!=undefined&&
			$scope.rating!=""&&$scope.rating!=undefined&&
			$scope.location!=""&&$scope.location!=undefined)
				return false;
		return true;
	};
	$scope.submit = function(){
		var data={
			name:$scope.name,
			category:$scope.category,
			tags:$scope.tags,
			artist:$scope.artist,
			rating:$scope.rating,
			location:$scope.location
		};
		mainservice.send(data);
	};
});