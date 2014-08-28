angular.module('vehimatics').config(function($provide) {
	$provide.constant('EnvironmentProfiles', new function() {
		var profiles = {};
		profiles['full'] = {
		};
		profiles['inject.jsp'] = {
			reloadOnPathChange: true,
			anchorTargetHack: true
		};
		
		this.get = function(profile) {
			return profiles[profile];
		}
	});
})

/** @file */
