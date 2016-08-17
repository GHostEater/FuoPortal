/**
 * Created by Bello J on 6/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("AdminStudentListController",function(toastr,$modal,Student,Co,User,lodash){
            var vm = this;
            vm.user = User.profile;
            Student.getAll()
                .then(function(data){
                    vm.std = data;
                    if(User.profile.sysRank == 2){
                        Co.getOne(User.profile.id)
                            .then(function(data){
                                vm.co = data;
                                vm.students = lodash.filter(vm.std,{collegeId:vm.co.collegeId});
                            });
                    }
                    else{
                        vm.students = data;
                    }
                });
        });
})();