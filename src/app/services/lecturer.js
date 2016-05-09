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
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/lecturer/lecturer.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function add(firstName,middleName,lastName,rankId,statusId,collegeId,departmentId,phoneNumber,email,address,password){
            return $http({
                method: 'POST',
                url: Host.host+'/lecturer/add.php',
                params:{
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    rankId: rankId,
                    statusId: statusId,
                    collegeId: collegeId,
                    departmentId: departmentId,
                    phoneNumber: phoneNumber,
                    email: email,
                    address: address,
                    password: password
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function edit(id,firstName,middleName,lastName,rankId,statusId,collegeId,departmentId,phoneNumber,email,address,password) {
            return $http({
                method: 'POST',
                url: Host.host + '/lecturer/edit.php',
                params: {
                    id: id,
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    rankId: rankId,
                    statusId: statusId,
                    collegeId: collegeId,
                    departmentId: departmentId,
                    phoneNumber: phoneNumber,
                    email: email,
                    address: address,
                    password: password

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
                url: Host.host + '/lecturer/delete.php',
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