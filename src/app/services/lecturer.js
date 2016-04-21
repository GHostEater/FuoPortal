/**
 * Created by Bello J on 4/20/2016.
 */
angular.module('fuoPortal')
    .factory("Lecturer",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/lecturer/lecturer.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function getOne(lecturerId){
            return $http.get(Host.host+'/lecturer/lecturer.php')
                .then(function(response){
                    return lodash.find(response.data,{'lecturerId':lecturerId});
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function add(lecturerId,firstName,middleName,lastName,rank,status,collegeId,departmentId,phoneNumber,email,address){
            return $http({
                method: 'POST',
                url: Host.host+'/lecturer/add.php',
                params:{
                    lecturerId: lecturerId,
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    rank: rank,
                    status: status,
                    collegeId: collegeId,
                    departmentId: departmentId,
                    phoneNumber: phoneNumber,
                    email: email,
                    address: address
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function edit(lecturerId,firstName,middleName,lastName,rank,status,collegeId,departmentId,phoneNumber,email,address) {
            return $http({
                method: 'POST',
                url: Host.host + '/lecturer/edit.php',
                params: {
                    lecturerId: lecturerId,
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    rank: rank,
                    status: status,
                    collegeId: collegeId,
                    departmentId: departmentId,
                    phoneNumber: phoneNumber,
                    email: email,
                    address: address

                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function remove(lecturerId) {
            return $http({
                method: 'POST',
                url: Host.host + '/lecturer/delete.php',
                params: {
                    lecturerId: lecturerId
                }
            })
                .then(function (response) {
                    return response.status;
                })
                .catch(function (reponse) {
                    return $q.reject(reponse.status);
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