angular.module('vehimatics/framework').config(function($provide, $injector) {
	$provide.provider('Links', function() {
		function Links() {
			this.groups = {};
			this.getGroup = function(group) {
				return this.groups[group];
			};

			this.addGroup = function(group, links) {
				this.groups[group] = links;
			};
		}

		var links = new Links();

		this.register = function(groupName, factory) {
			var rez = $injector.invoke(factory);
			links.addGroup(groupName, rez);
		};

		this.$get = function() { return links; };
	});
});
/** @file */
