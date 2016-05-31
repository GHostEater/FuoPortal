/**
 * Created by Bello J on 5/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('ExamOfficerDeleteController',function(ExamOfficer,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                ExamOfficer.remove(id)
                    .then(function(){
                        toastr.success("Exam Officer for the Department Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Exam Officer");
                    });
            };
        });
})();
