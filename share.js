angular.module('social-share', []);

angular.module('social-share').directive('socialShare', ['$window', 'Share',
  function($window, Share) {
    return {
      restrict: 'AEC',
      templateUrl: 'social-share.html',
      link: function($scope, element, attrs) {
        $scope.calculatePosition = function() {
          return {
            'left': document.querySelector('.social-share button').offsetLeft + document.querySelector('.social-share button').offsetWidth/2 - document.querySelector('.social-share ul').offsetWidth/2 + 'px',
            'top': document.querySelector('.social-share button').offsetTop - 15 - document.querySelector('.social-share ul').offsetHeight + 'px'
          };
        };

        $scope.share = new Share({
          twitter: {
            url: 'http://ilanbiala.github.io/angular-share/',
            text: 'Check out the new best AngularJS sharing plugin! Made with \u2764 by @ilanbiala'
          },
          facebook: {
            redirectUrl: 'http://ilanbiala.github.io/angular-share/',
            url: 'http://ilanbiala.github.io/angular-share/',
            appId: 681511458592219
          },
          googleplus: {
            url: 'http://ilanbiala.github.io/angular-share/'
          },
          email: {
            url: 'http://ilanbiala.github.io/angular-share/',
            text: 'AngularJS sharing plugin'
          },
          direction: 'down',
          position: $scope.calculatePosition,
          style: 'flat'
        });
        $scope.$window = $window;

        $scope.sharingUrls = {
          twitter: encodeURI($scope.share.options.twitter.baseUrl + '?' + ($scope.share.options.twitter.url ? 'url=' + $scope.share.options.twitter.url : '') + ($scope.share.options.twitter.url && $scope.share.options.twitter.text ? '&text=' + $scope.share.options.twitter.text : '') + ($scope.share.options.twitter.text ? '&text=' + $scope.share.options.twitter.text : '')),
          facebook: encodeURI($scope.share.options.facebook.baseUrl + '?app_id=' + $scope.share.options.facebook.appId + '&display=popup' + ($scope.share.options.facebook.url ? '&href=' + $scope.share.options.facebook.url : '') + '&redirect_uri=' + $scope.share.options.facebook.redirectUrl),
          googleplus: encodeURI($scope.share.options.googleplus.baseUrl + '?' + ($scope.share.options.googleplus.url ? 'url=' + $scope.share.options.googleplus.url : '')),
          email: encodeURI($scope.share.options.email.baseUrl + '?' + ($scope.share.options.email.text ? 'subject=' + $scope.share.options.email.text : '')),
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
          if ('twitter facebook googleplus email'.indexOf(method) !== -1) {
            return {
              name: method,
              icon: $scope.share.options[method].icon
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
      function deepExtend(destination, source) {
        for (var property in source) {
          if (source[property] && source[property].constructor &&
            source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            arguments.callee(destination[property], source[property]);
          } else {
            destination[property] = source[property];
          }
        }
        return destination;
      }

      this.options = deepExtend({
        twitter: {
          baseUrl: 'https://twitter.com/intent/tweet',
          url: '',
          text: '',
          icon: 'icon-twitter'
        },
        facebook: {
          baseUrl: 'https://www.facebook.com/dialog/share',
          url: '',
          icon: 'icon-facebook',
          appId: null
        },
        googleplus: {
          baseUrl: 'https://plus.google.com/share',
          url: '',
          icon: 'icon-googleplus'
        },
        email: {
          baseUrl: 'mailto:',
          url: '',
          text: '',
          icon: 'icon-email'
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
