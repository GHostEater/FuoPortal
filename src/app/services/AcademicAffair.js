/**
 * Created by Bello J on 4/21/2016.
 */
angular.module('fuoPortal')
    .factory("AcademicAffair",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/academicAffair/academicAffair.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(id){
            return $http.get(Host.host+'/academicAffair/academicAffair.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function add(firstName,middleName,lastName,email,password){
            return $http({
                method: 'POST',
                url: Host.host+'/academicAffair/add.php',
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
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function edit(id,firstName,middleName,lastName,email,password) {
            return $http({
                method: 'POST',
                url: Host.host + '/academicAffair/edit.php',
                params: {
                    id: id,
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
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function remove(id) {
            return $http({
                method: 'POST',
                url: Host.host + '/academicAffair/delete.php',
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
        function getRequests(){
            return $http.get(Host.host+'/academicAffair/getRequests.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOneRequest(id){
            return $http.get(Host.host+'/academicAffair/getRequests.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function processRequest(id,status,date,handledBy) {
            return $http({
                method: 'POST',
                url: Host.host + '/academicAffair/processRequest.php',
                params: {
                    id: id,
                    status: status,
                    date: date,
                    handledBy: handledBy
                }
            })
                .then(function (response) {
                    return response.status;
                })
                .catch(function (response) {
                    return $q.reject(response.status);
                });
        }
        function disableEdit(id) {
            return $http({
                method: 'POST',
                url: Host.host + '/academicAffair/disableEdit.php',
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
        function request(id) {
            return $http({
                method: 'POST',
                url: Host.host + '/academicAffair/request.php',
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
        function getEditLogs(){
            return $http.get(Host.host+'/academicAffair/getLogs.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function logEdit(resultId,type,prevScore,newScore,dateEdited,editedBy) {
            return $http({
                method: 'POST',
                url: Host.host + '/academicAffair/logEdit.php',
                params: {
                    resultId: resultId,
                    type: type,
                    prevScore: prevScore,
                    newScore: newScore,
                    dateEdited: dateEdited,
                    editedBy: editedBy
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
            getRequests: getRequests,
            getOneRequest: getOneRequest,
            request: request,
            processRequest: processRequest,
            disableEdit: disableEdit,
            add: add,
            edit: edit,
            remove: remove,
            getEditLogs: getEditLogs,
            logEdit: logEdit
        }
    });