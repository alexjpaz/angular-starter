angular.module('vehimatics').config(function($provide) {
	$provide.provider('App', function(DefaultAppConfig, EnvironmentProfiles, ParamAngularGlobalHack) {
		this.config = DefaultAppConfig;
		
		angular.extend(this.config, EnvironmentProfiles.get(ParamAngularGlobalHack.env));
		angular.extend(this.config, ParamAngularGlobalHack);

		//TODO: do compatibility check
		if(typeof(Storage) !== void(0)) {
			var lsConfig = {};
			try {
				lsConfig = JSON.parse(localStorage.getItem('App'));
				angular.extend(this.config, lsConfig);
			} catch(e) {
				console.error("Error loading application settings", e);
			}
		}

		this.$get = function() {
			return this; // TODO: need to return App instance so that we can hold information.
		};
	});
});

/** @file */
