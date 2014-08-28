describe("directive: bind-tr", function() {

	var mock = {};

	beforeEach(function() {
		var m = module('vehimatics');

		angular.module('vehimatics').directive('bindTr', function($compile, $filter){

			return {
				link: function(scope, element, attrs) {
					scope.$watch(attrs.bindTr, function(value) {
						// jshint -W041
						element.text(value == undefined ? '' : $filter('trn')(value));
					});
				}
			}
		});
	});

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		$httpBackend.whenGET(/telematics/).respond({});
	}));

	describe('directive', function() {
		var dummy = {
			tr: 'This should get translated'
		};

		var expected = {
			tr: 'It got translated'
		};

		beforeEach(inject(function($compile, $rootScope) {
			mock = {};
			mock.compile = $compile;
			mock.scope = $rootScope.$new();
		}));

		beforeEach(inject(function($filter, gettextCatalog) {
			mock.tr = $filter('trn');
			gettextCatalog.currentLanguage = 'dummy';
			var strings = {};
			strings[dummy.tr] = expected.tr;
			gettextCatalog.setStrings('dummy', strings);
		}));

		it('should translate and bind', function() {
			mock.scope.data = {'dummy': dummy.tr};

			var html = "<fake bind-tr='data.dummy'>REPLACED</fake>";
			var el = mock.compile(html)(mock.scope);

			mock.scope.$apply();

			expect(el.html()).not.toBe('REPLACED');
			expect(el.html()).toBe(expected.tr);
		});
	});
});
