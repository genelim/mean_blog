angular.module('personal',['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/views/home.html',
            controller : 'HomeCtrl'
        })
        .when('/blog', {
            templateUrl : '/views/blog.html',
            controller : 'BlogCtrl'
        })
        .when('/work', {
            templateUrl : '/views/work.html',
            controller : 'BlogCtrl'
        })
        .when('/article/:id', {
            templateUrl : '/views/article.html',
            controller : 'ArticleCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
})
.controller('HomeCtrl', function ($scope,$http) {
	$scope.heading = "Hey, Gene Lim here";
    
    $scope.contact = function(contacts){
        if(contacts == undefined){
            $('.message').html('Please fill in the required!');
            $('.message').addClass('alert alert-danger');
            $('.message').show();
        }else if(!contacts.hasOwnProperty('names') || contacts.names == ''){
            $('.message').addClass('alert alert-danger');
            $('.message').html('Invalid Name!');
            $('.message').show();
        }else if(!contacts.hasOwnProperty('email') || contacts.email == ''){
            $('.message').addClass('alert alert-danger');
            $('.message').html('Invalid Email!');
            $('.message').show();
        }else if(!contacts.hasOwnProperty('message') || contacts.message == ''){
            $('.message').addClass('alert alert-danger');
            $('.message').html('Invalid Message!');
            $('.message').show();
        }else{
            $http.post('/contact',contacts)
            .success(function(data){
                $('.message').addClass('alert alert-success');
                $('.message').html('You message has be sent!');
                $('.message').show();
            });
        }
        setTimeout(function() {
            $(".message").hide();
        }, 2000);
    };

    $scope.skills_advance = [{  type:'HTML5'},{type:'CSS3'},{type:'JAVASCRIPT'},{type:'JQUERY'},{type:'ANGULARJS'},{
                                type:'NODEJS'},{type:'MONGODB'},{type:'EXPRESS'},{type:'GITHUB'},{type:'PHOTOSHOP'},{
                                type:'LIGHTROOM'},{type:'IONIC'}]

     $scope.skills_experienced = [{   type:'WORDPRESS'},{type:'AJAX'},{type:'Csharp'},{type:'C',type:'CLI'},{type:'PHP'},{
                                    type:'RAILS'},{type:'RUBY'},{type:'TORTOISE_SVN'},{type:'WORDPRESS'}];


})
.controller('NavCtrl', function ($scope) {
	$(".hamburger").click(function () {
        $('.sub-menu').toggle( "fast" );
    });
    $(".sub-menu ul li a").click(function () {
        $('.sub-menu').toggle( "fast" );
    });
})
.controller('BlogCtrl', function($scope, $http){
	$http.get('/blog')
	.success(function(data) {
		$scope.posts = data;
	});
})
.controller('ArticleCtrl', function($scope, $http, $routeParams, $sce){
    $http.get('/article/'+$routeParams.id)
    .success(function(response){
        $scope.article = response;
        console.log($scope.article);
    });
    $scope.renderHtml = function(html_code)
    {
        return $sce.trustAsHtml(html_code);
    };
});