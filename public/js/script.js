angular.module('personal',['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/views/home.html',
            controller : ''
        })
        .when('/blog', {
            templateUrl : '/views/blog.html',
            controller : 'BlogCtrl'
        });
})
.controller('MainCtrl', function ($scope) {
	$scope.heading = "Hey, Gene Lim here";
})
.controller('NavCtrl', function ($scope) {
	$(".hamburger").click(function () {
        $('.sub-menu').toggle( "fast" );
    });
})
.controller('BlogCtrl', function($scope, $http){
	$http.get('/blog')
	.success(function(data) {
		$scope.posts = data;
	});

});