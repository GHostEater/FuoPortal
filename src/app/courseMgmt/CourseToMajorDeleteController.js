/**
 * Created by GHostEater on 05-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CourseToMajorDeleteController',function(CourseReg,id,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                CourseReg.removeCourseFromMajor(id)
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