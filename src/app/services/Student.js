/**
 * Created by Bello J on 4/20/2016.
 */
angular.module('fuoPortal')
    .factory("Student",function(Host,$http,$q,lodash){
        function getAll(){
            return $http.get(Host.host+'/student/student.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOne(matricNo){
            return $http.get(Host.host+'/student/student.php')
                .then(function(response){
                    return lodash.find(response.data,{'matricNo':matricNo});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getOneById(id){
            return $http.get(Host.host+'/student/student.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function add(matricNo,firstName,middleName,lastName,sex,email,phoneNumber,dateBirth,nationality,stateOrigin,lga,religion,address,nextOfKin,nextOfKinAddress,collegeId,departmentId,majorId,levelId,modeOfEntryId,session,password){
            return $http({
                method: 'POST',
                url: Host.host+'/student/add.php',
                params:{
                    matricNo: matricNo,
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    sex: sex,
                    email: email,
                    phoneNumber: phoneNumber,
                    dateBirth: dateBirth,
                    nationality: nationality,
                    stateOrigin: stateOrigin,
                    lga: lga,
                    religion: religion,
                    address: address,
                    nextOfKin: nextOfKin,
                    nextOfKinAddress: nextOfKinAddress,
                    collegeId: collegeId,
                    departmentId: departmentId,
                    majorId: majorId,
                    levelId: levelId,
                    modeOfEntryId: modeOfEntryId,
                    session: session,
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
        function edit(matricNo,firstName,middleName,lastName,sex,email,phoneNumber,dateBirth,nationality,stateOrigin,lga,religion,address,nextOfKin,nextOfKinAddress,collegeId,departmentId,majorId,levelId,modeOfEntryId,session,password) {
            return $http({
                method: 'POST',
                url: Host.host + '/student/edit.php',
                params: {
                    matricNo: matricNo,
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    sex: sex,
                    email: email,
                    phoneNumber: phoneNumber,
                    dateBirth: dateBirth,
                    nationality: nationality,
                    stateOrigin: stateOrigin,
                    lga: lga,
                    religion: religion,
                    address: address,
                    nextOfKin: nextOfKin,
                    nextOfKinAddress: nextOfKinAddress,
                    collegeId: collegeId,
                    departmentId: departmentId,
                    majorId: majorId,
                    levelId: levelId,
                    modeOfEntryId: modeOfEntryId,
                    session: session,
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
        function remove(matricNo) {
            return $http({
                method: 'POST',
                url: Host.host + '/student/delete.php',
                params: {
                    matricNo: matricNo
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
            getOneById: getOneById,
            add: add,
            edit: edit,
            remove: remove
        }
    });