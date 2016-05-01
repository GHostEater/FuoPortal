/**
 * Created by GHostEater on 01-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .factory("CourseReg",function($http,$q,Host){
            function getCourses(){
                return $http.get(Host.host+'/courseRegistration/registrableCourses.php')
                    .then(function(response){
                        return response.data;
                    })
                    .catch(function(response){
                        return $q.reject(response.status);
                    });
            }
            function registerCourse(code,matricNo,levelId,semesterId,sessionId){
                return $http({
                    method: 'POST',
                    url: Host.host+'/courseRegistration/register.php',
                    params:{
                        code: code,
                        matricNo: matricNo,
                        levelId: levelId,
                        semesterId: semesterId,
                        sessionId: sessionId
                    }
                })
                    .then(function(response){
                        return response.status;
                    })
                    .catch(function(response){
                        return $q.reject(response.status);
                    });
            }
            function getRegisterredCourses(){
                return $http.get(Host.host+'/courseRegistration/registerredCourses.php')
                    .then(function(response){
                        return response.data;
                    })
                    .catch(function(response){
                        return $q.reject(response.status);
                    });
            }
            return{
                getCourses: getCourses,
                registerCourse: registerCourse,
                getRegisterredCourses: getRegisterredCourses
            }
        });
})();