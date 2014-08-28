angular.module('vehimatics').config(function(FormResourceProvider) {
	/**
	 * Resource to reset password. Simulates a form POST request. 
	 * @class module:vehimatics.api.form.ResetPassword 
	 * @type module:vehimatics/framework.FormResource
	 * */
	FormResourceProvider.register('ResetPassword', '/process/pwd/reset');
});
/** @file */
