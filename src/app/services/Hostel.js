/**
 * Created by Bello J on 6/25/2016.
 */
/**
 * Created by Bello J on 4/20/2016.
 */
angular.module('fuoPortal')
    .factory("Hostel",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/hostel/hostel.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/hostel/hostel.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function add(name,sex){
            return $http({
                method: 'POST',
                url: Host.host+'/hostel/add.php',
                params:{
                    name: name,
                    sex: sex
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function edit(id,name,sex) {
            return $http({
                method: 'POST',
                url: Host.host + '/hostel/edit.php',
                params: {
                    id: id,
                    name: name,
                    sex: sex
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
                url: Host.host + '/hostel/delete.php',
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