angular.module('vehimatics/reporting').config(function($filterProvider) {
	/**
	 * Enhanced version of the "filter" filter.
	 * @function module:vehimatics/reporting.filter#exportReport
	 * @arg {object[]} arr
	 * @arg {Report} report 
	 */
	 $filterProvider.register('exportReport', function($filter, lodash) {
		 return function (arr, report) {
			 if(angular.isUndefined(report)) {
				 return arr;
			 }

			 // Text Search
			 var tokens = report.filterText.split(' ');
			 var filterResults = [];

			 var tokens = filterOpt.split(' ');
			 var filterResults = [];

			 // Text Search
			 angular.forEach(tokens, function(t) {
				 var results = $filter('filter')(arr, t);
				 Array.prototype.push.apply(filterResults, results);
			 });

			 uniqueResults = lodash.unique(filterResults);

			 // Slider Filters
			 angular.forEach(report.filter, function(f,k) {
				 uniqueResults = $filter('filter')(uniqueResults,f.fn);
			 });

			 // OrderBy
			 uniqueResults = $filter('orderBy')(uniqueResults, report.orderBy,report.orderByReverse);

			 // LimitTo
			 uniqueResults = $filter('limitTo')(uniqueResults, report.limitTo);

			 report.pct = (uniqueResults.length / arr.length) * 100;

			 return uniqueResults;
		 };
	 });
});
/** @file */
