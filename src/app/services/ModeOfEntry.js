/**
 * Created by Bello J on 4/21/2016.
 */
angular.module('fuoPortal')
    .factory("ModeOfEntry",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/modeOfEntry/modeOfEntry.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/modeOfEntry/modeOfEntry.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function add(modeOfEntry){
            return $http({
                method: 'POST',
                url: Host.host+'/modeOfEntry/add.php',
                params:{
                    modeOfEntry: modeOfEntry

                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function edit(id,modeOfEntry) {
            return $http({
                method: 'POST',
                url: Host.host + '/modeOfEntry/edit.php',
                params: {
                    id: id,
                    modeOfEntry: modeOfEntry
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
                url: Host.host + '/modeOfEntry/delete.php',
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