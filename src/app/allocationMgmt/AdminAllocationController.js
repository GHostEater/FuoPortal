/**
 * Created by Bello J on 6/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("AdminAllocationController",function(Allocation,Lecturer,Session,College,Department,Semester,Hod,lodash,User){
            var vm = this;
            vm.user = User.profile;
            Allocation.getAll()
                .then(function(data){
                    vm.allocations = data;
                });
            Session.getAll()
                .then(function(data){
                    vm.sessions = data;
                    vm.session = lodash.findLast(data);
                    vm.sess = vm.session.id;
                });
            Semester.get()
                .then(function(data){
                    vm.semester = data;
                });
            Department.getAll()
                .then(function(data){
                    vm.departments = data;
                });
            College.getAll()
                .then(function(data){
                    vm.colleges = data;
                });
            vm.changeSession = function(id){
                vm.session = lodash.find(vm.sessions,{id:id});
            };
            vm.changeDepartment = function(id){
                vm.department = lodash.find(vm.departments,{id:id});
                Hod.getAll()
                    .then(function(data){
                        vm.hod = lodash.find(data,{departmentId:vm.department.id});
                        Lecturer.getOne(vm.hod.lecturerId)
                            .then(function(data){

                            });
                    });
            };
            vm.changeCollege = function(id){
                vm.college = lodash.find(vm.colleges,{id:id});
            };
        });
})();