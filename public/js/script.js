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
.controller('BlogCtrl', function($scope){
	$scope.posts = [{title:'Hello',date:'June 12,2015',border_color:'#2C3E50'},{title:'Mean',date:'August 02,2015',border_color:'#3498DB'},{title:'Bug',date:'August 27,2015',border_color:'#E74C3C'}];
});