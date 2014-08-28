describe("directive: vehimatics", function() {

	var mock = {};

	beforeEach(function() {
		localStorage.setItem('App','{}');
	});


	describe('vehimatics directive', function() {

		beforeEach(function() {
			module('vehimatics');
		});

		beforeEach(inject(function($compile, $rootScope) {
			mock = {};
			mock.compile = $compile;
			mock.scope = $rootScope;
		}));


		it('should change the html tag direction', function() {
			var html = "<fake vehimatics></fake>";
			var el = mock.compile(html)(mock.scope);

			mock.scope.$broadcast('TranslationHelper.changeLanguage', 'dummyRtl', true);

			expect(el.attr('lang')).toEqual('dummyRtl');
			expect(el.attr('dir')).toEqual('rtl');
		});
	});
});
