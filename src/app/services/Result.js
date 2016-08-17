/**
 * Created by Bello J on 4/20/2016.
 */
angular.module('fuoPortal')
    .factory("Result",function(Host,$http,$q,lodash,Allocation,Student,Session,Semester,CourseReg){
        function getAll(){
            return $http.get(Host.host+'/result/result.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getForStudent(matricNo){
            return $http.get(Host.host+'/result/result.php')
                .then(function(response){
                    return lodash.filter(response.data,{matricNo:matricNo});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getAllGP(){
            return $http.get(Host.host+'/result/gpget.php')
                .then(function(response){
                    return response.data;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getStudentGP(matricNo){
            return $http.get(Host.host+'/result/gpget.php')
                .then(function(response){
                    return lodash.filter(response.data,{matricNo:matricNo});
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function getRegisteredStudentsAndRawResults(code,user){
            var vm = {};
            vm.students = [];
            Allocation.getMyCourses(user)
                .then(function(data){
                    vm.courses = data;
                    vm.course = lodash.find(data,{code: code});
                    Session.getAll()
                        .then(function(data){
                            vm.session = lodash.findLast(data);
                            Semester.get()
                                .then(function(data){
                                    vm.semester = data;
                                    getForCourse(code,vm.session.id,vm.semester.semester)
                                        .then(function(data){
                                            vm.results = data;
                                        });
                                    CourseReg.getRegisterredStudents(code,vm.semester.semester,vm.session.id)
                                        .then(function(data){
                                            for(var i=0; i<data.length; i++){
                                                Student.getOne(data[i].matricNo)
                                                    .then(function(data){
                                                        vm.students.push({
                                                            info: data,
                                                            result: lodash.find(vm.results,{matricNo:data.matricNo})
                                                        });
                                                    });
                                            }
                                            return vm.students
                                        });
                                });
                        });
                });
        }
        function processResult(matricNo,tcp,ctcp,tnu,ctnu,gpa,cgpa,prev_cgpa,prev_ctcp,prev_ctnu,prev_tce,tce,sessionId,semester){
            return $http({
                method: 'POST',
                url: Host.host + '/result/addGPA.php',
                params: {
                    matricNo: matricNo,
                    tcp: tcp,
                    ctcp: ctcp,
                    tnu: tnu,
                    ctnu: ctnu,
                    gpa: gpa,
                    cgpa: cgpa,
                    prev_cgpa: prev_cgpa,
                    prev_ctcp: prev_ctcp,
                    prev_ctnu: prev_ctnu,
                    prev_tce: prev_tce,
                    tce: tce,
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
        function getOne(id){
            return $http.get(Host.host+'/result/result.php')
                .then(function(response){
                    return lodash.find(response.data,{'id':id});
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
        function editCa(id,ca) {
            return $http({
                method: 'POST',
                url: Host.host + '/result/editCa.php',
                params: {
                    id: id,
                    ca: ca
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function editExam(id,exam) {
            return $http({
                method: 'POST',
                url: Host.host + '/result/editExam.php',
                params: {
                    id: id,
                    exam: exam
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function release(id){
            return $http({
                method: 'POST',
                url: Host.host + '/result/release.php',
                params: {
                    id: id
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function releaseGP(id){
            return $http({
                method: 'POST',
                url: Host.host + '/result/gprel.php',
                params: {
                    id: id
                }
            })
                .then(function(response){
                    return response.status;
                })
                .catch(function(response){
                    return $q.reject(response.status);
                });
        }
        function removeGP(id) {
            return $http({
                method: 'POST',
                url: Host.host + '/result/deleteGP.php',
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
            getForStudent: getForStudent,
            getAllGP: getAllGP,
            getStudentGP: getStudentGP,
            getOne: getOne,
            processResult: processResult,
            getForCourse: getForCourse,
            getRegisteredStudentsAndRawResults: getRegisteredStudentsAndRawResults,
            uploadCA: uploadCA,
            uploadExam: uploadExam,
            editCa: editCa,
            editExam: editExam,
            release: release,
            releaseGP: releaseGP,
            removeGP: removeGP
        }
    });