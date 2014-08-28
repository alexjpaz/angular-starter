angular.module('vehimatics/reporting').config(function($provide) {
	$provide.service('ReportsHelper', function(moment, $parse, lodash) {
		this.makeDateTimeSortKey = function(report, format, target, dateKey, timeKey) {
			var parse = {};
			parse.dateKey = $parse(dateKey);
			parse.timeKey = $parse(timeKey);
			angular.forEach(report, function(day) {
				var inputString = parse.dateKey(day);

				if(timeKey) {
					inputString += " "+parse.timeKey(day);
				}

				var parsedDate = moment(inputString, format);
				var unix = parsedDate.unix();

				day[target] = unix;

				if (isNaN(parsedDate)) {
					day[target] = 0;					
				}

			});
		};

		this.getRange = function(data, columnName) {
			var range = {min: null, max: null};

			var values = lodash.pluck(data, columnName); 

			range.min = lodash.min(values) || 0;
			range.max = lodash.max(values) || 0;

			return range;
		};

		this.isInRange = function(row, range) {
			return row >= range.min && r.columnName <= range.max;
		};

		this.filterByRange = function(data, columnName, range) {
			var filtered = [];
			var min = range.min;
			var max = range.max;

			filtered = lodash.pluck(data, function(r) {
				return r[columnName] >= min && r.columnName <= max;
			});

			return filtered;
		};

		this.percentageByRange = function(data, columnName, range) {
			var pct = null;

			if(angular.isUndefined(data) || data === null) {
				return pct;
			}

			var total = data.length;
			var min = range.min;
			var max = range.max;
			var sumInit = 0;

			var filtered = _.reduce(data, function(sum, o) {
				if(o[columnName] >= min && o[columnName] <= max) {
					return sum += 1;
				} else {
					return sum;
				}
			}, sumInit);


			pct = (filtered / total) * 100;

			return pct;
		};
	});
});
/** @file */
