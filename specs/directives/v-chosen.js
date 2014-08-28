describe("directive `v-chosen`,", function() {

	var mock = {};
	var jQuery = window.jQuery || window.$;

	beforeEach(function() {
		var m = module('vehimatics');
	});

	beforeEach(inject(KarmaConfig.mock$httpBackend));

	beforeEach(inject(function($injector) {
		mock.UserSession = $injector.get('UserSession');
		mock.$httpBackend = $injector.get('$httpBackend');
		mock.$httpBackend.whenGET(/telematics\/rest\/account\/user/).respond({});
	}));

	beforeEach(inject(function($compile, $rootScope, UserSession) {
		mock = {};
		mock.compile = $compile;
		mock.scope = $rootScope.$new();
		mock.UserSession = UserSession;

		jasmine.addMatchers(vehimaticsMatchers);

	}));

	describe('compiled with `ng-repeat`', function() {

		mock.html = "";

		beforeEach(function() {
			var html = "";
			html += "<fake>";
			html += "<select  ng-model='test' v-chosen>";
			html += "    <option ng-repeat='o in opts' value='{{ o }}'>{{ o }}</option>";
			html += "</select>";
			html += "</fake>";
			mock.html = html;
			var el = mock.compile(html)(mock.scope);
			mock.el = el;
			mock.elVchosen = $(el).find('[v-chosen]') 
			mock.scope.opts = ['leo','mike','ralph','don'];
			mock.scope.$apply();
			expect(mock.scope.test).toBeUndefined();
		});

		it('should bind model to chosen', function() {
			var choseContainer = jQuery(mock.el).find('.chosen-container a span');

			mock.scope.test = 'don';
			mock.scope.$apply();
			expect(choseContainer.text()).toBe(mock.scope.test);

			mock.scope.test = 'INVALID';
			mock.scope.$apply();
			expect(choseContainer.text()).toBe('Select an Option');

		});

		it('should bind chosen to model', function() {
			mock.elVchosen.chosen().change();
	
			mock.scope.$apply();

			expect(mock.scope.test).toBe('leo');
		});

		it('should support rtl', function() {
			mock.scope.$broadcast('TranslationHelper.changeLanguage', 'fakeRtlLang', true);
			mock.scope.$apply();
			expect(mock.el.find('.chosen-container.chosen-rtl').size()).toBe(1);
		});
	});

	xdescribe('compiled with `ng-options`', function() {

		mock.html = "";

		beforeEach(function() {
			var html = "";
			html += "<fake>";
			html += "<select  ng-model='test' v-chosen ng-options='o for o in o'>";
			html += "</select>";
			html += "</fake>";
			mock.html = html;
			var el = mock.compile(html)(mock.scope);
			mock.el = el;
			mock.elVchosen = $(el).find('[v-chosen]') 
			mock.scope.opts = ['leo','mike','ralph','don'];
			mock.scope.$apply();
			expect(mock.scope.test).toBeUndefined();
		});

		it('should bind model to chosen', function() {
			console.debug(mock.el);
			var choseContainer = jQuery(mock.el).find('.chosen-container a span');

			mock.scope.test = 'don';
			mock.scope.$apply();
			console.debug(mock.el);
			expect(choseContainer.text()).toBe(mock.scope.test);

			mock.scope.test = 'INVALID';
			mock.scope.$apply();
			expect(choseContainer.text()).toBe('Select an Option');

		});

		it('should bind chosen to model', function() {
			mock.elVchosen.chosen().change();
	
			mock.scope.$apply();

			expect(mock.scope.test).toBe('leo');
		});
	});

});
