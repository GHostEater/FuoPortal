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
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(code){
            return $http.get(Host.host+'/course/course.php')
                .then(function(response){
                    return lodash.find(response.data,{'code':code});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function add(code,title,unit,semester,levelId,departmentId,type){
            return $http({
                method: 'POST',
                url: Host.host+'/course/add.php',
                params:{
                    code: code,
                    title: title,
                    unit: unit,
                    semester: semester,
                    levelId: levelId,
                    departmentId: departmentId,
                    type: type
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function edit(code,title,unit,semester,levelId,departmentId,type) {
            return $http({
                method: 'POST',
                url: Host.host + '/course/edit.php',
                params: {
                    code: code,
                    title: title,
                    unit: unit,
                    semester: semester,
                    levelId: levelId,
                    departmentId: departmentId,
                    type: type
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
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