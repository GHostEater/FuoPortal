/**
 * Created by Bello J on 4/20/2016.
 */
angular.module('fuoPortal')
    .factory("Allocation",function(Host,$http,$q,lodash){
        function getMyAllocations(id){
            return $http({
                method: 'POST',
                url: Host.host+'/allocation/myAllocations.php',
                params:{
                    id: id
                }
            })
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getMyCourses(id){
            return $http({
                method: 'POST',
                url: Host.host+'/allocation/myCourses.php',
                params:{
                    id: id
                }
            })
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getCourses(id){
            return $http({
                method: 'POST',
                url: Host.host+'/allocation/courses.php',
                params:{
                    id: id
                }
            })
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function allocate(lecturerId,code,allocatedBy,semester,sessionId){
            return $http({
                method: 'POST',
                url: Host.host+'/allocation/allocate.php',
                params:{
                    lecturerId: lecturerId,
                    code: code,
                    allocatedBy: allocatedBy,
                    semester: semester,
                    sessionId: sessionId
                }
            })
                .then(function(response){
                    return response.data;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function getAll(){
            return $http.get(Host.host+'/allocation/allocation.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
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
        function remove(id) {
            return $http({
                method: 'POST',
                url: Host.host + '/allocation/delete.php',
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
            getMyAllocations: getMyAllocations,
            getMyCourses: getMyCourses,
            getCourses: getCourses,
            getOne: getOne,
            allocate: allocate,
            remove: remove
        }
    });