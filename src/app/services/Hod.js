/**
 * Created by Bello J on 4/21/2016.
 */
angular.module('fuoPortal')
    .factory("Hod",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/hod/hod.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/hod/hod.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function add(lecturerId,departmentId){
            return $http({
                method: 'POST',
                url: Host.host+'/hod/add.php',
                params:{
                    lecturerId: lecturerId,
                    departmentId: departmentId
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function edit(id,lecturerId,departmentId) {
            return $http({
                method: 'POST',
                url: Host.host + '/hod/edit.php',
                params: {
                    id:id,
                    lecturerId: lecturerId,
                    departmentId: departmentId
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function remove(id) {
            return $http({
                method: 'POST',
                url: Host.host + '/hod/delete.php',
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
            getAll: getAll,
            getOne: getOne,
            add: add,
            edit: edit,
            remove: remove
        }
    });