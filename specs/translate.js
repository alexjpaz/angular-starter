describe("translate", function() {

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

	describe('localStorage', function() {

		beforeEach(function() {
			module('vehimatics');
			var lsAppConfig = {
				languageKey: 'paz'
			};
			localStorage.setItem('App',JSON.stringify(lsAppConfig));
		});

		beforeEach(inject(KarmaConfig.mock$httpBackend));

		beforeEach(inject(function($injector) {
			mock.AppConfig = $injector.get('AppConfig');
			mock.TranslationHelper = $injector.get('TranslationHelper');
			mock.scope = $injector.get('$rootScope').$new();
			mock.$httpBackend = $injector.get('$httpBackend');
			mock.$httpBackend.whenGET(/telematics\/rest\/account\/user/).respond({});
			mock.$httpBackend.whenGET(/telematics\/rest\/translate\/paz/).respond({
				languageKey: 'paz',
				rtl: 'false'
			});
		}));

		it('should read languageCode from localStorage', function() {
			var lsApp = JSON.parse(localStorage.getItem('App'));
			expect(lsApp.languageKey).toEqual('paz');
			expect(mock.AppConfig.languageKey).toEqual('paz');
			expect(lsApp.languageKey).toEqual(mock.AppConfig.languageKey);
		});

		xit('should have updated when `changeLanguage` has been triggered', function() {
			mock.TranslationHelper.setLanguage('dummyRtl', true);
			mock.scope.$apply();
			mock.$httpBackend.flush();

			var lsApp = JSON.parse(localStorage.getItem('App'));

			expect(lsApp.languageKey).toBe('dummyRtl');
			expect(lsApp.languageRtl).toBe(true);

			// end test case

			mock.TranslationHelper.setLanguage('ar');
			mock.scope.$apply();
			mock.$httpBackend.flush();

			var lsApp = JSON.parse(localStorage.getItem('App'));

			expect(lsApp.languageKey).toBe('ar');
			expect(lsApp.languageRtl).toBe(true);

			// end test case

			mock.TranslationHelper.setLanguage('ar', false);
			mock.scope.$apply();
			mock.$httpBackend.flush();

			var lsApp = JSON.parse(localStorage.getItem('App'));

			expect(lsApp.languageKey).toBe('ar');
			expect(lsApp.languageRtl).toBe(true);

		});
	});

	describe('rtl', function() {

		beforeEach(function() {
			module('vehimatics');
			var lsAppConfig = {
				languageKey: 'paz'
			};
			localStorage.setItem('App',JSON.stringify(lsAppConfig));
		});

		beforeEach(inject(KarmaConfig.mock$httpBackend));

		beforeEach(inject(function($injector) {
			mock.AppConfig = $injector.get('AppConfig');
			mock.TranslationHelper = $injector.get('TranslationHelper');
			mock.scope = $injector.get('$rootScope').$new();
			mock.$httpBackend = $injector.get('$httpBackend');
			mock.$httpBackend.whenGET(/telematics\/rest\/account\/user/).respond({});
			mock.$httpBackend.whenGET(/telematics\/rest\/translate\/paz/).respond({
				languageKey: 'paz',
				rtl: 'false'
			});
		}));

		it('should read languageCode from localStorage', function() {
			var lsApp = JSON.parse(localStorage.getItem('App'));
			expect(lsApp.languageKey).toEqual('paz');
			expect(mock.AppConfig.languageKey).toEqual('paz');
			expect(lsApp.languageKey).toEqual(mock.AppConfig.languageKey);
		});

		xit('should have updated when `setLanague` has been called', function() {
			mock.TranslationHelper.setLanguage('dummyRtl', true);
			mock.scope.$apply();
			mock.$httpBackend.flush();

			spyOn(mock.TranslationHelper, 'isLanguageRtl').and.callThrough();

			var lsApp = JSON.parse(localStorage.getItem('App'));

			expect(lsApp.languageKey).toBe('dummyRtl');
			expect(lsApp.languageRtl).toBe(true);

			// end test case

			mock.TranslationHelper.setLanguage('ar');
			mock.scope.$apply();
			mock.$httpBackend.flush();

			expect(mock.TranslationHelper.isLanguageRtl).toHaveBeenCalledWith('ar');
			mock.TranslationHelper.isLanguageRtl.calls.reset();
			var lsApp = JSON.parse(localStorage.getItem('App'));

			expect(lsApp.languageKey).toBe('ar');
			expect(lsApp.languageRtl).toBe(true);

			// end test case

			mock.TranslationHelper.setLanguage('ar', false);
			mock.scope.$apply();
			mock.$httpBackend.flush();

			var lsApp = JSON.parse(localStorage.getItem('App'));

			expect(mock.TranslationHelper.isLanguageRtl).toHaveBeenCalledWith('ar');
			mock.TranslationHelper.isLanguageRtl.calls.reset();
			expect(lsApp.languageKey).toBe('ar');
			expect(lsApp.languageRtl).toBe(true);

			mock.TranslationHelper.setLanguage('ar', true);
			mock.scope.$apply();
			mock.$httpBackend.flush();

			var lsApp = JSON.parse(localStorage.getItem('App'));

			expect(mock.TranslationHelper.isLanguageRtl).not.toHaveBeenCalledWith('ar');
			mock.TranslationHelper.isLanguageRtl.calls.reset();
			expect(lsApp.languageKey).toBe('ar');
			expect(lsApp.languageRtl).toBe(true);

		});
	});

	describe('rtl', function() {

		beforeEach(function() {
			module('vehimatics');
			var lsAppConfig = {
				languageKey: 'someRto',
				languageRtl: true 
			};
			localStorage.setItem('App',JSON.stringify(lsAppConfig));
		});

		beforeEach(inject(function($injector) {
			mock.AppConfig = $injector.get('AppConfig');
			mock.scope = $injector.get('$rootScope').$new();
			mock.TranslationHelper = $injector.get('TranslationHelper');
		}));

		it('should read languageCode and detect a rtl language', function() {
			var lsApp = JSON.parse(localStorage.getItem('App'));
			expect(lsApp.languageKey).toEqual(mock.AppConfig.languageKey);
			expect(mock.AppConfig.languageRtl).toBe(true);
		});

		it('should detect `ar` and `ar_SA` to be rtl', function() {
			expect(mock.TranslationHelper.isLanguageRtl('ar')).toBe(true);
			expect(mock.TranslationHelper.isLanguageRtl('ar_SA')).toBe(true);
		});
	});
});
