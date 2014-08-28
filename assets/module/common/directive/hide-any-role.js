angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * Hide or show an element based on the if the user session has the role in the array.
	 * Hides by default.
	 * @function module:vehimatics.directive#if-any-role
	 * @arg {String[]} if-any-role - role (e.g. SYSADMIN) 
	 */
	 DirectiveProvider.register('hide-any-role', function($compile, $parse, UserSession) {
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
					 if(!userHasRole(role)) {
						 attrs.$removeClass('ng-hide');
					 }
				 }

				 scope.$watch(attrs.hideAnyRole, function(list) {
					 if(angular.isUndefined(list)) return;
					 roles = list;
					 update();
				 });

				 scope.$on('UserSession.refresh', function() {
					 update();
				 });
			 }
		 };
	 });
});
/** @file */
