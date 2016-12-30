(function (angular) {
    "use strict";
    angular.module('app.repository')
        .factory('Candidate', CandidateFactory);

    /** @ngInject */
    function CandidateFactory($resource, API) {
        var params = {cin: "@cin"};
        var customMethods = {
            'getJobs': {
                method: "GET",
                isArray: true,
                params: {
                    entity: "jobs"
                }
            },
            'getInterviews': {
                method: "GET",
                isArray: true,
                params: {
                    entity: "interviews"
                }
            }
        };
        var Candidate = $resource(API + "/candidate/:cin/:entity", params, customMethods);
        return Candidate;
    }

})(angular);