/**
 * Created by Bello J on 4/20/2016.
 */
angular.module('fuoPortal')
    .factory("Allocation",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/allocation/allocation.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(lecturerId){
            return $http.get(Host.host+'/allocation/allocation.php')
                .then(function(response){
                    return lodash.find(response.data,{'lecturerId':lecturerId});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function add(lecturerId,code){
            return $http({
                method: 'POST',
                url: Host.host+'/allocation/add.php',
                params:{
                    lecturerId: lecturerId,
                    code: code
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function edit(lecturerId,code) {
            return $http({
                method: 'POST',
                url: Host.host + '/allocation/edit.php',
                params: {
                    lecturerId: lecturerId,
                    code: code
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
                url: Host.host + '/allocation/delete.php',
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