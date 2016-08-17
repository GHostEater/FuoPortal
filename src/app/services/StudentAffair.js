/**
 * Created by Bello J on 6/24/2016.
 */
angular.module('fuoPortal')
    .factory("StudentAffair",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/studentAffair/studentAffair.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/studentAffair/studentAffair.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function add(firstName,middleName,lastName,email,password,sex,position){
            return $http({
                method: 'POST',
                url: Host.host+'/studentAffair/add.php',
                params:{
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    sex: sex,
                    position: position
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function edit(id,firstName,middleName,lastName,email,password,sex,position) {
            return $http({
                method: 'POST',
                url: Host.host + '/studentAffair/edit.php',
                params: {
                    id: id,
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    sex: sex,
                    position: position
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
                url: Host.host + '/studentAffair/delete.php',
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