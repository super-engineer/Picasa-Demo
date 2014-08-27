'use strict';

var picasaDemo = angular.module('picasaDemo', [
  'ngRoute',
  'picasaServices',
  'picasaControllers'
]);

picasaDemo.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/albums', {
        templateUrl: 'partials/album-list.html',
        controller: 'AlbumController'
      }).
      when('/albums/:albumId', {
        templateUrl: 'partials/album.html',
        controller: 'albumDetailController'
      }).
      when('/albums/:albumId/:photoId', {
        templateUrl: 'partials/photo.html',
        controller: 'albumDetailController'
      }).
      when('/login', {
        templateUrl: 'partials/login.html'
      }).
      when('/signout', {
        templateUrl: 'partials/login.html',
        controller: 'signoutController' 
      }).      
      otherwise({
        redirectTo: '/albums',
      });      
    }
]);

// For loader

picasaDemo.config(function ($httpProvider) {
  $httpProvider.responseInterceptors.push('myHttpInterceptor');

  var spinnerFunction = function spinnerFunction(data, headersGetter) {
    $("#spinner").show();
    return data;
  };

  $httpProvider.defaults.transformRequest.push(spinnerFunction);
});

picasaDemo.factory('myHttpInterceptor', function ($q, $window) {
  return function (promise) {
    return promise.then(function (response) {
      $("#spinner").hide();
      return response;
    }, function (response) {
      $("#spinner").hide();
      return $q.reject(response);
    });
  };
});

//To handle token expiry

picasaDemo.config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
})

picasaDemo.factory('AuthInterceptor', function ($rootScope, $q, $location) {
  return {
    responseError: function (response) { 
      $location.path('/login')
      return $q.reject(response);
    }
  };
})

// picasaDemo.config(['$httpProvider', function ($httpProvider) {
//   //Reset headers to avoid OPTIONS request (aka preflight)
//   $httpProvider.defaults.headers.common = {};
//   $httpProvider.defaults.headers.post = {};
//   $httpProvider.defaults.headers.put = {};
//   $httpProvider.defaults.headers.patch = {};
// }]);