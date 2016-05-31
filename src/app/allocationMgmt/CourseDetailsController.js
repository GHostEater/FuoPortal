/**
 * Created by GHostEater on 03-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("CourseDetailsController",function($q,Allocation,CourseReg,Result,Student,Session,Semester,User,lodash,$window,toastr,$stateParams,$modal){
            var vm = this;
            vm.students = [];
            Allocation.getMyCourses(User.profile.id)
                .then(function(data){
                    vm.courses = data;
                    vm.course = lodash.find(data,{code: $stateParams.code});
                    Session.getAll()
                        .then(function(data){
                            vm.session = lodash.findLast(data);
                            Semester.get()
                                .then(function(data){
                                    vm.semester = data;
                                    Result.getForCourse($stateParams.code,vm.session.id,vm.semester.semester)
                                        .then(function(data){
                                            vm.results = data;
                                        })
                                        .catch(function(){
                                            toastr.warning("Could Not Connect");
                                        });
                                    CourseReg.getRegisterredStudents($stateParams.code,vm.semester.semester,vm.session.id)
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
                                        })
                                        .catch(function(){
                                            toastr.warning("Could Not Connect");
                                        });
                                })
                                .catch(function(){
                                    toastr.warning("Could Not Connect");
                                });
                        })
                        .catch(function(){
                            toastr.warning("Could Not Connect");
                        });
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            vm.uploadCA = function(){
                $q.when()
                    .then(function(){
                        for(var i = 0; i<(Number(vm.ca.data.length)-1); i++){
                            vm.data = {
                                matricNo: vm.ca.data[i][0],
                                score: vm.ca.data[i][1]
                            };
                            Result.uploadCA($stateParams.code,vm.data.matricNo,vm.data.score,vm.session.id,vm.semester.semester)
                                .then(function(){
                                    toastr.success("CA Uploaded");
                                })
                                .catch(function(error){
                                });
                        }
                    })
                    .then(function(){
                        $window.location.reload();
                    });

            };
            vm.uploadExam = function(){
                $q.when()
                    .then(function(){
                        for(var i = 0; i<(Number(vm.exam.data.length)-1); i++){
                            vm.data = {
                                matricNo: vm.exam.data[i][0],
                                score: vm.exam.data[i][1]
                            };
                            Result.uploadExam($stateParams.code,vm.data.matricNo,vm.data.score,vm.session.id,vm.semester.semester)
                                .then(function(){
                                    toastr.success("Exam Uploaded");
                                })
                                .catch(function(error){
                                });
                        }
                    })
                    .then(function(){
                        $window.location.reload();
                    });
            };
            vm.editCa = function(id){
                var options = {
                    templateUrl: 'app/result/editCa.html',
                    controller: "EditCaController",
                    controllerAs: 'model',
                    size: 'sm',
                    resolve:{
                        id: function(){
                            return id;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        $window.location.reload();
                    });
            };
            vm.editExam = function(id){
                var options = {
                    templateUrl: 'app/result/editExam.html',
                    controller: "EditExamController",
                    controllerAs: 'model',
                    size: 'sm',
                    resolve:{
                        id: function(){
                            return id;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        $window.location.reload();
                    });
            };
        });
})();