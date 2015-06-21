(function() {
    angular.module("appDirective", [])

    .directive("forecast", function() {
        return {
            templateUrl: "forecast.html",
            restrict: "E"
        }
    })
    .directive("weather", function() {
        return {
            templateUrl: "weather.html",
            restrict: "E"
        }
    })
    .directive("searchBox", function () {
        return {
            templateUrl: "searchBox.html",
            restrict: "E"
        }
    });
    
}())