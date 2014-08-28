angular.module('vehimatics').run(function($rootScope, $http, DefaultUserSession, UserSession, AppConfig) {
	 //Set defaults for the user sessions
	 $rootScope.Session = DefaultUserSession;

	 UserSession.setSession(DefaultUserSession);

	 UserSession.onRefresh(function(e, UserSession) {
		 $rootScope.Session = UserSession; // Legacy
		 $rootScope.UserSession = UserSession;
	 });

	 UserSession.refresh();
});
/** @file */
