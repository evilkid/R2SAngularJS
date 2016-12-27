(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController(auth) {
        var vm = this;

        var currentUser = auth.currentUser();

        vm.firstname = currentUser.firstname;
        vm.lastname = currentUser.lastname;

        console.log("from dash ctrl", auth.currentUser());

    }

})();