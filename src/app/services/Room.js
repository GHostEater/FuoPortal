/**
 * Created by Bello J on 6/25/2016.
 */
angular.module('fuoPortal')
    .factory("Room",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/room/room.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/room/room.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function add(name,hostelId){
            return $http({
                method: 'POST',
                url: Host.host+'/room/add.php',
                params:{
                    name: name,
                    hostelId: hostelId
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function edit(id,name,hostelId) {
            return $http({
                method: 'POST',
                url: Host.host + '/room/edit.php',
                params: {
                    id: id,
                    name: name,
                    hostelId: hostelId
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
                url: Host.host + '/room/delete.php',
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