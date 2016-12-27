(function () {
    'use strict';

    angular
        .module('app.dashboard', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msNavigationServiceProvider) {
        // State
        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            views: {
                'content@app': {
                    templateUrl: 'app/main/dashboard/dashboard.html',
                    controller: 'DashboardController as vm'
                }
            },
            bodyClass: 'dashboard-project'
        });

        //add to the navigation bar
        msNavigationServiceProvider.saveItem('apps', {
            title: 'Dashboard',
            icon: 'icon-tile-four',
            state: 'app.dashboard',
            /*stateParams: {
             'param1': 'page'
             },*/
            weight: 1
        });
    }

})();