/**
 * Created by Bello J on 4/20/2016.
 */
angular.module('fuoPortal')
.factory("Course",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/course/course.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/course/course.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function add(code,title,unit,semester,level,prerequisiteFor){
            return $http({
                method: 'POST',
                url: Host.host+'/course/add.php',
                params:{
                    code: code,
                    title: title,
                    unit: unit,
                    semester: semester,
                    level: level,
                    prerequisiteFor: prerequisiteFor
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function edit(code,title,unit,semester,level,prerequisiteFor) {
            return $http({
                method: 'POST',
                url: Host.host + '/course/edit.php',
                params: {
                    code: code,
                    title: title,
                    unit: unit,
                    semester: semester,
                    level: level,
                    prerequisiteFor: prerequisiteFor

                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function remove(code) {
            return $http({
                method: 'POST',
                url: Host.host + '/course/delete.php',
                params: {
                    code: code
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