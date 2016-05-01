/**
 * Created by GHostEater on 01-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .factory("Semester",function($http,$q,Host){
            function get(){
                return $http.get(Host.host+'/semester/semester.php')
                    .then(function(response){
                        return response.data;
                    })
                    .catch(function(response){
                        return $q.reject(response.status);
                    });
            }
            return{
                get: get
            }
        });
})();