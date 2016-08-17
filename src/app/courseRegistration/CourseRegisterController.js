/**
 * Created by GHostEater on 01-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("CourseRegisterController",function(Student,User,CourseReg,College,Session,Waving,Semester,Result,$location,toastr,lodash){
            var vm = this;
            vm.addCourse = addCourse;
            vm.removeCourse = removeCourse;
            vm.submitCourseForm = submitCourseForm;
            vm.regs = [];
            vm.outstandings = [];
            vm.counter = 0;
            Student.getOne(User.profile.id)
                .then(function(data){
                    vm.student = data;
                    Semester.get()
                        .then(function(data){
                            vm.semester = data;
                            Session.getAll()
                                .then(function(data){
                                    vm.session = lodash.findLast(data);
                                    CourseReg.getRegisterredCourses(vm.student.matricNo,vm.semester.semester,vm.session.id)
                                        .then(function(data){
                                            vm.registerredCourses = data;
                                            Result.getForStudent(vm.student.matricNo)
                                                .then(function(data){
                                                    vm.result = data;
                                                    vm.resultLast = lodash.findLast(data);
                                                    vm.resultFail = lodash.filter(data,{grade:'F'});
                                                    CourseReg.getCourses()
                                                        .then(function(data){
                                                            vm.courses = lodash.filter(data,{majorId:vm.student.majorId});
                                                            vm.cous = lodash.filter(data,{majorId:vm.student.majorId});
                                                            Waving.getAll()
                                                                .then(function(data){
                                                                    vm.wavings = lodash.filter(data,{matricNo:vm.student.matricNo});
                                                                    for(var j=0; j<vm.resultFail.length; j++){
                                                                        if(lodash.find(vm.courses,{code:vm.resultFail[j].code})){
                                                                            if(!lodash.find(vm.result,{code:vm.resultFail[j].code,statusId:'1'})
                                                                                && !lodash.find(vm.wavings,{code:vm.resultFail[j].code})){
                                                                                vm.course = lodash.find(vm.courses,{code:vm.resultFail[j].code});
                                                                                vm.outstandings.push(vm.course);
                                                                            }
                                                                        }
                                                                    }
                                                                    if(vm.student.level == 100 && vm.semester.semester == 1){
                                                                        vm.outstandings = [];
                                                                    }
                                                                    else if(vm.student.modeOfEntryId == 2 && vm.student.level == 200 && vm.semester.semester == 1){
                                                                        for(var k=0; k<vm.courses.length; k++){
                                                                            if(!lodash.find(vm.wavings,{code:vm.courses[k].code}) && vm.courses[k].semester == vm.semester.semester){
                                                                                if(vm.courses[k].levelId < vm.student.levelId){
                                                                                    vm.outstandings.push(vm.courses[k]);
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    else if(vm.student.modeOfEntryId == 3 && vm.student.level == 300 && vm.semester.semester == 1){
                                                                        for(var l=0; l<vm.courses.length; l++){
                                                                            if(!lodash.find(vm.wavings,{code:vm.courses[l].code}) && vm.courses[l].semester == vm.semester.semester){
                                                                                if(vm.courses[l].levelId < vm.student.levelId){
                                                                                    vm.outstandings.push(vm.courses[l]);
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    else{
                                                                        CourseReg.getRegisterredCourses(vm.student.matricNo,vm.resultLast.semester,vm.resultLast.sessionId)
                                                                            .then(function(data){
                                                                                vm.registerredCourses = data;
                                                                                for(var m=0; m<vm.courses.length; m++){
                                                                                    if(!lodash.find(vm.registerredCourses,{code:vm.courses[m].code})
                                                                                        && !lodash.find(vm.wavings,{code:vm.courses[m].code})
                                                                                        && vm.courses[m].levelId <= vm.student.levelId
                                                                                        && vm.courses[m].semester == vm.semester.semester){
                                                                                        vm.outstandings.push(vm.courses[m]);
                                                                                    }
                                                                                }
                                                                            });
                                                                    }
                                                                });
                                                        });
                                                });
                                        });
                                });
                        });
                });
            College.getAll()
                .then(function(data){
                    vm.colleges = data;
                });

            function addCourse(code,unit,matricNo,levelId,semester,sessionId,from){
                var course = {
                    code: code,
                    unit: unit,
                    matricNo: matricNo,
                    levelId: levelId,
                    semester: semester,
                    sessionId: sessionId,
                    status: 0,
                    from: from
                };
                vm.counter += Number(unit);
                if(!lodash.find(vm.regs,{code:code}) && vm.counter <= 24){
                    vm.regs.push(course);
                    if(from == 0){
                        lodash.remove(vm.courses,{code:code});
                    }
                    else if(from == 1){
                        lodash.remove(vm.outstandings,{code:code});
                    }
                }
                else if(lodash.find(vm.regs,{code:code})){
                    toastr.warning("Course Already Added");
                    vm.counter -= Number(unit);
                }
                else{
                    toastr.warning("Total Number of Units Exceeded");
                    vm.counter -= Number(unit);
                }
            }
            function removeCourse(code,unit,from){
                if(lodash.find(vm.regs,{code:code})){
                    lodash.remove(vm.regs,{code:code});
                    vm.counter -= Number(unit);
                    vm.course = lodash.find(vm.cous,{code:code});
                    if(from == 0){
                        vm.courses.push(vm.course);
                    }
                    else if(from == 1){
                        vm.outstandings.push(vm.course);
                    }
                }
                else{
                    toastr.warning("Course not Previously Added");
                }
            }
            function submitCourseForm(){
                if(vm.counter >= 15 && vm.counter <= 24){
                    for(var i=0; i < vm.regs.length; i++){
                        CourseReg.registerCourse(vm.regs[i].code,vm.regs[i].matricNo,vm.regs[i].levelId,vm.regs[i].semester,vm.regs[i].sessionId)
                            .then(function(){
                                toastr.success('Course Registerred');
                            })
                            .catch(function(){toastr.error("Unable to Register Course");});
                    }
                    $location.url('/student/courseSlip');
                }
            }
        });
})();