(function (angular) {
    "use strict";
    angular.module('app.authService', ["ngCookies"])
        .service('auth', AuthService);

    /** @ngInject */
    function AuthService($window, $http, $cookies, API) {

        this.urlBase64Decode = urlBase64Decode;
        this.decodeToken = decodeToken;
        this.getTokenExpirationDate = getTokenExpirationDate;
        this.isTokenExpired = isTokenExpired;
        this.login = login;
        this.logout = logout;
        this.isAuthorized = isAuthorized;
        ///////

        function isAuthorized() {
            if ($cookies.get("access_token")) {
                var token = $cookies.get("access_token");

                return !isTokenExpired(token);
            }

            return false;
        }

        function login(username, password) {
            return $http.get(API + '/login/' + username + "/" + password, {withCredentials: true});
        }

        function logout() {

        }

        function urlBase64Decode(str) {
            var output = str.replace(/-/g, '+').replace(/_/g, '/');
            switch (output.length % 4) {
                case 0: {
                    break;
                }
                case 2: {
                    output += '==';
                    break;
                }
                case 3: {
                    output += '=';
                    break;
                }
                default: {
                    throw 'Illegal base64url string!';
                }
            }
            return $window.decodeURIComponent(escape($window.atob(output)));
        };


        function decodeToken(token) {
            var parts = token.split('.');

            if (parts.length !== 3) {
                throw new Error('JWT must have 3 parts');
            }

            var decoded = urlBase64Decode(parts[1]);
            if (!decoded) {
                throw new Error('Cannot decode the token');
            }

            return angular.fromJson(decoded);
        };

        function getTokenExpirationDate(token) {
            var decoded = decodeToken(token);

            if (typeof decoded.exp === "undefined") {
                return null;
            }

            var d = new Date(0); // The 0 here is the key, which sets the date to the epoch
            d.setUTCSeconds(decoded.exp);

            return d;
        };

        function isTokenExpired(token, offsetSeconds) {
            var d = getTokenExpirationDate(token);
            offsetSeconds = offsetSeconds || 0;
            if (d === null) {
                return false;
            }

            // Token expired?
            return !(d.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
        };
    }

})(angular);