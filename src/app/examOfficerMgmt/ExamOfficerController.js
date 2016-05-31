/**
 * Created by Bello J on 5/12/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("ExamOfficerController",function(toastr,$modal,ExamOfficer){
            var vm = this;
            vm.add = add;
            vm.remove = remove;
            ExamOfficer.getAll()
                .then(function(data){
                    vm.examOfficers = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
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
                                vm.examOfficers = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
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
                                vm.examOfficers = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();
