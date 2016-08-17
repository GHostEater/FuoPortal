/**
 * Created by Bello J on 6/11/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CourseRegistrationDeleteController',function(CourseReg,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                CourseReg.remove(id)
                    .then(function(){
                        toastr.success("Course Removed");
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Unable to Remove Course");
                    });
            };
        });
})();