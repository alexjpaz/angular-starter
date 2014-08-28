angular.module('vehimatics').config(function($provide, LinksProvider) {
	LinksProvider.register('account', function(NavigationGroup) {
		var group = new NavigationGroup();

		group.add('#/account/profile', 'Your Profile');
		group.add('#/account/cart', 'Your Cart');

		return group.links;
	});
});

/** @file */
