/**
 * Created by Bello J on 4/26/2016.
 */
angular.module('fuoPortal')
    .factory("LecturerRank",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/lecturerRank/lecturerRank.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/lecturerRank/lecturerRank.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function add(rank){
            return $http({
                method: 'POST',
                url: Host.host+'/lecturerRank/add.php',
                params:{
                    rank: rank
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function edit(id,rank) {
            return $http({
                method: 'POST',
                url: Host.host + '/lecturerRank/edit.php',
                params: {
                    id: id,
                    rank: rank
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
                url: Host.host + '/LecturerRank/delete.php',
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