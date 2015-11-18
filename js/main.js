var app = angular.module('app', ['ngRoute','ngAnimate','ngAria','ngMaterial','angularSoundManager']);
app.filter('searchString',function(){
	return function(arr,string){
		if(!string)
			return arr;
		var res = [];
		console.log(arr);
		var searchQuery = string.toLowerCase();
		angular.forEach(arr,function(elem){	
			if(elem.title.toLowerCase().indexOf(searchQuery)!==-1)
			 	res.push(elem);
		});
		return res;
	};
});
app.controller('controls', function($scope,$location) {
	$scope.redirectPlayer = function(){
		$location.path('/player');
	}
	$scope.showSearch=false;
	$scope.searchToggle = function(){
		$scope.showSearch=!$scope.showSearch;
	}
});