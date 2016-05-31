/**
 * Created by Bello J on 5/12/2016.
 */
angular.module('fuoPortal')
    .factory("LevelAdviser",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/levelAdviser/levelAdviser.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/levelAdviser/levelAdviser.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function add(lecturerId,departmentId,levelId){
            return $http({
                method: 'POST',
                url: Host.host+'/levelAdviser/add.php',
                params:{
                    lecturerId: lecturerId,
                    departmentId: departmentId,
                    levelId: levelId
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function assignStudent(lecturerId,matricNo){
            return $http({
                method: 'POST',
                url: Host.host+'/levelAdviser/assignStudent.php',
                params:{
                    lecturerId: lecturerId,
                    matricNo: matricNo
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function edit(id,lecturerId,departmentId,levelId) {
            return $http({
                method: 'POST',
                url: Host.host + '/levelAdviser/edit.php',
                params: {
                    id:id,
                    lecturerId: lecturerId,
                    departmentId: departmentId,
                    levelId: levelId
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
                url: Host.host + '/levelAdviser/delete.php',
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
            assignStudent: assignStudent,
            edit: edit,
            remove: remove
        }
    });
