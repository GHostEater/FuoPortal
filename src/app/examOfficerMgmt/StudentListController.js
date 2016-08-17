/**
 * Created by Bello J on 6/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("StudentListController",function(toastr,$modal,Student,User,Lecturer,lodash){
            var vm = this;
            Lecturer.getOne(User.profile.id)
                .then(function(data){
                    vm.lecturer = data;
                    Student.getAll()
                        .then(function(data){
                            vm.students = lodash.filter(data,{departmentId:vm.lecturer.departmentId});
                        });
                });
        });
})();