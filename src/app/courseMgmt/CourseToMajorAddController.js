/**
 * Created by GHostEater on 05-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CourseToMajorAddController',function(Course,CourseReg,toastr,lodash,majorId,Major,$modalInstance){
            var vm = this;
            vm.courseSelect = 0;
            vm.selectCourse = selectCourse;
            vm.deSelectCourse = deSelectCourse;
            Course.getAll()
                .then(function(data){
                    vm.courses = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Major.getOne(majorId)
                .then(function(data){
                    vm.major = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            function selectCourse(code){
                vm.cours = lodash.find(vm.courses,{code:code});
                vm.courseSelect = 1;
            }
            function deSelectCourse(){
                delete vm.cours;
                vm.courseSelect = 0;
            }

            vm.ok = function(){
                if(vm.form.$valid){
                    CourseReg.addCourseToMajor(vm.cours.code,majorId,vm.cours.levelId)
                        .then(function(){
                            toastr.success("Course Added");
                            $modalInstance.close();
                        })
                        .catch(function(error){
                            if(error === 401){
                                toastr.error("Courses Already Added");
                            }
                            else{
                                toastr.error("Unable to Add Course");
                            }
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();