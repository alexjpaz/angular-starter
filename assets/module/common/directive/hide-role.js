angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * @function module:vehimatics.directive#hide-role
	 * @arg {string} hide-role
	 */
	 DirectiveProvider.register('hide-role', function($compile, $parse, Permissions, UserSession) {
		 return {
			 restrict: 'A',
			 link: function(scope, element, attrs) {
				 var userHasRole = UserSession.userHasRole;
				 var role;

				 function update() {
					 check(role);
				 }

				 function check(role) {
					 attrs.$addClass('ng-hide');
					 if(!userHasRole(role)) {
						 attrs.$removeClass('ng-hide');
					 }
				 }

				 attrs.$observe('hideRole', function(val) {
					 role = val;
					 update();
				 });

				 scope.$on('UserSession.refresh', update);
			 }
		 };
	 });
});
/** @file */
