/**
 * Created by GHostEater on 27-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("AddPrerequisiteController",function(Prerequisite,code,$modalInstance,Course,toastr,lodash){
            var vm = this;
            vm.addCourse = addCourse;
            vm.ok = ok;
            vm.pres = [];
            Course.getAll()
                .then(function(data){
                    vm.courses = data;
                    vm.course = lodash.find(vm.courses,{code: code});
                })
                .catch(function(){
                    toastr.warning("Could Not Connect");
                });

            function addCourse(code,pre){
                if(!lodash.find(vm.pres,{prerequisite: pre})){
                    var obj = {
                        code: code,
                        prerequisite: pre
                    };
                    vm.pres.push(obj);
                }
            }
            function ok(){
                for (var i=0; i<vm.pres.length; i++){
                    Prerequisite.add(vm.pres[i].code,vm.pres[i].prerequisite)
                        .then(function(){
                            toastr.success("Prerequisite Added");
                        })
                        .catch(function(){
                            toastr.warning("Unable to Add Prerequisite");
                        });
                }
                $modalInstance.close();
            }
        });
})();