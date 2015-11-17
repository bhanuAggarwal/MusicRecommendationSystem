app.controller('evaluate_controller',function($http,$location,$scope,mainservice,$rootScope){
	/*music controller*/
	$scope.song_list=[];
	$scope.redirect_to_player=false;
	var promise=mainservice.preparePlayer();
	promise.then(function(res){
		$scope.song_list=res.data;
		console.log(res.data);
	});
	$scope.$on('changedIndex',function(obj,data){
		if(data.mindex==$scope.song_list.length)
		{
			$scope.redirect_to_player=true;
		}
		if(data.type==1)
		{
			$scope.present_image=$scope.song_list[data.mindex].image;
			$scope.current_track_name = $scope.song_list[data.mindex].title;
			$scope.current_track_artist = $scope.song_list[data.mindex].artist;
		}
		else{
			angular.forEach($scope.song_list, function(elem, key){
				if(data.mindex==elem.id)
				{
					$scope.present_image=$scope.song_list[key].image;
					$scope.current_track_name = $scope.song_list[key].title;
					$scope.current_track_artist = $scope.song_list[key].artist;
				}
			});
		}
	});
	//////////////////////////
	$scope.$watch('redirect_to_player', function(oldval,newval) {
		if(oldval!=newval){ 
			$rootScope.$broadcast('redirecting');
			$location.url('/player');
		}

	});
	var path="images/";
	$scope.next=false;
	$scope.track_played=false;
	var rating=0;
	$scope.rating_active=false;
	$scope.selected = function(t_rating){
		$scope.next=true;
		rating=t_rating;
	};
	$scope.repeat = function()
	{
		$scope.progress=0;
	}
	$scope.rated =  function(){
		$scope.next=false;
		$rootScope.$broadcast('rated');
		var promise = mainservice.postRating(rating);
	};
});