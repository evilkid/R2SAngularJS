(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController(auth, Employee) {
        var vm = this;

        Employee.getReferred().$promise.then(function (referreds) {
            console.log(referreds);
            vm.refferedCount = referreds.length;
        });

        Employee.getRewardPoints().$promise.then(function (value) {
            vm.rewards = value.points;
        });

        auth.getCurrentUser(function (currentUser) {

            vm.firstname = currentUser.firstname;
            vm.lastname = currentUser.lastname;

        });


    }

})();