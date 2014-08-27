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
    // console.log($http);
    if ($scope.text) {
        // data: "<entry xmlns='http://www.w3.org/2005/Atom'><content>asdsad</content><category scheme=\"http://schemas.google.com/g/2005#kind\"term=\"http://schemas.google.com/photos/2007#comment\"/></entry>",
        var request = $http({
            method: "POST",
            url: "https://picasaweb.google.com/data/feed/api/user/default/albumid/"+$routeParams.albumId+"/photoid/"+$scope.mainImage.feed.gphoto$id.$t+"?access_token="+sessionStorage.access_token+"&alt=json",
            data: {abc: "hello"}
            // headers: {'Authorization': "Bearer"+sessionStorage.access_token, 'Content-Type': 'application/atom+xml'}
        });

        // Store the data-dump of the FORM scope.
        request.success(
            function( html ) {
              console.log(html);
            }
        );

      // Comment.post({commentText: $scope.text, albumId: $routeParams.albumId, photoId: $scope.mainImage.feed.gphoto$id.$t})
      // $scope.setMainImage($scope.mainImage.feed.gphoto$id.$t);
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
