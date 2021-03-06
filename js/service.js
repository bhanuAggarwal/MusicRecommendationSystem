app.service('mainservice',function($http,$q,$rootScope){
	var playlist;
	var route='http://localhost:8080/myMusic-services';
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
		$http({method:'POST',
			   dataType:'json',
			   headers: { 'Content-Type': 'application/json'},
			   data: JSON.stringify(login_data),
			   url: route+'/user'
			}).then(function(res){
			pr.resolve(res);
		},function(res){
			console.log('error');
		});
		return pr.promise;
	};
	this.signup = function(login_data){
		var pr=$q.defer();
		$http({method:'POST',
			   dataType:'json',
			   headers: { 'Content-Type': 'application/json'},
			   data: JSON.stringify(login_data),
			   url: route+'/user'
			}).then(function(res){
			pr.resolve(res);
		},function(res){
			console.log('error');
		});
		return pr.promise;
	};
	this.postRating = function(data){
		var pr=$q.defer();
		$http.post(route+'/user/1/taste',data,{'Content-Type':'application/json'}).then(function(res){
			pr.resolve(res);
		},function(res){
			pr.resolve(res);
		});
		return pr.promise;
	};
	this.preparePlayerEvaluate = function(data){
		var pr=$q.defer();
		$http.get(route+'/song/sample',data).then(function(res){
			angular.forEach(res.data,function(track,index){ 
				track.sid=track.id;
				track.id=index+1+"";
				track.image='images/listTemp10'+((index+1)%18+1)+'.jpeg';
				soundManager.createSound({
	                id: track.id,
	                url: track.location
	            });
			});
			pr.resolve(res);
		},function(){
			console.log("fail");
		});
		return pr.promise;
	};
	this.preparePlayerMain = function(){
		var arr=[];
		var user_id={
			"userId":1
		};
		var trending_pr=$q.defer();
		var recommended_pr=$q.defer();
		var playing_pr=$q.defer();
		$http.get(route+'/song/popular',{'Content-Type':'application/json'}).then(function(res){
			trending_pr.resolve(res);
		},function(res){
		});
		$http.get(route+'/song/recommendedForUser?userId=1',{'Content-Type':'application/json'}).then(function(res){
			recommended_pr.resolve(res);
		},function(res){
		});
		$http.get(route+'/song/nextRecommended?userId=1',{'Content-Type':'application/json'}).then(function(res){
			playing_pr.resolve(res);
			console.log(res);
		},function(res){
		});
		arr.push(trending_pr.promise);
		arr.push(recommended_pr.promise);
		arr.push(playing_pr.promise);
		return arr;
	};
	this.getPlaylist = function(){
		return playlist;
	};
	this.playTrack = function(song_data,progress,current_sid){
		//$rootScope.$broadcast('playSong',song_data);
		console.log(current_sid);
		var promise=$q.defer();
		var obj={
			"userId":1,
			"session":current_sid,
			"rating":progress?progress:0
		};
		$http.post(route+'/user/session',obj,{'Content-Type':'application/json'}).then(function(res){
			if(res.data.id==1)
			{
				$http.get(route+'/song/nextRecommended?userId=1&songId='+song_data.sid,{'Content-Type':'application/json'}).then(function(res){
					promise.resolve(res);
				},function(res){
				});
			}
		},function(res){
		});
		return promise.promise;
	};
});
