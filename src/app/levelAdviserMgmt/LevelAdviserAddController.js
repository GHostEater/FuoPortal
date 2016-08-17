/**
 * Created by Bello J on 5/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LevelAdviserAddController',function(LevelAdviser,Lecturer,User,Department,Level,toastr,$modalInstance){
            var vm = this;
            Lecturer.getAll()
                .then(function(data){
                    vm.lecturers = data;
                });
            Lecturer.getOne(User.profile.id)
                .then(function(data){
                    vm.hod = data;
                });
            Department.getAll()
                .then(function(data){
                    vm.departments = data;
                });
            Level.getAll()
                .then(function(data){
                    vm.levels = data;
                });

            vm.ok = function(){
                if(vm.form.$valid){
                    LevelAdviser.add(vm.lecturerId,vm.hod.departmentId,vm.levelId)
                        .then(function(){
                            toastr.success("Level Adviser Added");
                            $modalInstance.close();
                        })
                        .catch(function(error){
                            if(error === 401){
                                toastr.error("Lecturer as Exit as the Level Adviser");
                            }
                            else if(error === 402){
                                toastr.error("Department Already Has Level Adviser");
                            }
                            else{
                                toastr.error("Unable to Add Level Adviser");
                            }
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();