angular.module('vehimatics').config(function(AppProvider, $httpProvider) {
	/**
	 * @function module:vehimatics.ocnfig.enableCors
	 */
	 if(AppProvider.config.enableCORS) {
		 //console.debug('CORS Enabled');
		 $httpProvider.defaults.useXDomain = true;
		 delete $httpProvider.defaults.headers.common['X-Requested-With'];
	 }
});
/** @file */
