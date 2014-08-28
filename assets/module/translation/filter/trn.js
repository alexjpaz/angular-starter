angular.module('vehimatics/translation').config(function($filterProvider) {
	/**
	 * This is a very simple way to get translations working
	 * This currently does not support plurals.
	 * @function module:vehimatics/translation.filter#trn
	 * @arg {string} ifRole
	 */
	 $filterProvider.register('trn', function(gettextCatalog) {
		 function translateFilter(text) {
			 return gettextCatalog.getString(text);
		 }

		 return translateFilter;
	 });
});
/** @file */
