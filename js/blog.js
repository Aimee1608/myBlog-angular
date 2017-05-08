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
    }).when('/learn',{
        templateUrl:'tpl/learn.html',
        controller:'learnCtrl'
    }).when('/message',{
        templateUrl:'tpl/message.html',
        controller:'messageCtrl'
    }).when('/author',{
        templateUrl:'tpl/author.html',
        controller:'authorCtrl'
    }).otherwise({redirectTo:'/start'})
});
app.run(function($http){
    $http.defaults.headers.post = {'Content-Type':'application/x-www-form-urlencoded'};
});
app.controller('myCtrl',['$scope','$location','$http','$interval','$timeout',function ($scope,$location,$http,$interval,$timeout) {
    $scope.jump = function(arg){
        $location.path(arg);
    };
    /*******小屏模式下的导航栏切换********/
    $scope.headerToggle = function(){
        $('#caidan').toggleClass('head-slide');
    };
    /********导航栏选中状态设置**********/
    $scope.headerWho = function(){
         $('#caidan li').removeClass('head-active');
         var tpl = window.location.hash;
         //console.log(tpl);
        $('#caidan li a[href="'+tpl+'"]').parent().addClass('head-active');
        clearInterval($scope.musicTimer);
    };
    /*********相册查看轮播************/
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
        /*****前一张******/
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
        /*****下一张******/
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
        /*****第几张******/
        $scope.closeSwipebox = function(){
            $('#'+swipeone).fadeOut(10);
            $('#'+swipeone+' .swipebox-slider').css('left',0).removeClass('swipebox-slider-show');
        };
    };



}]);
app.controller('startCtrl',['$scope','$location','$http','$interval',function($scope,$location,$http,$interval){
    $scope.headerWho();

}]);


app.controller('musicCtrl',['$scope','$location','$http','$interval',function($scope,$location,$http,$interval){
    $scope.headerWho();
    $(function(){
        /******图片轮播******/
        var n = $('#rslides li').length;
        var m = 0;
        $scope.musicTimer = $interval(function(){
            m++;
            if(m<n){
                $('#rslides li.music-slide').removeClass('music-slide');
                $('#rslides li').eq(m).addClass('music-slide');
            }else{
                m=0;
                $('#rslides li.music-slide').removeClass('music-slide');
                $('#rslides li').eq(m).addClass('music-slide');
            }
        },3000);

        /*****音乐播放器*****/
        var musicTime;
        var bgm = $('#bgm')[0];
        var wline = parseFloat($('#musicline').css('width'));
        var scale ;
        bgm.load();
        bgm.onloadedmetadata=function(){
            musicTime = bgm.duration;
            console.log(musicTime);
        };
        bgm.ontimeupdate = function(){
            scale = bgm.currentTime/ musicTime;
            $('#music-line-model').css('width',wline*scale+'px');
            if(scale<=0||scale>=1){
                $(this).removeClass('glyphicon-pause').addClass('glyphicon-play');
                //$('.music-rotate').removeClass('music-playing');
            }else{
                $(this).removeClass('glyphicon-play').addClass('glyphicon-pause');
                //$('.music-rotate').addClass('music-playing');
            }

        };
        $('#playOrpause').click(function(){
            if(bgm.paused){
                bgm.play();
                $(this).removeClass('glyphicon-play').addClass('glyphicon-pause');
                $('.music-rotate').addClass('music-playing');
            }else{
                bgm.pause();
                $(this).removeClass('glyphicon-pause').addClass('glyphicon-play');
                $('.music-rotate').removeClass('music-playing');

            }
        });
        $('#musicline').on('click',function(e){
            var x = e.offsetX;
            bgm.currentTime = x/wline*musicTime;
            if(x<=0){
                bgm.currentTime = 0;
            }
            if(x>=wline){
                bgm.currentTime = musicTime;
            }
        })
    })


}]);

app.controller('pictureCtrl',['$scope','$location','$http',function($scope,$location,$http){
    $scope.headerWho();
}]);
app.controller('codingCtrl',['$scope','$location','$http',function($scope,$location,$http){
    $scope.headerWho();
}]);
app.controller('learnCtrl',['$scope','$location','$http',function($scope,$location,$http){
    $scope.headerWho();
}]);
app.controller('messageCtrl',['$scope','$location','$http',function($scope,$location,$http){
    $scope.headerWho();
}]);
app.controller('authorCtrl',['$scope','$location','$http',function($scope,$location,$http){
    $scope.headerWho();
}]);