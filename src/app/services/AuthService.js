(function (angular) {
    "use strict";
    angular.module('app.authService', ["ngCookies"])
        .service('auth', AuthService);

    /** @ngInject */
    function AuthService($window, $http, $cookies, User /*, API*/) {
        var API = "http://localhost:8080/tn.esprit.R2S-web/resources/api";
        var self = this;

        self.urlBase64Decode = urlBase64Decode;
        self.decodeToken = decodeToken;
        self.getTokenExpirationDate = getTokenExpirationDate;
        self.isTokenExpired = isTokenExpired;
        self.login = login;
        self.logout = logout;
        self.isAuthorized = isAuthorized;
        self.refresh = refresh;
        self.getCurrentUser = getCurrentUser;
        self.role = getRole();

        self.currentUser = null;
        ///////

        function getRole() {
            if (isAuthorized()) {
                var token = $cookies.get("access_token");
                return decodeToken(token).role;
            }
            return null;
        }


        function getCurrentUser(callback) {

            if (isAuthorized()) {

                if (self.currentUser && self.currentUser.cin) {

                    console.log("old", callback);
                    callback(self.currentUser);
                } else {
                    console.log("new", callback);
                    var token = $cookies.get("access_token");
                    var cin = decodeToken(token).cin;
                    self.currentUser = User.get({cin: cin}).$promise.then(function (currentUser) {
                        self.currentUser = currentUser;
                        callback(currentUser);
                    });
                }


                /**
                 //if user already retrieved return it
                 if (self.currentUser) {
                    //callback(self.currentUser);
                    return self.currentUser;
                } else {
                    //else go and fetch it
                    var token = $cookies.get("access_token");
                    var cin = decodeToken(token).cin;
                    $http.get(API + '/users/' + cin, {withCredentials: true})
                        .then(function (response) {
                            self.currentUser = response.data;
                            console.log("first promise", response.data);
                            callback(self.currentUser);
                        });
                }*/
            }
        }

        function refresh() {
            if (isAuthorized()) {
                var token = $cookies.get("access_token");
                var cin = decodeToken(token).cin;

            }
        }

        function isAuthorized() {
            if ($cookies.get("access_token")) {
                var token = $cookies.get("access_token");

                return !isTokenExpired(token);
            }

            return false;
        }

        function login(username, password) {
            return $http.get(API + '/login/' + username + "/" + password, {withCredentials: true})
                .then(function (response) {
                    self.currentUser = response.data;
                    return response;
                });
        }

        function logout() {
            $cookies.remove("access_token");
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
        }


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
        }

        function getTokenExpirationDate(token) {
            var decoded = decodeToken(token);

            if (typeof decoded.exp === "undefined") {
                return null;
            }

            var d = new Date(0); // The 0 here is the key, which sets the date to the epoch
            d.setUTCSeconds(decoded.exp);

            return d;
        }

        function isTokenExpired(token, offsetSeconds) {
            var d = getTokenExpirationDate(token);
            offsetSeconds = offsetSeconds || 0;
            if (d === null) {
                return false;
            }

            // Token expired?
            return !(d.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
        }
    }

})(angular);