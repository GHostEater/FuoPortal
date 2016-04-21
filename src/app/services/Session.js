/**
 * Created by Bello J on 4/21/2016.
 */
angular.module('fuoPortal')
    .factory("Session",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/session/session.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/session/session.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function add(session){
            return $http({
                method: 'POST',
                url: Host.host+'/session/add.php',
                params:{
                    session: session

                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function edit(session) {
            return $http({
                method: 'POST',
                url: Host.host + '/session/edit.php',
                params: {
                    session: session


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
                url: Host.host + '/session/delete.php',
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
