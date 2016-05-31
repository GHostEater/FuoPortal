/**
 * Created by Bello J on 5/24/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("ResultBroadSheetController",function(User,Lecturer,Result,Level,Major,Student,Session,Semester,lodash,toastr){
            var vm = this;

            Lecturer.getOne(User.profile.id)
                .then(function(data){
                    vm.lecturer = data;
                    Major.getAll()
                        .then(function(data){
                            vm.majors = lodash.filter(data,{departmentId:vm.lecturer.departmentId});
                            vm.major = lodash.findLast(vm.majors);
                            vm.mj = vm.major.id;
                        })
                        .catch(function(){
                            toastr.warning("Could Not Connect");
                        });
                    Result.getAllGP()
                        .then(function(data){
                            vm.gps = [];
                            var dat = {};
                            var j = 0;
                            vm.gs = lodash.filter(data,{departmentId:vm.lecturer.departmentId});
                            for(var i=0; i<vm.gs.length; i++){
                                Student.getOne(vm.gs[i].matricNo)
                                    .then(function(data){
                                        vm.s = data;
                                        Result.getForStudent(vm.s.matricNo)
                                            .then(function(data){
                                                vm.result = data;
                                                vm.resultFail = lodash.filter(data,{grade:'F'});
                                                vm.gp = lodash.find(vm.gs,{matricNo:vm.s.matricNo});
                                                var status = 0;
                                                if(vm.resultFail.length>0){
                                                    status = 2;
                                                }
                                                else{
                                                    status = 1;
                                                }
                                                dat = {
                                                    gp: vm.gs[j],
                                                    resultFail: vm.resultFail,
                                                    result: vm.result,
                                                    status: status
                                                };
                                                vm.gps.push(dat);
                                                delete vm.gp;
                                                j+=1;
                                            })
                                            .catch(function(){
                                                toastr.warning("Could Not Connect");
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
            Level.getAll()
                .then(function(data){
                    vm.levels = data;
                    vm.level = lodash.findLast(data);
                    vm.lvl = vm.level.id;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            vm.changeLevel = function(id){
                vm.level = lodash.find(vm.levels,{id:id});
            };
            vm.changeSession = function(id){
                vm.session = lodash.find(vm.sessions,{id:id});
            };
            vm.changeMajor = function(id){
                vm.major = lodash.find(vm.majors,{id:id});
            };
        });
})();