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
        function allocateCoordinator(lecturerId,code,allocatedBy,semester,sessionId,position){
            return $http({
                method: 'POST',
                url: Host.host+'/allocation/allocateCoordinator.php',
                params:{
                    lecturerId: lecturerId,
                    code: code,
                    allocatedBy: allocatedBy,
                    semester: semester,
                    sessionId: sessionId,
                    position: position
                }
            })
                .then(function(response){
                    return response.data;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function allocateAssisting(lecturerId,code,allocatedBy,semester,sessionId,position){
            return $http({
                method: 'POST',
                url: Host.host+'/allocation/allocateAssisting.php',
                params:{
                    lecturerId: lecturerId,
                    code: code,
                    allocatedBy: allocatedBy,
                    semester: semester,
                    sessionId: sessionId,
                    position: position
                }
            })
                .then(function(response){
                    return response.data;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
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
            getMyAllocations: getMyAllocations,
            getMyCourses: getMyCourses,
            getCourses: getCourses,
            allocateCoordinator: allocateCoordinator,
            allocateAssisting: allocateAssisting,
            remove: remove
        }
    });