(function () {
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [
            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick Panel
            //'app.quick-panel',
            //repository
            'app.repository',

            //auth service
            'app.authService',
            //login
            'app.login',
            //dashboard
            'app.dashboard',
            //job
            'app.job',
            // Sample
            'app.sample'
        ]);
})();
