angular.module('vehimatics/framework').config(function($provide, Link) {
	$provide.constant('NavigationGroup', function NavigationGroup() {
		var that = this;
		this.links = [];
		this.add = function(href, text, id, role) {
			var link = new Link(href, text, id);
			link.role = role || ['ALL'];
			this.links.push(link);
			return that;
		};

		this.addIgnoreQuery = function(href, text, id, role) {
			var link = new Link(href, text, id);
			link.ignoreQuery = false;
			link.role = role || ['ALL'];
			this.links.push(link);
			return that;
		};

		this.addRegex = function(href, text, id, role) {
			var link = new Link(href, text, id);
			link.isRegex = true;
			this.links.push(link);
			return that;
		};

		this.group = function(text, id, role) {
			var link = new Link('#', text, id);
			link.role = role || ['ALL'];
			this.links.push(link);
			link.group = new NavigationGroup();
			return link.group; 
		};
	});
});
/** @file */
