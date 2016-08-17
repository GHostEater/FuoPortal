/**
 * Created by GHostEater on 15-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("CourseController",function(User,lodash,toastr,$modal,Course,College,Co,Prerequisite){
            var vm = this;
            vm.user = User.profile;
            vm.add = add;
            vm.edit = edit;
            vm.remove = remove;
            vm.changeStatus = changeStatus;
            vm.addPre = addPre;
            vm.removePre = removePre;
            Course.getAll()
                .then(function(data){
                    vm.cous = data;
                    if(User.profile.sysRank == 2){
                        Co.getOne(User.profile.id)
                            .then(function(data){
                                vm.courses = lodash.filter(vm.cous,{collegeId:data.collegeId});
                            });
                    }
                    else{
                        vm.courses = data;
                    }
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });
            Prerequisite.getAll()
                .then(function(data){
                    vm.pres = data;
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            function changeStatus(id,status){
                if (status == 0){
                    Prerequisite.setActive(id)
                        .then(function(){
                            Course.getAll()
                                .then(function(data){
                                    vm.courses = data;
                                })
                                .catch(function(){
                                    toastr.warning("Could Not Connect");
                                });
                            Prerequisite.getAll()
                                .then(function(data){
                                    vm.pres = data;
                                })
                                .catch(function(){
                                    toastr.warning("Could Not Connect");
                                });
                        })
                        .catch(function(){
                            toastr.warning("Unable to Change Status");
                        });
                }
                else if (status == 1){
                    Prerequisite.setInactive(id)
                        .then(function(){
                            Course.getAll()
                                .then(function(data){
                                    vm.courses = data;
                                })
                                .catch(function(){
                                    toastr.warning("Could Not Connect");
                                });
                            Prerequisite.getAll()
                                .then(function(data){
                                    vm.pres = data;
                                })
                                .catch(function(){
                                    toastr.warning("Could Not Connect");
                                });
                        })
                        .catch(function(){
                            toastr.warning("Unable to Change Status");
                        });
                }
            }
            function addPre(code){
                var options = {
                    templateUrl: 'app/courseMgmt/addPrerequisite.html',
                    controller: "AddPrerequisiteController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        code: function(){
                            return code;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Course.getAll()
                            .then(function(data){
                                vm.courses = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                        Prerequisite.getAll()
                            .then(function(data){
                                vm.pres = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect");
                            });
                    });
            }
            function removePre(id){
                Prerequisite.remove(id)
                    .then(function(){
                        toastr.success("Prerequisite Removed");
                        Course.getAll()
                            .then(function(data){
                                vm.courses = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect");
                            });
                        Prerequisite.getAll()
                            .then(function(data){
                                vm.pres = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect");
                            });
                    })
                    .catch(function(){
                        toastr.warning("Unable to Remove Prerequisite");
                    });
            }
            function add(){
                var options = {
                    templateUrl: 'app/courseMgmt/courseAdd.html',
                    controller: "CourseAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        Course.getAll()
                            .then(function(data){
                                vm.courses = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                        Prerequisite.getAll()
                            .then(function(data){
                                vm.pres = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect");
                            });
                    });
            }
            function edit(code){
                var options = {
                    templateUrl: 'app/courseMgmt/courseEdit.html',
                    controller: "CourseEditController",
                    controllerAs: 'model',
                    size: 'lg',
                    resolve:{
                        code: function(){
                            return code;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Course.getAll()
                            .then(function(data){
                                vm.courses = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                        Prerequisite.getAll()
                            .then(function(data){
                                vm.pres = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect");
                            });
                    });
            }
            function remove(code){
                var options = {
                    templateUrl: 'app/courseMgmt/courseDelete.html',
                    controller: "CourseDeleteController",
                    controllerAs: 'model',
                    size: 'sm',
                    resolve:{
                        code: function(){
                            return code;
                        }
                    }
                };
                $modal.open(options).result
                    .then(function(){
                        Course.getAll()
                            .then(function(data){
                                vm.courses = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                        Prerequisite.getAll()
                            .then(function(data){
                                vm.pres = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect");
                            });
                    });
            }
        });
})();