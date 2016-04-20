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
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function getOne(matric_no){
            return $http.get(Host.host+'/student/student.php')
                .then(function(response){
                    return lodash.find(response.data,{'matric_no':matric_no});
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function add(matric_no,firstName,middleName,lastName,collegeId,departmentId,majorId,level,mode_of_entry,session,dateBirth,email,address){
            return $http({
                method: 'POST',
                url: Host.host+'/student/add.php',
                params:{
                    matric_no: matric_no,
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    collegeId: collegeId,
                    departmentId: departmentId,
                    majorId: majorId,
                    level: level,
                    mode_of_entry: mode_of_entry,
                    session: session,
                    dateBirth: dateBirth,
                    email: email,
                    address: address
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function edit(matric_no,firstName,middleName,lastName,collegeId,departmentId,majorId,level,mode_of_entry,session,dateBirth,email,address) {
            return $http({
                method: 'POST',
                url: Host.host + '/student/edit.php',
                params: {
                    matric_no: matric_no,
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    collegeId: collegeId,
                    departmentId: departmentId,
                    majorId: majorId,
                    level: level,
                    mode_of_entry: mode_of_entry,
                    session: session,
                    dateBirth: dateBirth,
                    email: email,
                    address: address

                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(reponse){
                    return $q.reject(reponse.status);
                });
        }
        function remove(matric_no) {
            return $http({
                method: 'POST',
                url: Host.host + '/student/delete.php',
                params: {
                    matric_no: matric_no
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