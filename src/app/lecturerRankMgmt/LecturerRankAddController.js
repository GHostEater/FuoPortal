/**
 * Created by GHostEater on 29-Apr-16.
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
                            toastr.success("Lecturer Rank Added");
                            $modalInstance.close();
                        })
                        .catch(function(){
                            toastr.error("Unable to Add Lecturer Rank");
                        });
                }
                else{
                    toastr.error("Errors in form");
                }
            };
        });
})();