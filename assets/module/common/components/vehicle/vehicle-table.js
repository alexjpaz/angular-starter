angular.module('vehimatics').config(function($compileProvider, $filterProvider, ComponentProvider, DirectiveProvider) {
	/**
	 * @function module:vehimatics.filter#vehicleFilter
	 */
	 $filterProvider.register('vehicleFilter', function($parse) {
		 var keys = [];
		 keys.push($parse('vehicle.vehicleNickname'));
		 keys.push($parse('vehicle.vechicleText'));
		 keys.push($parse('vehicle.vin'));
		 keys.push($parse('vehicleOwner.vehicleOwnerName'));
		 keys.push($parse('servicingShop.businessName'));
		 keys.push($parse('vehiclePackage.packageDesc'));

		 function vehicleFilter(array, text) {
			 if(angular.isUndefined(array) || text == null || angular.isUndefined(text)) {
				 return array
			 }

			 var outarr = [];
			 var regex = new RegExp('.*'+text+'.*', 'i');
			 angular.forEach(array, function(v) {
				 var matches = false;
				 angular.forEach(keys, function(k) {
					 if(!matches) {
						 matches = regex.test(k(v));
					 };
				 });
				 if(matches) {
					 outarr.push(v);
				 }
			 });
			 return outarr;
		 }

		 return vehicleFilter;
	 });

	 /**
	  * @function module:vehimatics.components#vehicle-table
	  * @type {module:vehimatics/framework.Component}
	  */
	  ComponentProvider.register('vehicle-table', {
			  componentGroup: 'vehicle',
			  controller: function($scope, VehicleListStatic, $parse) {
				  $scope.filter = {
					  rows: 10,
					  page: 1,
					  search: function(item) {


						  var test = function(it) {
							  if(it != null && angular.isDefined(it)) {
								  if(regex.test(it)) {
									  return true;
								  }
							  }
							  return false;
						  };

						  if(test(item.vehicle.vehicleNickname)) {
						  }



						  console.debug('s', arguments);
					  }
				  };

				  var each = angular.forEach;

				  VehicleListStatic.query(function(list) {
					  $scope.vehicles = list;
				  }, function() {
					  $scope.error = true;
				  });

				  $scope.setSort = function(key) {
					  if($scope.filter.sort === key) {
						  $scope.filter.reverse = !$scope.filter.reverse;
					  } else {
						  $scope.filter.reverse = false;
					  }


					  $scope.filter.sort = key;
				  };

				  $scope.search = function() {
					  console.debug('search', arguments);
				  };
			  }
	  });
});


/** @file */
