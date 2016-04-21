/**
 * Created by GHostEater on 21-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller('CourseDeleteController',function(Course,code,toastr,$modalInstance){
            var vm = this;

            vm.ok = function(){
                Course.remove(code)
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