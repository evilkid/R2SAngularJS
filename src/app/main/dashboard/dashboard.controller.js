(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController(auth, Employee, Candidate, $state) {
        var vm = this;

        vm.gotoReferee = gotoReferee;
        vm.gotoJobDetail = gotoJobDetail;

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

            if (currentUser.role == "Candidate") {
                vm.jobs = Candidate.getJobs({cin: currentUser.cin});
            }
        });


        function gotoReferee() {
            $state.go("app.referee");
        }

        function gotoJobDetail(id) {
            $state.go('app.job.detail', {id: id});
        }
    }

})();