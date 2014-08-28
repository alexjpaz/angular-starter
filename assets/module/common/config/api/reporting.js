angular.module('vehimatics').config(function(ResourceProvider) {
	ResourceProvider.register('ReportingUbi', '/reporting/stats/ubi');
	ResourceProvider.register('LastAlert', '/reporting/vehicle/list/lastalert');
	ResourceProvider.register('VehicleReportingList', '/reporting/vehicle/list');
	ResourceProvider.register('VehicleReportingSingle', '/reporting/vehicle/:vehicleId/:reportType');
	ResourceProvider.register('VehicleReportingFleet', '/reporting/fleet/:busEntId/:reportType');
	ResourceProvider.register('UserReports', '/account/user/reports');
	ResourceProvider.register('ReportTracking', '/track/reports');
});
/** @file */
