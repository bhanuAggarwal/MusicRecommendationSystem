app.directive('starRating',function() {
return {
restrict : 'A',
template :  '<div class="rating full-width padding-0 margin-0" layout="row" layout-align="space-around center">'+ 
            '<span ng-repeat="star in stars" class="star" ng-class="{starfill: star.filled, init: active==false }" ng-click="toggle($index)">' +
            '<i class="fa fa-star"></i>' +
            ' </span>' +
            '</div>',
scope : {
 ratingValue : '=',
 max : '=',
 onRatingSelected : '&',
 active: '='
},
link : function(scope, elem, attrs) {
 var updateStars = function() {
  scope.stars = [];
  for ( var i = 0; i < scope.max; i++) {
   scope.stars.push({
    filled : i < scope.ratingValue
   });
  }
 };
 
 scope.toggle = function(index) {
  scope.active=true;
  scope.ratingValue = index + 1;
  scope.onRatingSelected({
   rating : index + 1
  });
 };
 
 scope.$watch('ratingValue',
  function(oldVal, newVal) {
   if (newVal) {
    updateStars();
   }
  }
 );
}
};
}
);
