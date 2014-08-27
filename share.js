angular.module('social-share', []);

angular.module('social-share').directive('socialShare', [function() {
  return {
    restrict: 'AEC',
    templateUrl: 'social-share.html',
    compile: function(tElement, tAttrs, transclude) {
      return {
        pre: function(scope, iElement, iAttrs, controller) {
          var sharingMethods = Object.keys(iAttrs.$attr).map(function(method) {
            method = method.toLowerCase();
            return "twitter facebook google pinterest email".indexOf(method) > -1 ? method : null;
          }).filter(function(method) {
            return method != undefined;
          });
          console.log(sharingMethods);

          iElement.bind('click', function() {
            debugger;
          });
        }
      }
    },
    controller: 'SocialShareController'
  };
}]).controller('SocialShareController', ['Share', function(Share) {

}]).factory('Share', [function() {
  function SocialShare(options) {
    this.options = angular.extend({
      twitter: true,
      facebook: true,
      google: true,
      email: true,
      direction: 'up'
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
}]);

angular.module('myApp', ['social-share']);
