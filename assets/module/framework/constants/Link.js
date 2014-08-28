angular.module('vehimatics/framework').config(function($provide) {
	$provide.constant('Link', function(href, text, id, role) {
		this.href = href;
		this.text = text;
		this.id = id;
		this.role = role || ['ALL'];
		this.icon = '';
		this.group = null;
		this.ignoreQuery = true;
		this.isRegex = false;
	});
});

/** @file */
