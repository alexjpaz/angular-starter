angular.module('vehimatics').config(function($provide) {

	$provide.factory('AccountsNavigation', function(NavigationGroup) {
		var group = new NavigationGroup();

		group.add('#/account/profile', 'Your Profile');
		group.add('#/account/cart', 'Your Cart');

		return group.links;

	});

	$provide.factory('VehicleNavigation', function(NavigationGroup) {
		var group = new NavigationGroup();

		group.add('#/vehicle', 'All Vehicles');
		group.add('#/vehicle/{{ r.vehicleId }}/overview', 'Overview');
		group.add('#/vehicle/{{ r.vehicleId }}/image/list', 'Gallery');
		group.add('#/vehicle/{{ r.vehicleId }}/image/thumbnail', 'Thumbnail');

		return group.links;
	});

	$provide.factory('BusinessNavigation', function(NavigationGroup) {
		var group = new NavigationGroup();

		group.add('#/business', 'All Businesses');
		group.add('#/business/{{ r.busEntId }}/detail', 'Detail');
		group.add('#/business/{{ r.busEntId }}/image/logo', 'Logo');

		return group.links;
	});


	$provide.factory('MobileHeaderNavigation', function(NavigationGroup) {
		var top = new NavigationGroup();

		top.add('#/dashboard', 'DASHBOARD');
		top.add('#/account/profile', 'Your Profile');
		top.add('#/dashboard', 'Users');
		top.add('#/dashboard', 'Vehicles');
		top.add('#/dashboard', 'Locations');
		top.add('#/dashboard', 'resources');
		top.add('/learn/howto', 'Help');
		top.add('/carcare/feedback.jsp', 'Contact');
		top.add('#/logout', 'Logout');

		var users = new NavigationGroup();

		return top.links;
	});

	/*$provide.factory('PromoNavigation', function(NavigationGroup) {
		var group = new NavigationGroup();

		group.addIgnoreQuery('promos/', 'My Current Coupons');
		group.addIgnoreQuery('promos/create-sag-coupons', 'Create Coupon');
		group.addIgnoreQuery('promos/mfg-coupons', 'MFG Coupons');
				
		return group.links;
	});*/

});
/** @file */
