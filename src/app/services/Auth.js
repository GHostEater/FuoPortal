/**
 * Created by GHostEater on 19-Feb-16.
 */
(function () {
    'use strict';
angular.module('fuoPortal')
    .factory("Auth",function(Host,$http,$q){
        function studentLogin(username,password){
            return $http({
                    method: 'POST',
                    url: Host.host+'/studentLogin.php',
                    params:{
                        username: username,
                        password: password
                    }
            })
                    .then(function(response){
                        return response.data;
                    })
                    .catch(function(response){
                        return $q.reject(response.status);
                    });
        }
        function adminLogin(username,password,position){
            return $http({
                method: 'POST',
                url: Host.host+'/adminLogin.php',
                params:{
                    username: username,
                    password: password,
                    position: position
                }
            })
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        return{
            adminLogin: adminLogin,
            studentLogin: studentLogin
        };
    });
})();