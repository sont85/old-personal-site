angular.module("router", [])    
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: 'weather.html'
            })
            .when("/:search", {
                templateUrl: 'weather.html'
            })
            .when("/:search/forecast", {
                templateUrl: 'forecast.html'
            })
            .when("/:search/almanac", {
                templateUrl: "almanac.html"
            })
            .when("/:search/chanceOf", {
                templateUrl: "chanceOf.html"
            })
            .when("/:search/satellite", {
                templateUrl: "satellite.html"
            })
            .when("/:search/webCam", {
                templateUrl: "webCam.html"
            });
            
    });