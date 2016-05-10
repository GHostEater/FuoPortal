/**
 * Created by GHostEater on 10-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("ResultComputationController",function(User,Lecturer,Result,Level,Student,Session,Semester,lodash,toastr){
            var vm = this;
            vm.students = [];
            Level.getAll()
                .then(function(data){
                    vm.levels = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Session.getAll()
                .then(function(data){
                    vm.sessions = data;
                    vm.session = lodash.findLast(data);
                    vm.sess = vm.session.id;
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
            Lecturer.getOne(User.profile.id)
                .then(function(data){
                    vm.lecturer = data;
                    Result.getAll()
                        .then(function(data){
                            vm.results = lodash.filter(data,{departmentId:vm.lecturer.departmentId,
                                sessionId:vm.session.id,
                                semester: vm.semester.semester});
                            for(var i=0; i<vm.results.length; i++){
                                Student.getOne(vm.results[i].matricNo)
                                    .then(function(data){
                                        vm.result = lodash.filter(vm.results,{matricNo:data.matricNo});
                                        var tnu = 0;
                                        var tcp = 0;
                                        for(var j=0; j<vm.result.length; j++){
                                            tnu += Number(vm.result[j].unit);
                                        }
                                        for(var k=0; k<vm.result.length; k++){
                                            tcp +=  Number(vm.result[k].gp) * Number(vm.result[k].unit);
                                        }
                                        var gpa = tcp/tnu;
                                        var dat = {
                                            info: data,
                                            results: vm.result,
                                            tnu: tnu,
                                            tcp: tcp,
                                            gpa: gpa
                                        };
                                        if(!lodash.find(vm.students,{info:{matricNo:dat.info.matricNo}})){
                                            vm.students.push(dat);
                                        }
                                    })
                                    .catch(function(){
                                        toastr.warning("Could Not Connect");
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
            vm.changeSession = function(id){
                vm.session = lodash.find(vm.sessions,{id:id});
            };
            vm.processResults = function(){
                for(var i=0; i<vm.students.length; i++){
                    Result.processResult(vm.students[i].info.matricNo,vm.students[i].tcp,vm.students[i].tnu,
                        vm.students[i].gpa,vm.session.id,vm.semester.semester)
                        .then(function(data){})
                        .catch(function(){});
                }
            }
        });
})();