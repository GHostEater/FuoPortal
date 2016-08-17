/**
 * Created by Bello J on 5/24/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("ResultBroadSheetController",function(User,Lecturer,Hod,LevelAdviser,Result,CourseReg,Level,Major,Student,Department,College,Session,Semester,Waving,lodash,toastr){
            var vm = this;
            vm.outstandings = [];
            vm.fails = [];
            vm.user = User.profile;
            Lecturer.getOne(User.profile.id)
                .then(function(data){
                    vm.lecturer = data;
                    Major.getAll()
                        .then(function(data){
                            vm.majors = lodash.filter(data,{departmentId:vm.lecturer.departmentId});
                            Student.getAll()
                                .then(function(data){
                                    vm.students = lodash.filter(data,{levelAdviserId:vm.lecturer.id});
                                    if(vm.students.length>0){
                                        vm.mj = vm.students[0].majorId;
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
                            var z = 0;
                            vm.gs = lodash.filter(data,{departmentId:vm.lecturer.departmentId});
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
                                                CourseReg.getCourses()
                                                    .then(function(data){
                                                        vm.courses = lodash.filter(data,{majorId:vm.s.majorId});
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
            vm.changeSession = function(id){
                vm.session = lodash.find(vm.sessions,{id:id});
            };
            vm.changeLevel = function(id){
                vm.level = lodash.find(vm.levels,{id:id});
                LevelAdviser.getAll()
                    .then(function(data){
                        vm.lvlAdviser = lodash.filter(data,{departmentId:vm.lecturer.departmentId,levelId:vm.level.id});
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
        });
})();