/**
 * Created by GHostEater on 23-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("HodAllocationController",function(Allocation,Lecturer,Session,Semester,lodash,User,toastr,$modal,$window){
            var vm = this;
            vm.user = User.profile;
            vm.allocate = allocate;
            vm.remove = remove;
            Allocation.getMyAllocations(User.profile.id)
                .then(function(data){
                    vm.allocations = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Lecturer.getOne(User.profile.id)
                .then(function(data){
                    vm.lecturer = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            function allocate(){
                var options = {
                    templateUrl: 'app/allocationMgmt/allocate.html',
                    controller: "AllocateController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        Allocation.getMyAllocations(User.profile.id)
                            .then(function(data){
                                vm.allocations = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(id){
                var options = {
                    templateUrl: 'app/allocationMgmt/allocationDelete.html',
                    controller: "AllocationDeleteController",
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
                        Allocation.getMyAllocations(User.profile.id)
                            .then(function(data){
                                vm.allocations = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            Session.getAll()
                .then(function(data){
                    vm.sessions = data;
                    vm.session = lodash.findLast(data);
                    vm.sess = vm.session.id;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Semester.get()
                .then(function(data){
                    vm.semester = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            vm.changeSession = function(id){
                vm.session = lodash.find(vm.sessions,{id:id});
            };
            vm.print = function(){
                $window.print();
            };
        });
})();