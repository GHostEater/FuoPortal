/**
 * Created by Bello J on 4/21/2016.
 */
angular.module('fuoPortal')
    .factory("AcademicAffairs",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/academicAffairs/academicAffairs.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/academicAffairs/academicAffairs.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function add(firstName,middleName,lastName,email,password){
            return $http({
                method: 'POST',
                url: Host.host+'/academicAffairs/add.php',
                params:{
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    email: email,
                    password: password

                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function edit(academicAffairs) {
            return $http({
                method: 'POST',
                url: Host.host + '/academicAffairs/edit.php',
                params: {
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    email: email,
                    password: password


                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function remove(id) {
            return $http({
                method: 'POST',
                url: Host.host + '/academicAffairs/delete.php',
                params: {
                    id: id
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