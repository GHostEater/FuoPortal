/**
 * Created by GHostEater on 07-Jun-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("LevelAdviserController", function(toastr,$modal,LevelAdviser,Lecturer,lodash,User){
            var vm = this;
            vm.add = add;
            vm.remove = remove;
            Lecturer.getOne(User.profile.id)
                .then(function(data){
                    vm.lecturer = data;
                    LevelAdviser.getAll()
                        .then(function(data){
                            vm.levelAdvisers = lodash.filter(data,{departmentId:vm.lecturer.departmentId})
                        });
                });

            function add(){
                var options = {
                    templateUrl: 'app/levelAdviserMgmt/levelAdviserAdd.html',
                    controller: "LevelAdviserAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        LevelAdviser.getAll()
                            .then(function(data){
                                vm.levelAdvisers = lodash.filter(data,{departmentId:vm.lecturer.departmentId})
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/levelAdviserMgmt/levelAdviserDelete.html',
                    controller: "LevelAdviserDeleteController",
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
                        LevelAdviser.getAll()
                            .then(function(data){
                                vm.levelAdvisers = lodash.filter(data,{departmentId:vm.lecturer.departmentId})
                            });
                    });
            }
        });
})();