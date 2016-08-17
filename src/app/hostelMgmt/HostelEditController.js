/**
 * Created by Bello J on 6/25/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('HostelEditController',function(Hostel,toastr,id,$modalInstance){
            var vm = this;
            Hostel.getOne(id)
                .then(function(data){
                    vm.hostel = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    Hostel.edit(vm.hostel.id,vm.hostel.name,vm.hostel.sex)
                        .then(function(){
                            toastr.success("Hostel Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change Hostel");
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