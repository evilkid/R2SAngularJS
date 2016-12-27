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
            //auth service
            'app.authService',
            //login
            'app.login',
            //dashboard
            'app.dashboard',
            // Sample
            'app.sample'
        ]);
})();
