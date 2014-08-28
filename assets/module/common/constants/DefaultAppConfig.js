angular.module('vehimatics').config(function($provide) {
	/** 
	 * Default configuration for the vehimatics module.  Can be overriden by 
	 * @see {@link module:vehimatics.config.override}
	 * @constant {object} module:vehimatics.constants.DefaultAppConfig 
	 **/
	$provide.constant('DefaultAppConfig', {
		restUrl: "/telematics/rest",
		allowRedirects: true,
		enableCORS: true,
		branding: {
			logo: 'https://s3.amazonaws.com/bucketimgs3/shared/img/1/affiliation-header-logo.png?version=1172014454',
			name: 'Vehimatics',
		},
		languageKey: 'en',
		reloadOnPathChange: false,
		aws: {
			bucket: "https://bucketimgs3.s3.amazonaws.com/"  
		}
	});
});
/** @file */
