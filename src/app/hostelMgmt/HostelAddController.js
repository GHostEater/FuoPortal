/**
 * Created by Bello J on 6/25/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('HostelAddController',function(Hostel,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    Hostel.add(vm.name,vm.sex)
                        .then(function(){
                            toastr.success("Hostel Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Hostel");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();