/**
 * Created by Bello J on 4/26/2016.
 */
angular.module('fuoPortal')
    .factory("LecturerStatus",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/lecturerStatus/lecturerStatus.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/lecturerStatus/lecturerStatus.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function add(status){
            return $http({
                method: 'POST',
                url: Host.host+'/lecturerStatus/add.php',
                params:{
                    status: status
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function edit(id,status) {
            return $http({
                method: 'POST',
                url: Host.host + '/lecturerStatus/edit.php',
                params: {
                    id: id,
                    status: status
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
                url: Host.host + '/lecturerStatus/delete.php',
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