/**
 * Created by Bello J on 5/24/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("BroadSheetController",function(User,Lecturer,Hod,LevelAdviser,Department,College,Result,Level,Major,Student,Session,Semester,lodash,$window){
            var vm = this;
            vm.user = User.profile;
            Lecturer.getOne(User.profile.id)
                .then(function(data){
                    vm.lecturer = data;
                    Major.getAll()
                        .then(function(data){
                            vm.majors = lodash.filter(data,{departmentId:vm.lecturer.departmentId});
                            Student.getAll()
                                .then(function(data){
                                    vm.students = lodash.filter(data,{levelAdviserId:User.profile.id});
                                    if(vm.students.length>0){
                                        vm.mj = vm.students[0].majorId;
                                        vm.major = lodash.find(vm.majors,{id:vm.students[0].majorId});
                                    }
                                    else{
                                        vm.major = lodash.findLast(vm.majors);
                                        vm.mj = vm.major.id;
                                    }
                                    Level.getAll()
                                        .then(function(data){
                                            vm.levels = data;
                                            if(vm.students.length>0){
                                                vm.lvl = vm.students[0].levelId;
                                            }
                                            else{
                                                vm.level = lodash.findLast(data);
                                                vm.lvl = vm.level.id;
                                            }
                                        });
                                });
                            Hod.getAll()
                                .then(function(data){
                                    vm.hd = lodash.find(data,{departmentId:vm.lecturer.departmentId});
                                    Lecturer.getOne(vm.hd.lecturerId)
                                        .then(function(data){
                                            vm.hod = data;
                                        });
                                });

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
                                        vm.stds = data;
                                        Result.getForStudent(vm.stds.matricNo)
                                            .then(function(data){
                                                var matricNo = vm.stds.matricNo;
                                                vm.resultFail = lodash.filter(data,{grade:'F'});
                                                vm.gp = lodash.find(vm.gs,{matricNo:matricNo});
                                                var status = 0;
                                                if(vm.resultFail.length>0){
                                                    status = 2;
                                                }
                                                else{
                                                    status = 1;
                                                }
                                                Student.getOne(matricNo)
                                                    .then(function(data){
                                                        dat = {
                                                            studentId: data.id,
                                                            gp: vm.gs[j],
                                                            resultFail: vm.resultFail,
                                                            status: status
                                                        };
                                                        vm.gps.push(dat);
                                                        delete vm.gp;
                                                        j+=1;
                                                    });
                                            });
                                    });
                            }
                        });
                });
            Session.getAll()
                .then(function(data){
                    vm.sessions = data;
                    vm.session = lodash.findLast(data);
                    vm.sess = vm.session.id;
                });
            Semester.get()
                .then(function(data){
                    vm.semester = data;
                });
            vm.changeLevel = function(id){
                vm.level = lodash.find(vm.levels,{id:id});
                LevelAdviser.getAll()
                    .then(function(data){
                        vm.lvlAdviser = lodash.filter(data,{departmentId:vm.department.id,levelId:vm.level.id});
                        Lecturer.getOne(vm.lvlAdviser.lecturerId)
                            .then(function(data){
                                vm.levelAdviser = data;
                            });
                    });
            };
            vm.changeSession = function(id){
                vm.session = lodash.find(vm.sessions,{id:id});
            };
            vm.changeMajor = function(id){
                vm.major = lodash.find(vm.majors,{id:id});
            };
            vm.print = function(){
                $window.print();
            };
        });
        })();