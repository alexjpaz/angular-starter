describe("directive `if-role`,", function() {

	var mock = {};

	beforeEach(function() {
		var m = module('vehimatics');
	});

	beforeEach(inject(KarmaConfig.mock$httpBackend));

	beforeEach(inject(function($injector) {
		mock.UserSession = $injector.get('UserSession');
		mock.$httpBackend = $injector.get('$httpBackend');
		mock.$httpBackend.whenGET(/telematics\/rest\/account\/user/).respond({});
	}));

	describe('based on the session user,', function() {

		beforeEach(inject(function($compile, $rootScope, UserSession) {
			mock = {};
			mock.compile = $compile;
			mock.scope = $rootScope.$new();
			mock.UserSession = UserSession;

			jasmine.addMatchers(vehimaticsMatchers);

		}));

		it('hide when using strings', function() {
			spyOn(mock.UserSession, 'userHasRole').and.returnValue(false)
			var html = "<fake if-role='INVALID_ROLE'>I should not see this</fake>";
			var el = mock.compile(html)(mock.scope);
			mock.scope.$apply();

			expect(el).toBeHidden();
		});

		it('show when using strings', function() {
			spyOn(mock.UserSession, 'userHasRole').and.returnValue(true)
			var html = "<fake if-role='ADMIN'>I should see this</fake>";
			var el = mock.compile(html)(mock.scope);
			mock.scope.$apply();

			expect(el).toBeVisible();
		});

	});
});
