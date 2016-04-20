/**
 * Created by Bello J on 4/20/2016.
 */
angular.module('fuoPortal')
    .factory("Department",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/department/department.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/department/department.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function add(name,acronym){
            return $http({
                method: 'POST',
                url: Host.host+'/department/add.php',
                params:{
                    name: name,
                    acronym: acronym

                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function edit(name,acronym) {
            return $http({
                method: 'POST',
                url: Host.host + '/department/edit.php',
                params: {
                    name: name,
                    acronym: acronym

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
                url: Host.host + '/department/delete.php',
                params: {
                    name: name,
                    acronym: acronym
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