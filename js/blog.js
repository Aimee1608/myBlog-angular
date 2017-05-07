/**
 * Created by Aimee on 2016/12/17.
 */
var app = angular.module('myApp',['ng','ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when('/start',{
        templateUrl:'tpl/start.html',
        controller:'startCtrl'
    }).when('/main',{
        templateUrl:'tpl/main.html',
        controller:'mainCtrl'
    }).when('/music',{
        templateUrl:'tpl/music.html',
        controller:'musicCtrl'
    }).when('/picture',{
        templateUrl:'tpl/picture.html',
        controller:'pictureCtrl'
    }).when('/coding',{
        templateUrl:'tpl/coding.html',
        controller:'codingCtrl'
    }).when('/message',{
        templateUrl:'tpl/message.html',
        controller:'messageCtrl'
    }).otherwise({redirectTo:'/start'})
});
app.run(function($http){
    $http.defaults.headers.post = {'Content-Type':'application/x-www-form-urlencoded'};
});
app.controller('myCtrl',['$scope','$location','$http','$interval','$timeout',function ($scope,$location,$http,$interval,$timeout) {
    $scope.jump = function(arg){
        $location.path(arg);
    };
    $scope.headerToggle = function(){
        $('#caidan').toggleClass('head-slide');
    };
    $scope.headerWho = function(){
         $('#caidan li').removeClass('head-active');
         var tpl = window.location.hash;
         //console.log(tpl);
        $('#caidan li a[href="'+tpl+'"]').parent().addClass('head-active')
    };
    $scope.chooseWho = function(swipeone,n){
        $('#'+swipeone).fadeIn();
        $('#'+swipeone+' .swipebox-slider').css('left',-n*100+'%');
        var totalN = $('#'+swipeone+' .swipebox-slider li').length;
        console.log(totalN);
        if(n===0){
            $('#'+swipeone+' .swipebox-prev').css('opacity',0.3);
            $('#'+swipeone+' .swipebox-next').css('opacity',1);
        }else if(n===totalN-1){
            $('#'+swipeone+' .swipebox-next').css('opacity',0.3);
            $('#'+swipeone+' .swipebox-prev').css('opacity',1);
        }

        $scope.prevSwipebox = function(){
            if(n>0){
                $('#'+swipeone+' .swipebox-slider').css('left',(-n+1)*100+'%').addClass('swipebox-slider-show');
                $('#'+swipeone+' .swipebox-prev').css('opacity',1);
                $('#'+swipeone+' .swipebox-next').css('opacity',1);
                n--;
                if(n==0){
                    $('#'+swipeone+' .swipebox-prev').css('opacity',0.3);
                }
            }
        };
        $scope.nextSwipebox = function(){
            if(n<totalN-1){
                $('#'+swipeone+' .swipebox-slider').css('left',(-n-1)*100+'%').addClass('swipebox-slider-show');
                $('#'+swipeone+' .swipebox-next').css('opacity',1);
                $('#'+swipeone+' .swipebox-prev').css('opacity',1);
                n++;
                if(n==totalN-1){
                    $('#'+swipeone+' .swipebox-next').css('opacity',0.3);
                }
            }
        };
        $scope.closeSwipebox = function(){
            $('#'+swipeone).fadeOut(10);
            $('#'+swipeone+' .swipebox-slider').css('left',0).removeClass('swipebox-slider-show');
        };
    };



}]);
app.controller('startCtrl',['$scope','$location','$http','$interval',function($scope,$location,$http,$interval){
    $scope.headerWho();

}]);
app.controller('codingCtrl',['$scope','$location','$http',function($scope,$location,$http){
    $scope.headerWho();
}]);

app.controller('musicCtrl',['$scope','$location','$http','$interval',function($scope,$location,$http,$interval){
    $scope.headerWho();
    var n = $('#rslides li').length;
    var m = 0;
    var timer = $interval(function(){
        //console.log(123);
        m++;
        if(m<n){
            $('#rslides li.music-slide').removeClass('music-slide');
            $('#rslides li').eq(m).addClass('music-slide');
        }else{
          m=0;
            $('#rslides li.music-slide').removeClass('music-slide');
            $('#rslides li').eq(m).addClass('music-slide');
        }

    },3000)

    var ctx = cmusic.getContext('2d');
    var musicimg=new Image();
    musicimg.src='img/disc.png';
    var timer02=null;
    musicimg.onload=function(){
        ctx.translate(60,60);
        ctx.beginPath();
        ctx.lineWidth=10;
        ctx.strokeStyle='#000';
        ctx.arc(0,0,50,0,2*Math.PI);
        ctx.stroke();
        ctx.drawImage(musicimg,-50,-50);
        $('#playOrpause').click(function(){
            if(bgm.paused){
                bgm.play();
                $(this).removeClass('glyphicon-play').addClass('glyphicon-pause');
                rotate();
            }else{
                bgm.pause();
                $(this).removeClass('glyphicon-pause').addClass('glyphicon-play');
                clearInterval(timer02);
            }
        })
    };
    function rotate(){
        timer02=setInterval(function () {
            ctx.clearRect(-60,-60,120,120);
            ctx.beginPath();
            ctx.lineWidth=10;
            ctx.strokeStyle='#000';
            ctx.arc(0,0,50,0,2*Math.PI);
            ctx.stroke();
            ctx.rotate(5*Math.PI/180);
            ctx.drawImage(musicimg,-50,-50);
            if(bgm.ended){
                $(this).removeClass('glyphicon-pause').addClass('glyphicon-play');
                clearInterval(timer02);
            }
        },42)
    }

}]);

app.controller('pictureCtrl',['$scope','$location','$http',function($scope,$location,$http){
    $scope.headerWho();
}]);
app.controller('messageCtrl',['$scope','$location','$http',function($scope,$location,$http){
    $scope.headerWho();
}]);