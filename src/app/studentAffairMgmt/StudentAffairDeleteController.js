/**
 * Created by Bello J on 6/24/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('StudentAffairDeleteController',function(StudentAffair,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                StudentAffair.remove(id)
                    .then(function(){
                        toastr.success("Student Affair Officer Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Student Affair Officer");
                    });
            };
        });
})();