/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('StudentDeleteController',function(Student,matricNo,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                Course.remove(matricNo)
                    .then(function(){
                        toastr.success("Student Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Student");
                    });
            };
        });
})();