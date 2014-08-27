var picasaServices = angular.module('picasaServices', ['ngResource']);

picasaServices.factory('Albums', ['$resource',
  function($resource){
    return $resource('https://picasaweb.google.com/data/feed/api/user/default?access_token=:accessToken', {}, {
      query: {method: 'GET', params:{alt: 'json'}, isArray: false}
    });
  }
]);

picasaServices.factory('Album', ['$resource',
  function($resource){
    return $resource('https://picasaweb.google.com/data/feed/api/user/default/albumid/:albumId?access_token=:accessToken', {}, {
      // passed max-results for retriving only 3 results
      query: {method: 'GET', cache: false, params: {alt: 'json', 'max-results': 3}, isArray: false}
    });
  }
]);

picasaServices.factory('Image', ['$resource',
  function($resource){
    return $resource('https://picasaweb.google.com/data/feed/api/user/default/albumid/:albumId/photoid/:photoId?access_token=:accessToken', {}, {
      // passed max-results for retriving only 3 results
      query: {method: 'GET', params: {alt: 'json', 'imgmax': 1000 }, isArray: false}
    });
  }
]);

picasaServices.factory('Comment', ['$resource',
  function($resource){
    post_xml = "<entry xmlns='http://www.w3.org/2005/Atom'><content>@commentText</content><category scheme=\"http://schemas.google.com/g/2005#kind\"term=\"http://schemas.google.com/photos/2007#comment\"/></entry>"
    return $resource('https://picasaweb.google.com/data/feed/api/user/default/albumid/:albumId/photoid/:photoId', {}, {
      post: {
        method: 'POST', 
        params: {
          albumId: '@albumId', 
          photoId: '@photoId', 
          alt: 'json', 
          access_token: sessionStorage.access_token
        }, 
        data: post_xml, 
        headers: {
          'Content-Type': 'application/atom+xml'
        }
      }
    });
  }
]);