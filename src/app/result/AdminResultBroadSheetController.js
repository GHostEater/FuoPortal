/**
 * Created by Bello J on 6/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("AdminResultBroadSheetController",function(User,CourseReg,Co,Lecturer,Hod,LevelAdviser,Result,Level,Major,Student,Department,College,Session,Semester,Waving,lodash){
            var vm = this;
            vm.outstandings = [];
            vm.fails = [];
            vm.user = User.profile;
            Result.getAllGP()
                .then(function(data){
                    vm.gps = [];
                    var dat = {};
                    var z = 0;
                    vm.gs = data;
                    for(var i=0; i<vm.gs.length; i++){
                        delete vm.gp;
                        vm.outstandings = [];
                        vm.fails = [];
                        Student.getOne(vm.gs[i].matricNo)
                            .then(function(data){
                                vm.s = data;
                                Result.getForStudent(vm.s.matricNo)
                                    .then(function(data){
                                        vm.result = data;
                                        vm.resultFail = lodash.filter(data,{grade:'F'});
                                        Waving.getAll()
                                            .then(function(data){
                                                vm.wavings = lodash.filter(data,{matricNo:vm.s.matricNo});
                                                for(var j=0; j<vm.resultFail.length; j++){
                                                    if(lodash.find(vm.courses,{code:vm.resultFail[j].code})){
                                                        if(!lodash.find(vm.result,{code:vm.resultFail[j].code,statusId:'1'})
                                                            && !lodash.find(vm.wavings,{code:vm.resultFail[j].code})){
                                                            vm.course = lodash.find(vm.courses,{code:vm.resultFail[j].code});
                                                            vm.fails.push(vm.course);
                                                        }
                                                    }
                                                }
                                                CourseReg.getRegisterredCourses(vm.s.matricNo,vm.result[z].semester,vm.result[z].sessionId)
                                                    .then(function(data){
                                                        vm.registerredCourses = data;
                                                        for(var k=0; k<vm.courses.length; k++){
                                                            if(!lodash.find(vm.registerredCourses,{code:vm.courses[k].code})
                                                                && !lodash.find(vm.wavings,{code:vm.courses[k].code})
                                                                && Number(vm.courses[k].level) <= Number(vm.s.level)
                                                                && vm.courses[k].semester == vm.semester.semester){
                                                                vm.outstandings.push(vm.courses[k]);
                                                            }
                                                        }
                                                    });
                                            });
                                        vm.gp = lodash.find(vm.gs,{matricNo:vm.s.matricNo});
                                        var status = 0;
                                        if(vm.fails.length>0){
                                            status = 2;
                                        }
                                        else{
                                            status = 1;
                                        }

                                        if(vm.outstandings.length>0){
                                            status = 2;
                                        }
                                        else{
                                            status = 1;
                                        }
                                        dat = {
                                            info: vm.s,
                                            gp: vm.gs[z],
                                            fails: vm.fails,
                                            outstandings: vm.outstandings,
                                            result: vm.result,
                                            status: status
                                        };
                                        vm.gps.push(dat);
                                        z+=1;
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
                });
            College.getAll()
                .then(function(data){
                    vm.colleges = data;
                    if(User.profile.sysRank == 2){
                        Co.getOne(User.profile.id)
                            .then(function(data){
                                vm.coll = data.collegeId;
                            });
                    }
                });
            Major.getAll()
                .then(function(data){
                    vm.mjs = data;
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
        });
})();