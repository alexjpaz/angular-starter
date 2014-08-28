angular.module('vehimatics').config(function($provide) {
	$provide.constant('Collection', function Collection(construct) {
		var list = [];
		var construct = construct;

		this.add = function() {
			var o = new construct();
			construct.apply(o, arguments);
			list.push(o);
		};

		this.get = function(idx) {
			if(typeof idx === 'undefined') {
				return list;
			} else { 
				return list[idx];
			}
		};

		this.toArray = function() {
			return list;
		}
	});

	$provide.constant('Header', function Header(name, key) {
		this.name = name;
		this.key = key;
	});

	$provide.factory('HeaderCollection', function(Header, Collection) {
		function HeaderCollection() {
			Collection.call(this, Header);
		}

		return HeaderCollection;
	});
});
/** @file */
