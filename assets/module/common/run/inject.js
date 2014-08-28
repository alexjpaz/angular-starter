angular.module('vehimatics').run(function($rootScope, $location, $window, AppConfig) {
	if(AppConfig.reloadOnPathChange) {
		var path = $location.path();
		$rootScope.$on('$locationChangeStart', function(e, v, o) {
			var newPath = $location.path();

			if(path !== newPath) {
				e.preventDefault();
				$window.location.href = v;	
			}
		});
	}
});

/** @file */
