/**
 * Created by GHostEater on 11-Apr-16.
 */
(function () {
    'use strict';
    angular.module('fuoPortal')
        .controller("StudentUploadImgController",function($upload,Host,matricNo,toastr,$modalInstance){
            var vm = this;
            vm.ok = ok;

            function ok(){
                $upload.upload({
                    url: Host.host+'/student/uploadImg.php',
                    headers: {'Content-Type': vm.file.type},
                    method: 'POST',
                    file: vm.file,
                    fields: {
                        matricNo: matricNo
                    }
                })
                    .then(function(){
                        toastr.success('Photo Uploaded');
                        $modalInstance.close();
                    })
                    .catch(function(){
                        toastr.error("Could Not Upload Photo");
                    });
            }
        });
})();