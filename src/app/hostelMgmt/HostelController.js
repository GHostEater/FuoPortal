/**
 * Created by Bello J on 6/25/2016.
 */
angular.module("fuoPortal")
.controller("HostelController",function(Hostel,$modal){
        var vm = this;
        vm.add = add;
        vm.edit = edit;
        vm.remove = remove;
        Hostel.getAll()
            .then(function(data){
                vm.hostels = data;
            });
        
        function add(){
            var options = {
                templateUrl: 'app/hostelMgmt/hostelAdd.html',
                controller: "HostelAddController",
                controllerAs: 'model',
                size: 'lg'
            };
            $modal.open(options).result
                .then(function(){
                    Hostel.getAll()
                        .then(function(data){
                            vm.hostels = data;
                        });
                });
        }
        function edit(id){
            var options = {
                templateUrl: 'app/hostelMgmt/hostelEdit.html',
                controller: "HostelEditController",
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
                    Hostel.getAll()
                        .then(function(data){
                            vm.hostels = data;
                        });
                });
        }
        function remove(id){
            var options = {
                templateUrl: 'app/hostelMgmt/hostelDelete.html',
                controller: "HostelDeleteController",
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
                    Hostel.getAll()
                        .then(function(data){
                            vm.hostels = data;
                        });
                });
        }
    });