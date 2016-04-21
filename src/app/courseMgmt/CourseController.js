/**
 * Created by GHostEater on 15-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("CourseController",function(toastr,Course){
            var vm = this;
            vm.edit = edit;
            Course.getAll()
                .then(function(data){
                    vm.courses = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
        });
})();