angular.module('vehimatics').config(function($provide, LinksProvider) {

	LinksProvider.register('developertest', function(NavigationGroup) {
		var group = new NavigationGroup();

		group.add('developer/test/links', 'link relative to <base>');
		group.add('developer/test/links_2', 'another relative to <base>'); 
		group.addIgnoreQuery('developer/test/links_3?hi=555', 'ignore query (partial match)');
		group.add('developer/test/links_3?hi=666', 'link that does NOT ignore query (must be full match)'); 
		group.add('/vehimatics/ng/developer/test/links?hi=4', 'with root url'); // relative to contextPath (would be just /ng on dev/test/prod
			group.add('http://localhost:8080/vehimatics/ng/developer/test/links_4', 'full url');  // absolute url as last resort

			return group.links;

		});
	});
/** @file */
