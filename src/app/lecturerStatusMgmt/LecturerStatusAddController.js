/**
 * Created by GHostEater on 29-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LecturerStatusAddController',function(LecturerStatus,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    LecturerStatus.add(vm.status)
                        .then(function(){
                            toastr.success("Lecturer Status Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Lecturer Status");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();