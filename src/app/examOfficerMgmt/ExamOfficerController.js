/**
 * Created by Bello J on 5/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("ExamOfficerController",function(toastr,$modal,ExamOfficer,Lecturer,lodash,User){
            var vm = this;
            vm.add = add;
            vm.remove = remove;
            Lecturer.getOne(User.profile.id)
                .then(function(data){
                    vm.lecturer = data;
                    ExamOfficer.getAll()
                        .then(function(data){
                            vm.examOfficers = lodash.filter(data,{departmentId:vm.lecturer.departmentId})
                        });
                });

            function add(){
                var options = {
                    templateUrl: 'app/examOfficerMgmt/examOfficerAdd.html',
                    controller: "ExamOfficerAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        ExamOfficer.getAll()
                            .then(function(data){
                                vm.examOfficers = lodash.filter(data,{departmentId:vm.lecturer.departmentId})
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/examOfficerMgmt/examOfficerDelete.html',
                    controller: "ExamOfficerDeleteController",
                    controllerAs: 'model',
                    size: 'sm',
                    resolve:{
                        id: function(){
                            return id;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        ExamOfficer.getAll()
                            .then(function(data){
                                vm.examOfficers = lodash.filter(data,{departmentId:vm.lecturer.departmentId})
                            });
                    });
            }
        });
})();
