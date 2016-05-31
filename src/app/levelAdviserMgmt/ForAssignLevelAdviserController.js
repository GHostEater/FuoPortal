/**
 * Created by Bello J on 5/17/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('ForAssignLevelAdviserController',function(id,User,Student,Lecturer,LevelAdviser,toastr,lodash,$modalInstance){
            var vm = this;
            LevelAdviser.getOne(id)
                .then(function(data){
                    vm.lecturer = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Student.getAll()
                .then(function(data){
                    vm.students = lodash.filter(data,{departmentId:vm.lecturer.departmentId,levelId:vm.lecturer.levelId})
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                for(var i=0; i<vm.students.length; i++){
                    LevelAdviser.assignStudent(vm.lecturer.lecturerId,vm.students[i].matricNo)
                        .then(function(){
                            toastr.success("Student Assigned");
                            $modalInstance.close();
                        })
                        .catch(function(error){
                            if(error === 401){
                                toastr.error("Student Already Assigned");
                            }
                            else{
                                toastr.error("Unable to Assign Student to Level Adviser");
                            }
                        });
                }
            };
        });
})();