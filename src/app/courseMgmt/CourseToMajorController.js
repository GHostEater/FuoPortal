/**
 * Created by GHostEater on 05-May-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("CourseToMajorController",function(CourseReg,Level,Department,Major,toastr,$modal,lodash){
            var vm = this;
            vm.majorSelect = majorSelect;
            vm.add = add;
            vm.remove = remove;
            Department.getAll()
                .then(function(data){
                    vm.departments = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Major.getAll()
                .then(function(data){
                    vm.majors = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            CourseReg.getCourses()
                .then(function(data){
                    vm.courses = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Level.getAll()
                .then(function(data){
                    vm.levels = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            function majorSelect(majorId,name){
                vm.majorId = majorId;
                vm.name = name;
            }
            function add(majorId){
                var options = {
                    templateUrl: 'app/courseMgmt/courseToMajorAdd.html',
                    controller: "CourseToMajorAddController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        majorId: function(){
                            return majorId;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        CourseReg.getCourses()
                            .then(function(data){
                                vm.courses = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/courseMgmt/courseToMajorDelete.html',
                    controller: "CourseToMajorDeleteController",
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
                        CourseReg.getCourses()
                            .then(function(data){
                                vm.courses = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();