/**
 * Created by GHostEater on 23-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("MyCoursesController",function(Allocation,User,toastr){
            var vm = this;
            Allocation.getMyCourses(User.profile.id)
                .then(function(data){
                    vm.allocations = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
        });
})();