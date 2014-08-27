angular.module('social-share', []);

angular.module('social-share').directive('socialShare', ['$window', 'Share',
  function($window, Share) {
    return {
      restrict: 'AEC',
      templateUrl: 'social-share.html',
      link: function($scope, element, attrs) {
        $scope.share = new Share({
          direction: 'down',
          style: 'flat'
        });
        $scope.$window = $window;

        $scope.sharingUrls = {
          twitter: encodeURI('https://twitter.com/intent/tweet?text=A simple, light, flexible, and good-looking share button&url=http://sharebutton.co/'),
          facebook: encodeURI('https://www.facebook.com/dialog/share?app_id=681511458592219&display=popup&href=http://sharebutton.co/&redirect_uri=https://developers.facebook.com/tools/explorer'),
          googleplus: encodeURI('https://plus.google.com/share?url=http://sharebutton.co/'),
          email: encodeURI('mailto:?subject=Awesome share button built in angular&body=Look at this!'),
        };

        $scope.openShareLink = function(shareMethod) {
          $window.open(
            $scope.sharingUrls[shareMethod],
            '_blank-' + shareMethod,
            'height=' + $scope.share.options.height +
            ',width=' + $scope.share.options.width +
            ',left=' + ($window.innerWidth / 2 - $scope.share.options.width / 2) +
            ',top=' + ($window.innerHeight / 2 - $scope.share.options.height / 2));
        };

        $scope.sharingMethods = Object.keys(attrs.$attr).map(function(method) {
          method = method.toLowerCase();
          if ('twitter facebook googleplus email'.indexOf(method) > -1) {
            return {
              name: method
            };
          }
        }).filter(function(method) {
          return method != undefined;
        });
      }
    };
  }
]).factory('Share', [
  function() {
    function SocialShare(options) {
      this.options = angular.extend({
        twitter: {
          text: null,
          url: null
        },
        facebook: {
          url: null,
          text: null
        },
        google: {
          url: null,
          text: null
        },
        email: {
          url: null,
          text: null
        },
        direction: 'up',
        style: 'radius',
        width: 575,
        height: 400,
        popupPosition: 'center'
      }, options);

      this.isOpen = false;
      return this;
    }

    SocialShare.prototype.open = function() {
      this.isOpen = true;
      return this;
    };

    SocialShare.prototype.close = function() {
      this.isOpen = false;
      return this;
    };

    return SocialShare;
  }
]);

angular.module('myApp', ['social-share']);
