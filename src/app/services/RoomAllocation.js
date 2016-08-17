/**
 * Created by Bello J on 6/28/2016.
 */
angular.module('fuoPortal')
    .factory("RoomAllocation",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/roomAllocation/roomAllocation.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/roomAllocation/roomAllocation.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function allocate(matricNo,roomId,sessionId){
            return $http({
                method: 'POST',
                url: Host.host+'/roomAllocation/allocate.php',
                params:{
                    matricNo: matricNo,
                    roomId: roomId,
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
        function remove(id) {
            return $http({
                method: 'POST',
                url: Host.host + '/roomAllocation/delete.php',
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
            allocate: allocate,
            remove: remove
        }
    });