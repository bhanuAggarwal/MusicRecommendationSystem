app.controller('player_controller',function($scope,$http,mainservice,$rootScope){
	$scope.song_list=[];
	var promise=mainservice.preparePlayer();
	promise.then(function(res){
		$scope.song_list=res.data;
		$scope.song_list_recommended=$scope.song_list;
		$scope.song_list_current=$scope.song_list;
		$scope.song_list_trending=$scope.song_list;
		console.log($scope.song_list);
	});
	$scope.$on('changedIndex',function(obj,data){
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
	$scope.isPlaying=false;
	//import json array here ^^^^
	var path="images/";
	$scope.present_image=path+"music.PNG";
	$scope.changeSong = function(data){
		console.log(playlist+" ");
		$scope.present_song=data.title;
		$scope.present_artist=data.artist;
		// $scope.present_image
	};
	$scope.playSong = function(song_data){
		mainservice.playTrack(song_data);
	};
});