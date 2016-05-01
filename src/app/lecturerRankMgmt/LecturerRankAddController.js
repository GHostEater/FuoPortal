/**
 * Created by Bello J on 4/27/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('LecturerRankAddController',function(LecturerRank,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                if(vm.form.$valid){
                    LecturerRank.add(vm.rank)
                        .then(function(){
                            toastr.success("LecturerRank Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add LecturerRank");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();