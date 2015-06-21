(function() {
    var app = angular.module("app", ['ngRoute', 'appDirective', 'router'])

    .controller("MainController", function mainController($scope, $http, $routeParams) {
        function getCurrentWeather(search) {
            var todayHttpSuccess = function(response) {
                $scope.weather = response.data.current_observation;
            };

            var todayHttpError = function(err) {
                console.log(err.message);
            };

            $http.get("http://api.wunderground.com/api/1b4e9f187519e8ad/conditions/q/" + search + ".json")
                .then(todayHttpSuccess, todayHttpError);
        }

        function getForecast(search) {
            var forecastHttpSuccess = function(response) {
                $scope.forecast = response.data.forecast.simpleforecast.forecastday;
            };

            var forecastHttpError = function(err) {
                console.log(err.message);
            };

            $http.get("http://api.wunderground.com/api/1b4e9f187519e8ad/forecast10day/q/" + search + ".json")
                .then(forecastHttpSuccess, forecastHttpError);
        }
        
        function getAlmanac(search) {
            var almanacHttpSuccess = function(response) {
                $scope.almanac = response.data.almanac;
            };

            var almanacHttpError = function(err) {
                console.log(err.message);
            };
            $http.get("http://api.wunderground.com/api/1b4e9f187519e8ad/almanac/q/" + search + ".json")
                .then(almanacHttpSuccess, almanacHttpError);
        
        }
        function getChanceOf(search) {
            var chanceOfHttpSuccess = function(response) {
                $scope.trip = response.data.trip;
                $scope.chanceOf = response.data.trip.chance_of
            };

            var chanceOfHttpError = function(err) {
                console.log(err.message);
            };
            var month = date.getMonth() + 1
            if (month < 10) {
                month = "0" + month
            }
            $http.get("http://api.wunderground.com/api/1b4e9f187519e8ad/planner_"+month+"01"+month+"30/q/" + search + ".json")
                .then(chanceOfHttpSuccess, chanceOfHttpError);
        }
        function getSatellite(search) {
            var satelliteHttpSuccess = function(response) {
                console.log(response)
                $scope.satellite = response.data.satellite;
            };

            var satelliteHttpError = function(err) {
                console.log(err.message);
            };
            $http.get("http://api.wunderground.com/api/1b4e9f187519e8ad/satellite/q/" + search + ".json")
                .then(satelliteHttpSuccess, satelliteHttpError);
        }
        
        function getWebCam(search) {
            var webCamHttpSuccess = function(response) {
                console.log(response)
                $scope.webCam = response.data.webcams;
            };

            var webCamHttpError = function(err) {
                console.log(err.message);
            };
            $http.get("http://api.wunderground.com/api/1b4e9f187519e8ad/webcams/q/" + search + ".json")
                .then(webCamHttpSuccess, webCamHttpError);
        }
        
        
        var date = new Date()
        $scope.date = date.toDateString()
        $scope.searchWeather = function() {
            $scope.search = document.getElementById("searchText").value
            getCurrentWeather($scope.search);
            getForecast($scope.search);
            getChanceOf($scope.search);
            getAlmanac($scope.search);
            getSatellite($scope.search)
            getWebCam($scope.search)
            $scope.search = routeParams.search
        };
        
        
        
        
        
    });
}())
