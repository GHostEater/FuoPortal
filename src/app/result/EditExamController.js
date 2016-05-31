/**
 * Created by Bello J on 5/25/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('EditExamController',function(Result,toastr,id,$modalInstance){
            var vm = this;
            Result.getOne(id)
                .then(function(data){
                    vm.result = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Result.editExam(vm.result.id,vm.result.exam)
                        .then(function(){
                            toastr.success("Exam Changed");
                            $modalInstance.close();
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