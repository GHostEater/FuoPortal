/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('AllocateController',function(Allocation,toastr,$modalInstance,lodash,User,Lecturer,Session,Semester){
            var vm = this;
            vm.lecturerSelect = 0;
            vm.selectLecturer = selectLecturer;
            vm.deSelectLecturer = deSelectLecturer;
            Lecturer.getAll()
                .then(function(data){
                    vm.lecturers = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Lecturer.getOne(User.profile.id)
                .then(function(data){
                    vm.profile = data;
                    Allocation.getCourses(vm.profile.departmentId)
                        .then(function(data){
                            vm.courses = data;
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

            function selectLecturer(id){
                Lecturer.getOne(id)
                    .then(function(data){
                        vm.lecturer = data;
                        vm.lecturerSelect = 1;
                    })
                    .catch(function(){
                        toastr.warning("Could Not Connect");
                    })
            }
            function deSelectLecturer(){
                delete vm.lecturer;
                vm.lecturerSelect = 0;
            }
            vm.ok = function(){
                if(vm.form.$valid){
                    if(vm.position == 1){
                        Allocation.allocateCoordinator(vm.lecturer.id,vm.code,User.profile.id,
                            vm.semester.semester,vm.session.id,vm.position,vm.profile.departmentId,vm.profile.collegeId)
                            .then(function(){
                                toastr.success("Course Allocated");
                                $modalInstance.close();
                            })
                            .catch(function(){
                                toastr.error("Course Already Has Coordinator");
                            });
                    }
                    else if(vm.position == 2){
                        Allocation.allocateAssisting(vm.lecturer.id,vm.code,User.profile.id,
                            vm.semester.semester,vm.session.id,vm.position,vm.profile.departmentId,vm.profile.collegeId)
                            .then(function(){
                                toastr.success("Course Allocated");
                                $modalInstance.close();
                            })
                            .catch(function(){
                                toastr.error("Unable to Allocate Course");
                            });
                    }
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();