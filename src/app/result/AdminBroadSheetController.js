/**
 * Created by Bello J on 6/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("AdminBroadSheetController",function(User,Hod,Co,Lecturer,LevelAdviser,Department,College,Result,Level,Major,Student,Session,Semester,lodash,$window){
            var vm = this;
            vm.user = User.profile;
            Result.getAllGP()
                .then(function(data){
                    vm.gps = [];
                    var dat = {};
                    var j = 0;
                    vm.gs = data;
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
            Level.getAll()
                .then(function(data){
                    vm.levels = data;
                });
            Department.getAll()
                .then(function(data){
                    vm.depts = data;
                    if(User.profile.sysRank == 2){
                        Co.getOne(User.profile.id)
                            .then(function(data){
                                vm.departments = lodash.filter(vm.depts,{collegeId:data.collegeId});
                            });
                    }
                    else{
                        vm.departments = data;
                    }
                }
                );
            College.getAll()
                .then(function(data){
                    vm.colls = data;
                    vm.colleges = data;
                    if(User.profile.sysRank == 2){
                        Co.getOne(User.profile.id)
                            .then(function(data){
                                //vm.coll = data.collegeId;
                                vm.college = lodash.find(vm.colleges,{id:data.collegeId});
                            });
                    }
                });
            Major.getAll()
                .then(function(data){
                    vm.mjs = data;
                    vm.majors = data;
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
            vm.changeDepartment = function(id){
                vm.department = lodash.find(vm.departments,{id:id});
                vm.majors = lodash.filter(vm.mjs,{departmentId:vm.department.id});
                Hod.getAll()
                    .then(function(data){
                        vm.hd = lodash.find(data,{departmentId:vm.department.id});
                        Lecturer.getOne(vm.hd.lecturerId)
                            .then(function(data){
                                vm.hod = data;
                            });
                    });
            };
            vm.changeCollege = function(id){
                vm.college = lodash.find(vm.colleges,{id:id});
                vm.departments = lodash.filter(vm.depts,{collegeId:vm.college.id});
            };
            vm.print = function(){
                $window.print();
            };
        });
})();