/**
 * Created by Bello J on 5/19/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("MyTranscriptController",function($q,Result,CourseReg,Waving,Student,lodash,toastr,$stateParams,Session,Semester,User,$window){
            var vm = this;
            vm.user = User.profile;
            vm.results = [];
            vm.fails = [];
            vm.outstandings = [];
            Session.getAll()
                .then(function(data){
                    vm.sessions = data;
                });
            Semester.get()
                .then(function(data){
                    vm.semester = data;
                });

            Student.getOneById($stateParams.id)
                .then(function(data){
                    vm.student = data;
                    Result.getStudentGP(vm.student.matricNo)
                        .then(function(data){
                            vm.gps = data;
                            var z=0;
                            for(var i=0; i<vm.gps.length; i++){
                                Result.getForStudent(vm.student.matricNo)
                                    .then(function(data){
                                        vm.result = lodash.filter(data,{sessionId:vm.gps[z].sessionId,semester:vm.gps[z].semester});
                                        vm.resultFail = lodash.filter(data,{grade:'F'});
                                        CourseReg.getCourses()
                                            .then(function(data){
                                                vm.courses = lodash.filter(data,{majorId:vm.student.majorId});
                                                Waving.getAll()
                                                    .then(function(data){
                                                        vm.wavings = lodash.find(data,{matricNo:vm.student.matricNo});
                                                        for(var j=0; j<vm.resultFail.length; j++){
                                                            if(lodash.find(vm.courses,{code:vm.resultFail[j].code})){
                                                                if(!lodash.find(vm.result,{code:vm.resultFail[j].code,statusId:'1'})
                                                                    && !lodash.find(vm.wavings,{code:vm.resultFail[j].code})){
                                                                    vm.course = lodash.find(vm.courses,{code:vm.resultFail[j].code});
                                                                    vm.fails.push(vm.course);
                                                                }
                                                            }
                                                        }
                                                        CourseReg.getRegisterredCourses(vm.student.matricNo,vm.result[z].semester,vm.result[z].sessionId)
                                                            .then(function(data){
                                                                vm.registerredCourses = data;
                                                                for(var k=0; k<vm.courses.length; k++){
                                                                    if(!lodash.find(vm.registerredCourses,{code:vm.courses[k].code})
                                                                        && !lodash.find(vm.wavings,{code:vm.courses[k].code})
                                                                        && Number(vm.courses[k].level) <= Number(vm.student.level)
                                                                        && vm.courses[k].semester == vm.semester.semester){
                                                                        vm.outstandings.push(vm.courses[k]);
                                                                    }
                                                                }
                                                            });
                                                    });
                                            });
                                        var dat = {
                                            result: vm.result,
                                            gp: vm.gps[z]
                                        };
                                        vm.results.push(dat);
                                        z+=1;
                                    });
                            }
                        });
                });
            vm.print = function(){
                $window.print();
            };
        });
})();