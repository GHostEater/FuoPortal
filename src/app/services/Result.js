/**
 * Created by Bello J on 4/20/2016.
 */
angular.module('fuoPortal')
    .factory("Result",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/result/result.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function getOne(code){
            return $http.get(Host.host+'/result/result.php')
                .then(function(response){
                    return lodash.find(response.data,{'code':code});
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function add(code,matricNo,ca,exam,final,grade,session,semester){
            return $http({
                method: 'POST',
                url: Host.host+'/lecturer/add.php',
                params:{
                    code: code,
                    matricNo: matricNo,
                    ca: ca,
                    exam: exam,
                    final: final,
                    grade: grade,
                    session: session,
                    semester: semester
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function edit(code,matricNo,ca,exam,final,grade,session,semester) {
            return $http({
                method: 'POST',
                url: Host.host + '/result/edit.php',
                params: {
                    code: code,
                    matricNo: matricNo,
                    ca: ca,
                    exam: exam,
                    final: final,
                    grade: grade,
                    session: session,
                    semester: semester

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
                url: Host.host + '/result/delete.php',
                params: {
                    code: code,
                    matricNo: matricNo,
                    ca: ca,
                    exam: exam,
                    final: final,
                    grade: grade,
                    session: session,
                    semester: semester
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