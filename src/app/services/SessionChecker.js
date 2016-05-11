/**
 * Created by GHostEater on 11-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .factory("SessionChecker",function(User,$location,$q){
            function request(config){
                if(!User.loggedIn && $location.path() != '/admin'){
                    $location.url('/');
                }
                else if($location.path() === '/admin'){
                    $location.url('/admin');
                }
                else{
                    config.headers.Authorization = "Bearer";
                }
                return $q.when(config);
            }
            return{
                request: request
            }
        });
    angular.module('fuoPortal')
        .config(function($httpProvider){
            $httpProvider.interceptors.push("SessionChecker");
        });
})();