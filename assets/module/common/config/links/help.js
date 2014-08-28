angular.module('vehimatics').config(function($provide, LinksProvider) {

	LinksProvider.register('help', function(NavigationGroup) {
		var group = new NavigationGroup();
		group.addIgnoreQuery('help/topic', 'Search Topics');
		group.addIgnoreQuery('help/topic/list', 'Topic Category');
		group.addIgnoreQuery('help/topic/new/edit', 'New Topic', '#topic', ['SYSADMIN']);
		return group.links;

	});
});
/** @file */
