describe("helper `UserSession`,", function() {
	var mock = {};

	beforeEach(function() {
		var m = module('vehimatics');
	});

	beforeEach(inject(KarmaConfig.mock$httpBackend));

	beforeEach(inject(function($injector) {
		mock.UserSession = $injector.get('UserSession');
		mock.$httpBackend = $injector.get('$httpBackend');
		mock.$parse = $injector.get('$parse');
	}));

	describe('when refresh is called,', function() {
		it('should try to GET /account/user', function() {
			mock.$httpBackend.whenGET(/telematics\/rest\/account\/user/).respond({});
			mock.UserSession.refresh();
			mock.$httpBackend.flush();
		});
	});

});
