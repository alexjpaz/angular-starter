angular.module('vehimatics/framework').config(function($provide) {
	$provide.provider('StringHelper', function() {
		function _dashToCamel(g) { 
			return g[1].toUpperCase() 
		}

		this.dashToCamel = function(string) {
			return string.replace(/-([a-z])/g, _dashToCamel);
		};

		this.$get = function() {
			return this;
		};
	});

});
/** @file */
