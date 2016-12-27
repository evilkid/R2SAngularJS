(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(auth, $state) {

        var vm = this;
        // Data
        vm.message = null;
        vm.form = {};
        vm.form.username = "";
        vm.form.password = "";
        // Methods

        vm.login = login;

        //////////

        function login() {
            auth.login(vm.form.username, vm.form.password).then(
                function handleSuccess(response) {
                    console.log("Success", response);

                    $state.go("app.sample");
                },
                function handleError(response) {
                    if (response.status == 404) {
                        vm.message = "Username/Password Incorrect";
                    } else if (response.status == 500) {
                        vm.message = "Internal Server Error, Please try again later";
                    } else {
                        vm.message = "Unknown Error";
                    }
                    console.log("Error", response);
                });
        }

    }
})();
