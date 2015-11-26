app.controller('evaluate_controller',function($http,$location,$scope,mainservice,$rootScope){
	/*music controller*/
	$scope.song_list=[];
	$scope.ratings=[];
	$scope.redirect_to_player=false;
	var current_index;
	var promise=mainservice.preparePlayerEvaluate();
	promise.then(function(res){
		angular.forEach(res.data,function(track,index){ 
			track.sid=track.id;
			track.id=index+1+"";
			track.image='images/music'+((index+1)%3+1)+'.png';
		});
		$scope.song_list=res.data;
	});
	$scope.$on('changedIndex',function(obj,data){
		if(data.mindex==$scope.song_list.length)
		{
			$scope.redirect_to_player=true;
		}
		if(data.type==1)
		{
			current_index=data.mindex;
			$scope.present_image=$scope.song_list[data.mindex].image;
			$scope.current_track_name = $scope.song_list[data.mindex].name;
			$scope.current_track_artist = $scope.song_list[data.mindex].artist;
		}
		else{
			angular.forEach($scope.song_list, function(elem, key){
				if(data.mindex==elem.id)
				{
					current_index=key;
					$scope.present_image=$scope.song_list[key].image;
					$scope.current_track_name = $scope.song_list[key].name;
					$scope.current_track_artist = $scope.song_list[key].artist;
				}
			});
		}
	});
	//////////////////////////
	$scope.$watch('redirect_to_player', function(oldval,newval) {
		if(oldval!=newval){ 
			mainservice.postRating($scope.ratings);
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
		var tempObject = {"category":$scope.song_list[current_index].category,
						  "id":$scope.song_list[current_index].sid,
						  "rating":rating};
		$scope.ratings.push(tempObject);
		//var promise = mainservice.postRating(rating);
	};
});