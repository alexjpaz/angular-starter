describe("filter `ifRole`", function() {

	var mock = {};

	beforeEach(function() {
		module('vehimatics');
	});


	beforeEach(inject(KarmaConfig.mock$httpBackend));

	beforeEach(inject(function($injector) {
		mock.UserSession = $injector.get('UserSession');
		mock.$httpBackend = $injector.get('$httpBackend');
		mock.$httpBackend.whenGET(/telematics\/rest\/account\/user/).respond({});
	}));


	beforeEach(inject(function($rootScope, $filter, jQuery, UserSession, $compile, $parse, $interpolate) {
		mock = {};
		mock.tr = $filter('ifRole');
		mock.UserSession = UserSession;
		mock.$parse = $parse;
		mock.$interpolate = $interpolate;
		mock.$compile = $compile;
		mock.scope = $rootScope.$new();
	}));

	describe('should work with $filter', function() {
		it('should return blank if user does not have role',function() {
			spyOn(mock.UserSession, 'userHasRole').and.returnValue(false)
			var result = mock.tr('Should be hidden', 'FAKE_ROLE');
		expect(result).toEqual("");
		});

		it('should echo string if user does have role',function() {
			spyOn(mock.UserSession, 'userHasRole').and.returnValue(true)
			var result = mock.tr('it should show', 'REAL_ROLE');
		expect(result).toEqual("it should show");
		});
	});

	describe('should work with $interpolate', function() {
		it('will show',function() {
			spyOn(mock.UserSession, 'userHasRole').and.returnValue(true);
			var parseResult = mock.$interpolate('{{ 1 + 1 | ifRole:"REAL_ROLE" }}')(mock.scope)
			expect(mock.UserSession.userHasRole).toHaveBeenCalledWith('REAL_ROLE');
		expect(parseResult).toBe('2');
		});

		it('will hide', function() {
			spyOn(mock.UserSession, 'userHasRole').and.returnValue(false)
			parseResult = mock.$interpolate('{{ 1 + 1 | ifRole:"FAKE_ROLE" }}')(mock.scope)
			expect(mock.UserSession.userHasRole).toHaveBeenCalledWith('FAKE_ROLE');
		expect(parseResult).toBe('');
		});

	});

	describe('should work with $compile', function() {
		it('will show',function() {
			spyOn(mock.UserSession, 'userHasRole').and.returnValue(true)
			var parseResult = mock.$compile('<fake>{{ 1 + 1 | ifRole:"REAL_ROLE" }}</fake>')(mock.scope)
			mock.scope.$apply();
		expect(mock.UserSession.userHasRole).toHaveBeenCalledWith('REAL_ROLE');
		expect(parseResult.text()).toBe('2');
		});

		it('will hide', function() {
			spyOn(mock.UserSession, 'userHasRole').and.returnValue(false)
			var parseResult = mock.$compile('<fake>{{ 1 + 1 | ifRole:"REAL_ROLE"	}}</fake>')(mock.scope)
			mock.scope.$apply();
		expect(parseResult.text()).toBe('');
		expect(mock.UserSession.userHasRole).toHaveBeenCalledWith('REAL_ROLE');
		});

	});
});
