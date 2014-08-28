/**
* Route config block
*
* Binds url pattern to screen defined in "assets/screen/*"
*
* See: ngRoute
*/
angular.module('vehimatics').config(function(RouteScreenProvider) {
	RouteScreenProvider.when('/business', 'business/search');
	RouteScreenProvider.redirect('/business/:busEntId', '/business/:busEntId/detail');
	RouteScreenProvider.when('/business/:busEntId/detail', 'business/detail');
	RouteScreenProvider.when('/business/:busEntId/image/header', 'business/image/header');
	RouteScreenProvider.when('/business/:busEntId/image/logo', 'business/image/logo');

	RouteScreenProvider.when('/account/dashboard', 'account/dashboard');
	RouteScreenProvider.when('/account/profile', 'account/profile');
	RouteScreenProvider.when('/account/user/add', 'account/user/add');

	RouteScreenProvider.redirect('/dashboard', '/account/dashboard');


	RouteScreenProvider.when('/vehicle', 'vehicle/list');
	RouteScreenProvider.redirect('/vehicle/:vehicleId', '/vehicle/:vehicleId/overview');
	RouteScreenProvider.when('/vehicle/:vehicleId/overview', 'vehicle/overview');
	RouteScreenProvider.when('/vehicle/:vehicleId/image/list', 'vehicle/image/list');
	RouteScreenProvider.when('/vehicle/:vehicleId/image/thumbnail', 'vehicle/image/thumbnail');
	RouteScreenProvider.when('/vehicle/:vehicleId/image/add', 'vehicle/image/add');

	RouteScreenProvider.when('/user/', 'user/list');
	RouteScreenProvider.when('/user/:userId', 'user/edit');
	RouteScreenProvider.when('/admin/support/alert-receipt', 'admin/support/alert-receipt');
	RouteScreenProvider.when('/reporting/export/trip-log', 'reporting/export/trip-log');
	RouteScreenProvider.when('/reporting/export/trip-log_location', 'reporting/export/trip-log_location');
	RouteScreenProvider.when('/reporting/export/alerts', 'reporting/export/alerts');
	RouteScreenProvider.when('/reporting/export/mileage', 'reporting/export/mileage');
	RouteScreenProvider.when('/reporting/export/odometer', 'reporting/export/odometer');
	RouteScreenProvider.when('/reporting/export/vehicle-list', 'reporting/export/vehicle-list');
	RouteScreenProvider.when('/reporting/export/mileage_fleet', 'reporting/export/mileage_fleet');
	RouteScreenProvider.when('/reporting/export/last-alert', 'reporting/export/last-alert');
	RouteScreenProvider.when('/reporting', 'reporting/index');
	RouteScreenProvider.when('/reporting/index', 'reporting/index');
	RouteScreenProvider.when('/support/usa', 'support/usa/index');
	RouteScreenProvider.when('/support/usa/delayed-alerts', 'support/usa/delayed-alerts');
	RouteScreenProvider.when('/support/admin/att/born-to-ota', 'delphi/admin/born-to-ota');
	RouteScreenProvider.when('/support/admin/att/missing-maintenance', 'delphi/admin/missing-maintenance');
	RouteScreenProvider.when('/support/admin/att/operation-parts', 'support/admin/att/operation-parts');
	RouteScreenProvider.when('/support/admin/att/vehicle-users', 'support/admin/att/vehicle-users');
	RouteScreenProvider.when('/support/admin/att/report-tracking', 'support/admin/att/report-tracking');
	RouteScreenProvider.when('/support/admin/delayed-alerts', 'support/admin/delayed-alerts');
	RouteScreenProvider.when('/delphi/admin/', 'delphi/admin/index');
	RouteScreenProvider.when('/delphi/admin/born-to-ota', 'delphi/admin/born-to-ota');
	RouteScreenProvider.when('/delphi/admin/expiring-demos', 'delphi/admin/expiring-demos');
	RouteScreenProvider.when('/delphi/admin/missing-maintenance', 'delphi/admin/missing-maintenance');
	RouteScreenProvider.when('/promos/sag-coupons', 'promos/create-sag-coupons');
	RouteScreenProvider.when('/promos/create-sag-coupons', 'promos/create-sag-coupons');
	RouteScreenProvider.when('/promos/sag-coupons', 'promos/sag-coupons');
	RouteScreenProvider.when('/promos/mfg-coupons', 'promos/mfg-coupons');
	RouteScreenProvider.when('/promos/print-coupon', 'promos/print-coupon');
	RouteScreenProvider.when('/changelog', 'changelog/index');

	RouteScreenProvider.when('/error/:errorCode', '/system/error');

});
/** @file */
