/**
 * Created by GHostEater on 15-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("HomeController",function(User,Student,AcademicAffair,$modal){
            var vm = this;
            vm.user = User.profile;
            vm.studentEdit = studentEdit;
            vm.process = process;
            vm.disable = disable;
            if(User.profile.sysRank == 5){
                Student.getOne(User.profile.id)
                    .then(function(data){
                        vm.student = data;
                    });
            }
            if(User.profile.sysRank == 6){
                AcademicAffair.getRequests()
                    .then(function(data){
                        vm.requests = data;
                    });
            }
            function studentEdit(matricNo){
                var options = {
                    templateUrl: 'app/studentMgmt/studentEdit.html',
                    controller: "StudentEditController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        matricNo: function(){
                            return matricNo;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Student.getAll()
                            .then(function(data){
                                vm.students = data;
                            });
                    });
            }
            function process(id,status,handledBy){
                var options = {
                    templateUrl: 'app/academicAffairMgmt/processRequest.html',
                    controller: "ProcessRequestController",
                    controllerAs: 'model',
                    size: 'sm',
                    resolve:{
                        id: function(){
                            return id;
                        },
                        status: function(){
                            return status;
                        },
                        handledBy: function(){
                            return handledBy;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        AcademicAffair.getRequests()
                            .then(function(data){
                                vm.requests = data;
                            });
                    });
            }
            function disable(id){
                var options = {
                    templateUrl: 'app/academicAffairMgmt/disableEdit.html',
                    controller: "DisableEditController",
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
                        AcademicAffair.getRequests()
                            .then(function(data){
                                vm.requests = data;
                            });
                    });
            }
        });
})();