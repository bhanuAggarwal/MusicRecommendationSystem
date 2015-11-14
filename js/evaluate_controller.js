app.controller('evaluate_controller',function($http,$location,$scope,mainservice,$rootScope){
	/*music controller*/
	$scope.song_list=[];
	$scope.redirect_to_player=false;
	$http.get('song_list.json').then(function(res){
		$scope.song_list=res.data;
		$scope.playlist=res.data;
		angular.forEach($scope.playlist,function(track){
			 soundManager.createSound({
                id: track.id,
                url: track.url
            });
		});
	},function(){
		console.log("fail");
	});
	$scope.$on('changedIndex',function(obj,data){
		if(data.mindex==$scope.song_list.length)
		{
			$scope.redirect_to_player=true;
		}
		if(data.type==1)
		{
			$scope.current_track_name = $scope.song_list[data.mindex].title;
			$scope.current_track_artist = $scope.song_list[data.mindex].artist;
		}
		else{
			angular.forEach($scope.song_list, function(elem, key){
				if(data.mindex==elem.id)
				{
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
	soundManager.play(1);
	var path="images/";
	$scope.next=false;
	$scope.track_played=false;
	var rating=0;
	$scope.rating_active=false;
	$scope.present_image=path+"music.PNG";
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
		$scope.rating_active=false;
		var promise = mainservice.postRating(rating);
	};
});