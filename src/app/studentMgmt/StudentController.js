/**
 * Created by Bello J on 4/21/2016.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("StudentController",function(toastr,$modal,Student,Co,User,Session,lodash){
            var vm = this;
            vm.user = User.profile;
            vm.view = view;
            vm.add = add;
            vm.uploadImg = uploadImg;
            vm.uploadStudents = uploadStudents;
            vm.edit = edit;
            vm.remove = remove;
            Session.getAll()
                .then(function(data){
                    vm.session = lodash.findLast(data);
                });
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

            function view(matricNo){
                var options = {
                    templateUrl: 'app/studentMgmt/studentView.html',
                    controller: "StudentViewController",
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
            function uploadStudents(){
                for(var i=0; i<vm.std.data.length-1; i++){
                    var data = {
                        matricNo: vm.std.data[i][0],
                        dateBirth: vm.std.data[i][1],
                        password: vm.std.data[i][2],
                        collegeId: vm.std.data[i][3],
                        departmentId: vm.std.data[i][4],
                        majorId: vm.std.data[i][5],
                        levelId: vm.std.data[i][6],
                        modeOfEntryId: vm.std.data[i][7]
                    };
                    Student.add(data.matricNo,data.firstName,data.middleName,data.lastName,data.sex,data.email,data.phoneNumber,
                        data.dateBirth,data.nationality,data.stateOrigin,data.lga,data.religion,data.address,data.nextOfKin,
                        data.nextOfKinAddress,data.collegeId,data.departmentId,data.majorId,data.levelId,data.modeOfEntryId,
                        vm.session.session,data.password,0,data.town,data.genotype,data.bloodGroup,data.oLevel,data.parentNo)
                        .then(function(){
                            toastr.success("Student Added");
                        });
                }
            }
            function add(){
                var options = {
                    templateUrl: 'app/studentMgmt/studentAdd.html',
                    controller: "StudentAddController",
                    controllerAs: 'model',
                    size: 'lg'
                };
                $modal.open(options).result
                    .then(function(){
                        Student.getAll()
                            .then(function(data){
                                vm.students = data;
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function edit(matricNo){
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
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function uploadImg(matricNo){
                var options = {
                    templateUrl: 'app/studentMgmt/studentUploadImg.html',
                    controller: "StudentUploadImgController",
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
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
            function remove(matricNo){
                var options = {
                    templateUrl: 'app/studentMgmt/studentDelete.html',
                    controller: "StudentDeleteController",
                    controllerAs: 'model',
                    size: 'sm',
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
                            })
                            .catch(function(){
                                toastr.warning("Could Not Connect To Server");
                            });
                    });
            }
        });
})();