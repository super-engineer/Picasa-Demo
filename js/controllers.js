'use strict';

var picasaControllers = angular.module('picasaControllers', []);

picasaControllers.controller('AlbumController', ['$scope', 'Albums', function($scope, Albums) {
  $scope.albums = Albums.query({accessToken: sessionStorage.access_token});
}]);

picasaControllers.controller('albumDetailController', ['$scope', 'Album', 'Image', 'Comment', '$routeParams', '$http', function($scope, Album, Image, Comment, $routeParams, $http) {
  $scope.album = Album.query({albumId: $routeParams.albumId, accessToken: sessionStorage.access_token}, function(album){
    $scope.mainImage = Image.query({albumId: $routeParams.albumId, photoId: album.feed.entry[0].gphoto$id.$t, accessToken: sessionStorage.access_token});
    $scope.text = '';
  });

  $scope.submit = function() {
    if($scope.text){  
      Comment.post({commentText: $scope.text, albumId: $routeParams.albumId, photoId: $scope.mainImage.feed.gphoto$id.$t})
      $scope.setMainImage($scope.mainImage.feed.gphoto$id.$t);
      $scope.text = '';
    }
  };

  $scope.setMainImage = function(imageId) {
    $scope.mainImage = Image.query({photoId: imageId, albumId: $routeParams.albumId, accessToken: sessionStorage.access_token});
  };
}]);

picasaControllers.controller('signoutController', ['$location', function($location) {
  sessionStorage.access_token = "";
  $location.path('/login');
}]);
