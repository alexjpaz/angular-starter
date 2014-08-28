angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * Hide or show an element based on the if the user session has the role.
	 * Hides by default.
	 *
	 * e.g.
	 * <ANY if-role='ADMIN'></ANY>
	 * @function module:vehimatics.directive#fa
	 * @arg {string} if-role
	 */

	 DirectiveProvider.register('showRole', function($compile, $parse, Permissions, UserSession) {
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
					 if(userHasRole(role) || role === "ALL") {
						 attrs.$removeClass('ng-hide');
					 }
				 }

				 attrs.$observe('showRole', function(val) {
					 role = val;
					 update();
				 });

				 scope.$on('UserSession.refresh', update);
			 }
		 };
	 });
});
/** @file */
