angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	/**
	 * @class module:vehimatics.api.json.TroubleshootDiagnoseAlert
	 */
	 $provide.factory('TroubleshootDiagnoseAlert', function($resource) {
		 var base = ResourceProvider.config.restUrl;
		 return $resource(base+'/troubleshoot/diagnose', {}, {
				 scenario1 : {
					 method: 'GET',
					 url: base+'/troubleshoot/diagnose/alerts/:vid'
				 },
				 scenario3 : {
					 method: 'GET',
					 url: base+'/troubleshoot/diagnose/alerts/0'
				 },
				 scenario4: {
					 method: 'GET',
					 url: base+'/troubleshoot/diagnose/alert/:deviceEventId'
				 }
		 });
	 });
});
/** @file */
