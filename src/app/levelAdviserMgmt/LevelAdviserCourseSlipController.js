/**
 * Created by Bello J on 5/17/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("LevelAdviserCourseSlipController",function(CourseReg,College,Student,Result,Waving,User,$stateParams,Semester,toastr,lodash,Session,$modal,$window){
            var vm = this;
            vm.counter = 0;
            vm.outstandings = [];
            vm.deleteCourse = deleteCourse;
            vm.waveCourse = waveCourse;
            vm.unWaveCourse = unWaveCourse;
            Student.getOneById($stateParams.id)
                .then(function(data){
                    vm.student = data;
                    Session.getAll()
                        .then(function(data){
                            vm.session = lodash.findLast(data);
                            Semester.get()
                                .then(function(data){
                                    vm.semester = data;
                                    CourseReg.getCourses()
                                        .then(function(data){
                                            vm.courses = lodash.filter(data,{majorId:vm.student.majorId});
                                            CourseReg.getRegisterredCourses(vm.student.matricNo,vm.semester.semester,vm.session.id)
                                                .then(function(data){
                                                    vm.registerredCourses = data;
                                                    Result.getForStudent(vm.student.matricNo)
                                                        .then(function(data){
                                                            vm.result = data;
                                                            vm.resultFail = lodash.filter(data,{grade:'F'});
                                                            Waving.getAll()
                                                                .then(function(data){
                                                                    vm.wavings = lodash.filter(data,{matricNo:vm.student.matricNo});
                                                                    for(var i=0; i<vm.resultFail.length; i++){
                                                                        if(lodash.find(vm.courses,{code:vm.resultFail[i].code})){
                                                                            if(!lodash.find(vm.result,{code:vm.resultFail[i].code,statusId:'1'})
                                                                                && !lodash.find(vm.wavings,{code:vm.resultFail[i].code})){
                                                                                vm.course = lodash.find(vm.courses,{code:vm.resultFail[i].code});
                                                                                vm.outstandings.push(vm.course);
                                                                            }
                                                                        }
                                                                    }
                                                                    for(var j=0; j<vm.courses.length; j++){
                                                                        if(!lodash.find(vm.registerredCourses,{code:vm.courses[j].code})
                                                                            && !lodash.find(vm.wavings,{code:vm.courses[j].code})){
                                                                            vm.outstandings.push(vm.courses[j]);
                                                                        }
                                                                    }
                                                                    CourseReg.getRegisterredCourses(vm.student.matricNo,vm.semester.semester,vm.session.id)
                                                                        .then(function(data){
                                                                            vm.courses = data;
                                                                            for(var i = 0; i < vm.courses.length; i++){
                                                                                vm.counter += Number(vm.courses[i].unit);
                                                                            }
                                                                        });
                                                                });
                                                        });
                                                });
                                            });
                                });
                        });
                    College.getOne(vm.student.collegeId)
                        .then(function(data){
                            vm.college = data;
                        });
                });
            function deleteCourse(id){
                var options = {
                    templateUrl: 'app/levelAdviserMgmt/courseRegistrationDelete.html',
                    controller: "CourseRegistrationDeleteController",
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
            }
            function waveCourse(code){
                Waving.add(code,User.profile.id,vm.student.matricNo)
                    .then(function(){
                        toastr.success("Course Waved");
                        $window.location.reload();
                    })
                    .catch(function(){
                        toastr.warning("Unable to Wave Course");
                    });
            }
            function unWaveCourse(id){
                Waving.remove(id)
                    .then(function(){
                        toastr.success("Course Waving Removed");
                        $window.location.reload();
                    })
                    .catch(function(){
                        toastr.warning("Unable to Remove Course Waving");
                    });
            }
        });
})();