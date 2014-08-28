angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	ResourceProvider.register('Version', '/version');
	ResourceProvider.register('SiteWideMessages', '/sitewidemessage/messages');
	ResourceProvider.register('ChangeLog', '/sitewidemessage/messages/changelog');
	ResourceProvider.register('TranslateLanguages', '/translate/languages');
});
/** @file */
