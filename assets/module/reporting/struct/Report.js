angular.module('vehimatics/reporting').config(function($provide) {
	$provide.factory('Report', function($http, ReportsHelper) {
		/** 
		 * Report class that represents an export report's data, filters, columns, ranges, orderBy, etc.
		 * @see {@link module:vehimatics/reporting.filter#exportReport}
		 * @class
		 * @memberof module:vehimatics/reporting
		 */
		 function Report() {
			 var that = this;

			 /**
			  * Binding that represents the data from the reporting service. This property should be set using [$setData()]{@link module:vehimatics/reporting.Report#$setData}
			  * @member */
			  this.data = [];
			  /** @member */
			  this.filter = {};
			  /** @member */
			  this.filterText = '';
			  /** @member */
			  this.limitTo = 10;
			  /** @member */
			  this.range = {};
			  /** @member */
			  this.columns = {};
			  /** @member */
			  this.orderBy = "";
			  /** @member */
			  this.orderByReverse = false;
			  /** @member */

			  /** @method */
			  this.$setData = function(data, callback) {
				  this.data = data;

				  // Each column
				  angular.forEach(this.columns, function(col,key) {
					  var filter = this.filter[key];
					  var range = null;
					  var sortKey = key;

					  if(col.type === 'date') {
						  ReportsHelper.makeDateTimeSortKey(data, col.dateFormat, sortKey, col.dateKey, col.timeKey);
					  }


					  if(filter) {
						  // Setup Filter
						  range = ReportsHelper.getRange(data, sortKey);
						  filter = angular.copy(range);

						  filter.fn = function(row) {
							  return (row[key] >= filter.min && row[key] <= filter.max);
						  };

						  this.filter[key] = filter;
						  this.range[key] = range;
					  }
				  }, this);

				  if(angular.isFunction(callback)) {
					  callback.call();
				  }
			  };

			  /** @method */
			  this.$addColumn = function(col, name, type) {
				  this.columns[col] = {
					  name: name,
					  visible: true,
					  type: type || 'auto'
				  };
			  };

			  /** @method */
			  this.$addDateColumn = function(col, name, dateFormat, dateKey, timeKey) {
				  this.columns[col] = {
					  name: name,
					  visible: true,
					  type: 'date',
					  dateFormat: dateFormat,
					  dateKey: dateKey,
					  timeKey: timeKey
				  };
			  }

			  /** @method */
			  this.$addHiddenColumn = function(col, name, type) {
				  this.columns[col] = {
					  name: name,
					  visible: false,
					  type: type || 'auto'
				  };
			  };

			  /** @method */
			  this.$get = function(url, params) {
				  return $http({
						  method: 'GET',
						  url: url,
						  params: params
				  });
			  }

			  /** @method */
			  this.$addRangeFilter = function(col) {
				  this.range[col] = true;
				  this.filter[col] = true;			
			  };
		 }

		 return Report;
	});
});
/** @file */
