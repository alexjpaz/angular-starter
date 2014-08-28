angular.module('vehimatics').config(function($provide) {
	$provide.factory('XmlHelper', function() {
		var x2js = new X2JS();
		function XmlHelper() {
			this.toJson = function(xml) {
				return x2js.xml_str2json(xml);
			};
		}

		var instance = new XmlHelper();
		return instance;
	});

});
/** @file */
