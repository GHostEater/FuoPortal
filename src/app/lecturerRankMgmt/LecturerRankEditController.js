/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LecturerRankEditController',function(LecturerRank,toastr,id,$modalInstance){
            var vm = this;
            LecturerRank.getOne(id)
                .then(function(data){
                    vm.lecturerRanks = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            vm.ok = function(){
                if(vm.form.$dirty && vm.form.$valid){
                    LecturerRank.edit(vm.lecturerRank.id,vm.lecturerRank.rank)
                        .then(function(){
                            toastr.success("LecturerRank Changed");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Change LecturerRank");
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
})()