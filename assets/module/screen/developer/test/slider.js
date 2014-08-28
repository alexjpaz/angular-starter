angular.module('vehimatics/screen').config(function(ScreenProvider) {
	ScreenProvider.register('screen-developer-test-slider', {
		controller: function($scope, $filter, $timeout, ReportsHelper, Report, lodash) {
			var r = new Report();
			r.$addColumn('name', 'Name', 'text');
			r.$addColumn('idle', 'Idle', 'number');
			r.$addHiddenColumn('bar', 'Bar');
			r.$addDateColumn('startDateTime','Start Time','YYYY-MM-DD', 'startDate', 'startTime');

			r.$addRangeFilter('idle'); 
			r.$addRangeFilter('bar'); 
			r.$addRangeFilter('startDateTime');

			$scope.r = r;

			$scope.getReport = function() {
				var data = [];
				for(var i=0;i<10;i++) {
					data.push({
						name: lodash.sample(['Alex','Bob','Jeff']) +" "+ lodash.sample(['Alpha','Beta','Gamma']),
						idle: i,
						startDate: moment().add(i,'days').format('YYYY-MM-DD'),
						startTime: moment().add(i,'days').format('hh:mmA'),
						bar: i,
					});
				}
				
				r.$setData(data);
			};

			$scope.getReport();
		}
	});
});
/** @file */
