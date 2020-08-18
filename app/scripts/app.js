'use strict';

angular.module('sortingVisualizerProjectApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/sorting.html',
        controller: 'SortingCtrl',
        controllerAs: 'sorting'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
