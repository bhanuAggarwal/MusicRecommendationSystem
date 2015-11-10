app.service('mainservice',function($http,$q){
	var route='http://192.168.0.5:8080/myMusic-services';
	this.send = function(dat){
		// $http.post('localhost:8080',dat,{'Content-Type':'application/json'});
		$http.post(route+'/song/upload',dat,{'Content-Type':'application/json'}).then(function(){
			console.log('success');
		},function(){
			console.log('fail');
		});
	};
	this.login = function(data){
		/*var pr=$q.defer();
		pr.promise=null;
		$http.post(route+'/login',data,{'Content-Type':'application/json'}).then(function(res){
			pr.resolve(res);
		},function(res){
			pr.resolve(res);
		});
		return pr.promise;*/
	};
});