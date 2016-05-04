/**
 * Created by GHostEater on 03-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("CourseDetailsController",function(Allocation,CourseReg,Result,Student,Session,Semester,User,lodash,toastr,$stateParams){
            var vm = this;
            vm.students = [];
            vm.errorCA = [];
            Session.getAll()
                .then(function(data){
                    vm.session = lodash.findLast(data);
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Semester.get()
                .then(function(data){
                    vm.semester = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Allocation.getMyCourses(User.profile.id)
                .then(function(data){
                    vm.course = lodash.find(data,{code: $stateParams.code});
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
            vm.uploadCA = function(){
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
                            if(error === 402){
                                toastr.error("CA for "+vm.data.matricNo+" Already Uploaded");
                            }
                            else if(error === 401){
                                toastr.error("Student "+vm.data.matricNo+" Not Registerred");
                            }
                            else{
                                toastr.warning("Could Not Connect");
                            }
                        });
                }
            };
        });
})();