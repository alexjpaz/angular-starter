angular.module('vehimatics').config(function(DirectiveProvider) {

	/**
	 * @directive: if-any-role
	 *
	 * Hide or show an element based on the if the user session has the role in the array.
	 * Hides by default.
	 *
	 * e.g.
	 * <ANY if-any-role='roleArray'></ANY>
	 * <ANY if-any-role="['ADMIN', 'ROLE1']"></ANY>
	 * @function module:vehimatics.directive#fa
	 * @arg {stringp[]} if-any-role
	 */

	 DirectiveProvider.register('show-any-role', function($compile, $parse, UserSession) {
		 return {
			 restrict: 'A',
			 link: function(scope, element, attrs) {
				 var userHasRole = UserSession.userHasRole;
				 var roles;

				 function update() {
					 attrs.$addClass('ng-hide');
					 angular.forEach(roles, check);
				 }

				 function check(role) {
					 if(userHasRole(role) || role === "ALL") {
						 attrs.$removeClass('ng-hide');
					 };
				 }

				 scope.$watch(attrs.showAnyRole, function(list) {
					 if(angular.isUndefined(list)) return;
					 roles = list;
					 update();
				 });

				 scope.$on('UserSession.refresh', function() {
					 update();
				 });
			 }
		 }
	 });
});
/** @file */
