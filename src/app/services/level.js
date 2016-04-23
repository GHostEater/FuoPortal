/**
 * Created by Bello J on 4/21/2016.
 */
angular.module('fuoPortal')
    .factory("Level",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/level/level.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(Id){
            return $http.get(Host.host+'/level/level.php')
                .then(function(response){
                    return lodash.find(response.data,{'Id':Id});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function add(level){
            return $http({
                method: 'POST',
                url: Host.host+'/level/add.php',
                params:{
                    level: level
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function edit(Id,level) {
            return $http({
                method: 'POST',
                url: Host.host + '/level/edit.php',
                params: {
                    Id: Id,
                    level: level
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function remove(Id) {
            return $http({
                method: 'POST',
                url: Host.host + '/level/delete.php',
                params: {
                    Id: Id
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
            getAll: getAll,
            getOne: getOne,
            add: add,
            edit: edit,
            remove: remove
        }
    });