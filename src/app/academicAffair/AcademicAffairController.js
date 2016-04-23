/**
 * Created by Bello J on 4/22/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("AcademicAffairController",function(toastr,$modal,AcademicAffair){
            var vm = this;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            AcademicAffair.getAll()
                .then(function(data){
                    vm.academicAffairs = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function add(){
                var options = {
                    templateUrl: 'app/academicAffairMgmt/academicAffairAdd.html',
                    controller: "AcademicAffairAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        AcademicAffair.getAll()
                            .then(function(data){
                                vm.academicAffairs = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(id){
                var options = {
                    templateUrl: 'app/academicAffairMgmt/academicAffairEdit.html',
                    controller: "AcademicAffairEditController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        id: function(){
                            return id;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        AcademicAffair.getAll()
                            .then(function(data){
                                vm.academicAffairs = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/academicAffairMgmt/academicAffairDelete.html',
                    controller: "AcademicAffairDeleteController",
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
                        AcademicAffair.getAll()
                            .then(function(data){
                                vm.academicAffairs = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();