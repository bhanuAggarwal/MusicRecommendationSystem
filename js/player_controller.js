app.controller('player_controller',function($scope,$http,mainservice,$rootScope){
	$scope.song_list=[];
	var arr=mainservice.preparePlayerMain();
	arr[0].then(function(res){
		angular.forEach(res.data,function(track,index){ 
			track.sid=track.id;
			track.id=index+1+"";
			track.image='images/music'+(parseInt(Math.random()*10)%3+1)+'.png';
		});
		$scope.song_list_trending=res.data;
	});
	arr[1].then(function(res){
		$scope.song_list_recommended=res.data;
		angular.forEach(res.data,function(track,index){ 
			track.sid=track.id;
			track.id=index+1+"";
			track.image='images/music'+(parseInt(Math.random()*10)%3+1)+'.png';
		});
	});
	arr[2].then(function(res){
		console.log(res.data);
		angular.forEach(res.data,function(track,index){ 
			track.sid=track.id;
			track.id=index+1+"";
			track.image='images/music'+(parseInt(Math.random()*10)%3+1)+'.png';
			soundManager.createSound({
                id: track.id,
                url: track.location
            });
		});
		$scope.song_list=res.data;
		$scope.song_list_current=res.data;
		// $rootScope.$broadcast('playSong',{id:0});
	});
	$scope.$on('changedIndex',function(obj,data){
		if(data.type==1)
		{
			$scope.current_track_name = $scope.song_list[data.mindex].name;
			$scope.current_track_artist = $scope.song_list[data.mindex].artist;
		}
		else{
			angular.forEach($scope.song_list, function(elem, key){
				if(data.mindex==elem.id)
				{
					$scope.current_track_name = $scope.song_list[key].name;
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
		var promise=mainservice.playTrack(song_data,$scope.progress/20);
		promise.then(function(res){
			angular.forEach(res.data,function(track,index){ 
			track.sid=track.id;
			track.id=index+1+"";
			track.image='images/music'+(parseInt(Math.random()*10)%3+1)+'.png';
			soundManager.createSound({
                id: track.id,
                url: track.location
            });
			});
			$scope.song_list=res.data;
			$scope.song_list_current=res.data;
		})
	};
});