app.service('mainservice',function($http,$q,$rootScope){
	var playlist;
	var route='http://192.168.0.5:8080/myMusic-services';
	this.send = function(dat){
		// $http.post('localhost:8080',dat,{'Content-Type':'application/json'});
		$http.post(route+'/song/upload',dat,{'Content-Type':'application/json'}).then(function(){
			console.log('success');
		},function(){
			console.log('fail');
		});
	};
	this.login = function(login_data){
		var pr=$q.defer();
		pr.promise=null;
		$http({method:'POST',
			   dataType:'json',
			   headers: { 'Content-Type': 'application/json'},
			   data: "{'email':'pawanknitkkr@gmail.com','password':'fireheart'}",
			   url: route+'/user'
			}).then(function(res){
			pr.resolve(res.data);
			console.log(res);
		},function(res){
			console.log('error');
		});
		return pr.promise;
	};
	this.postRating = function(data){
		/*var pr=$q.defer();
		pr.promise=null;
		$http.post(route+'/login',data,{'Content-Type':'application/json'}).then(function(res){
			pr.resolve(res);
		},function(res){
			pr.resolve(res);
		});
		return pr.promise;*/
	};
	this.preparePlayer = function(){
		var pr=$q.defer();
		$http.get('song-list.json').then(function(res){
			angular.forEach(res.data,function(track){ 
				playlist=res.data;
				soundManager.createSound({
	                id: track.id,
	                url: track.url
	            });
			pr.resolve(res);
		});
		},function(){
			console.log("fail");
		});
		return pr.promise;
	};
	this.getPlaylist = function(){
		return playlist;
	};
	this.playTrack = function(song_data){
		$rootScope.$broadcast('playSong',song_data);
	};
});