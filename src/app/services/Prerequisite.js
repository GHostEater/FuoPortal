/**
 * Created by GHostEater on 27-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .factory("Prerequisite",function($http,$q,lodash,Host){
            function getAll(){
                return $http.get(Host.host+'/prerequisites/prerequisites.php')
                    .then(function(response){
                        return response.data;
                    })
                    .catch(function(response){
                        return $q.reject(response.status);
                    });
            }
            function add(code,prerequisite){
                return $http({
                    method: 'POST',
                    url: Host.host+'/prerequisites/add.php',
                    params:{
                        code: code,
                        prerequisite: prerequisite
                    }
                })
                    .then(function(response){
                        return response.data;
                    })
                    .catch(function(response){
                        return $q.reject(response.status);
                    })
            }
            function remove(){}
            function getForCourse(){}
            function setActive(){}
            function setInactive(){}
            return{
                getAll: getAll,
                getForCourse: getForCourse,
                add: add,
                remove: remove,
                setActive: setActive,
                setInactive: setInactive
            }
        });
})();