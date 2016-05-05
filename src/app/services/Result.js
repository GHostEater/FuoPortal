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
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(code){
            return $http.get(Host.host+'/result/result.php')
                .then(function(response){
                    return lodash.find(response.data,{'code':code});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getForCourse(code,sessionId,semester){
            return $http.get(Host.host+'/result/result.php')
                .then(function(response){
                    return lodash.filter(response.data,{'code':code,sessionId:sessionId,semester:semester});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function uploadCA(code,matricNo,ca,sessionId,semester){
            return $http({
                method: 'POST',
                url: Host.host+'/result/addCA.php',
                params:{
                    code: code,
                    matricNo: matricNo,
                    ca: ca,
                    sessionId: sessionId,
                    semester: semester
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function uploadExam(code,matricNo,exam,sessionId,semester){
            return $http({
                method: 'POST',
                url: Host.host+'/result/addExam.php',
                params:{
                    code: code,
                    matricNo: matricNo,
                    exam: exam,
                    sessionId: sessionId,
                    semester: semester
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
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
                .catch(function(response){
                    return $q.reject(response.status);
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
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function remove(code) {
            return $http({
                method: 'POST',
                url: Host.host + '/result/delete.php',
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
            getForCourse: getForCourse,
            uploadCA: uploadCA,
            uploadExam: uploadExam,
            add: add,
            edit: edit,
            remove: remove
        }
    });