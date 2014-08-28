angular.module('vehimatics/screen').config(function(ScreenProvider) {
	ScreenProvider.register('screen-developer-test-report', {
		controller: function($scope, Collection) {
			var c = new Collection(function(name) {
				this.name = name;
			});

			c.add('aaa');
			c.add('bbb');
			c.add('ccc');
			c.add('ddd');

			$scope.columns = c.get();
		}
	});
});
/** @file */
