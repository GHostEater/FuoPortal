/**
 * Created by GHostEater on 01-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .factory("CourseReg",function($http,$q,Host,lodash){
            function getCourses(){
                return $http.get(Host.host+'/courseRegistration/registrableCourses.php')
                    .then(function(response){
                        return response.data;
                    })
                    .catch(function(response){
                        return $q.reject(response.status);
                    });
            }
            function registerCourse(code,matricNo,levelId,semester,sessionId){
                return $http({
                    method: 'POST',
                    url: Host.host+'/courseRegistration/register.php',
                    params:{
                        code: code,
                        matricNo: matricNo,
                        levelId: levelId,
                        semester: semester,
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
            function getRegisterredCourses(matricNo,semester,sessionId){
                return $http.get(Host.host+'/courseRegistration/registerredCourses.php')
                    .then(function(response){
                        return lodash.filter(response.data,{matricNo: matricNo, semester: semester, sessionId: sessionId})
                    })
                    .catch(function(response){
                        return $q.reject(response.status);
                    });
            }
            function getRegisterredStudents(code,semester,sessionId){
                return $http.get(Host.host+'/courseRegistration/registerredCourses.php')
                    .then(function(response){
                        return lodash.filter(response.data,{code: code, semester: semester, sessionId: sessionId})
                    })
                    .catch(function(response){
                        return $q.reject(response.status);
                    });
            }
            function addCourseToMajor(code,majorId,levelId){
                return $http({
                    method: 'POST',
                    url: Host.host+'/courseRegistration/addRegistrableCourse.php',
                    params:{
                        code: code,
                        levelId: levelId,
                        majorId: majorId
                    }
                })
                    .then(function(response){
                        return response.status;
                    })
                    .catch(function(response){
                        return $q.reject(response.status);
                    });
            }
            function removeCourseFromMajor(id){
                return $http({
                    method: 'POST',
                    url: Host.host+'/courseRegistration/deleteRegistrableCourse.php',
                    params:{
                        id: id
                    }
                })
                    .then(function(response){
                        return response.status;
                    })
                    .catch(function(response){
                        return $q.reject(response.status);
                    });
            }
            function removeRegisteredCourse(id){
                return $http({
                    method: 'POST',
                    url: Host.host + '/courseRegistration/delete.php',
                    params: {
                        id: id
                    }
                })
                    .then(function (response) {
                        return response.status;
                    })
                    .catch(function (response) {
                        return $q.reject(response.status);
                    });
            }
            return{
                getCourses: getCourses,
                registerCourse: registerCourse,
                getRegisterredCourses: getRegisterredCourses,
                getRegisterredStudents: getRegisterredStudents,
                addCourseToMajor: addCourseToMajor,
                removeCourseFromMajor: removeCourseFromMajor,
                removeRegisteredCourse: removeRegisteredCourse
            }
        });
})();