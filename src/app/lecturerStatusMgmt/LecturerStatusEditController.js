/**
 * Created by GHostEater on 29-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LecturerStatusEditController',function(LecturerStatus,toastr,id,$modalInstance){
            var vm = this;
            LecturerStatus.getOne(id)
                .then(function(data){
                    vm.lecturerStatus = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    LecturerStatus.edit(id,vm.lecturerStatus.status)
                        .then(function(){
                            toastr.success("Lecturer Status Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Lecturer Status");
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