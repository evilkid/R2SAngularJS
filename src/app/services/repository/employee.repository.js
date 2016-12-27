(function (angular) {
    "use strict";
    angular.module('app.repository')
        .factory('Employee', EmployeeFactory);

    /** @ngInject */
    function EmployeeFactory($resource, API) {
        var params = {cin: "@cin"};
        var customMethods = {
            'update': {
                method: "PUT"
            },
            'getReferred': {
                isArray: true,
                method: "GET",
                params: {
                    cin: "referred"
                }
            },
            'getRewardPoints': {
                isArray: false,
                method: "GET",
                params: {
                    cin: "rewards"
                }
            }
        };
        var Employee = $resource(API + "/employee/:cin", params, customMethods);
        return Employee;
    }

})(angular);