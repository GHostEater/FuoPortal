/**
 * Created by Bello J on 5/25/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('EditExamController',function(Result,AcademicAffair,User,toastr,id,$modalInstance){
            var vm = this;
            Result.getOne(id)
                .then(function(data){
                    vm.result = data;
                    vm.prevScore = vm.result.exam;
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Result.editExam(vm.result.id,vm.result.exam)
                        .then(function(){
                            toastr.success("Exam Changed");
                            var date = new Date();
                            AcademicAffair.logEdit(vm.result.id,'Exam',vm.prevScore,vm.result.exam,date,User.profile.id)
                                .then(function(){
                                    toastr.success('Edit Logged');
                                    $modalInstance.close();
                                })
                                .catch(function(){
                                    toastr.error('Unable to Log Edit... Try Again');
                                });
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Exam");
                        });
                }
                else if(vm.form.$pristine && vm.form.$valid){
                    toastr.info("No Changes");
                    $modalInstance.close();
                }
                else if(vm.form.$invalid){
                    toastr.error("Errors in form");
                }
            };
        });
})();