angular.module('vehimatics').config(function($provide, LinksProvider) {
	LinksProvider.register('promos', function(NavigationGroup) {
		var group = new NavigationGroup();
		var attOnly = ["SYSADMIN"];

		group.addIgnoreQuery('promos/', 'My Coupons');
		group.addIgnoreQuery('promos/create-sag-coupons', 'Create Coupon');
		group.addIgnoreQuery('promos/mfg-coupons', 'MFG Coupons');
		group.addIgnoreQuery('promos/sag-categories', 'SAG Maint.', '', attOnly);
				
		return group.links;

	});
});

/** @file */
