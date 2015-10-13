app.controller('player_controller',function($scope,$http){
	$scope.song_list=[];
<<<<<<< HEAD
	$http.get('song_list.json').then(function(res){
		console.log(res);
=======
	$http.get('song-list.json').then(function(res){
>>>>>>> 453add3f310eca31986aaa31ea6836984877d8ea
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
		console.log(data);
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
	//import json array here ^^^^
	var path="images/";
	$scope.present_image=path+"music.PNG";
	$scope.changeSong = function(data){
		console.log(playlist+" ");
		$scope.present_song=data.title;
		$scope.present_artist=data.artist;
		// $scope.present_image
	};
});