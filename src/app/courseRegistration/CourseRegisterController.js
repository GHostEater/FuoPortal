/**
 * Created by GHostEater on 01-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("CourseRegisterController",function(Student,User,CourseReg,Session,Semester,toastr,lodash){
            var vm = this;
            vm.addCourse = addCourse;
            vm.removeCourse = removeCourse;
            vm.submitCourseForm = submitCourseForm;
            vm.regs = [];
            vm.counter = 0;
            Student.getOne(User.profile.id)
                .then(function(data){
                    vm.student = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            CourseReg.getCourses()
                .then(function(data){
                    vm.courses = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
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

            function addCourse(code,unit,matricNo,levelId,semesterId,sessionId){
                var course = {
                    code: code,
                    unit: unit,
                    matricNo: matricNo,
                    levelId: levelId,
                    semesterId: semesterId,
                    sessionId: sessionId
                };
                vm.counter += Number(unit);
                if(!lodash.find(vm.regs,{code:code}) && vm.counter < 24){
                    vm.regs.push(course);
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
            function removeCourse(code,unit){
                if(lodash.find(vm.regs,{code:code})){
                    lodash.remove(vm.regs,{code:code});
                    vm.counter -= Number(unit);
                }
                else{
                    toastr.warning("Course not Previously Added");
                }
            }
            function submitCourseForm(){
                if(vm.counter >= 15 && vm.counter <= 24){
                    for(var i=0; i < vm.regs.length; i++){
                        CourseReg.registerCourse(vm.regs[i].code,vm.regs[i].matricNo,vm.regs[i].levelId,vm.regs[i].semesterId,vm.regs[i].sessionId)
                            .then(function(){})
                            .catch(function(){toastr.error("Unable to Register Course");});
                    }
                }
            }
        });
})();