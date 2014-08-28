describe("template", function() {

	var mock = {};

	beforeEach(function() {
		var m = module('vehimatics');
	});


	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		$httpBackend.whenGET(/telematics/).respond({});

		$httpBackend.whenGET(/screen\/developer\/test/).respond({}); // ignore auto resolve

		$httpBackend.whenPOST(/telematics/).respond({});
		mock.componentIds = $injector.get('Component').__componentIds;
		mock.screens = $injector.get('RouteScreen').__screens;
	}));

	beforeEach(function(){
		jasmine.addMatchers({
				toBeErrorFree: function(util) {
					return {
						compare: function(actual, expected) {
							expected = [];
							var result = {};

							result.pass = (actual.length === 0);

							result.message = "";

							for(var i=0;i<actual.length;i++) {
								result.message += "\nCould not compile `"+actual[i].name+"` caused by: \n";
								result.message += actual[i].error.stack+"\n\n";
							}

							return result; 
						}
					}
				}
		});

	});


	describe('smoke test:', function() {
		var componentFailures = [];
		var screenFailures = [];

		beforeEach(inject(function($compile, $rootScope, $templateCache, $injector, $route, $location, $httpBackend, jqPickadate) {
			mock.compile = $compile;
			mock.$rootScope = $rootScope;
			mock.scope = $rootScope.$new();
			mock.templateCache = $templateCache;
			mock.route = $route;
			mock.location = $location;
			mock.$httpBackend = $httpBackend;

			spyOn(jqPickadate,'bind').and.callFake(function() {
				console.debug('pickadate workaround');
			});
		}));

		function compileIt(name) {
			mock.scope = mock.$rootScope.$new();
			var el = null;
			try {
				el = mock.compile('<div '+name+'></div>')(mock.scope); 
				mock.scope.$apply();
				try {
					mock.$httpBackend.flush();
				} catch(e) {
				}

			} catch(e) {
				var error = {
					name: name,
					error: e
				};
				componentFailures.push(error);
			}
			if(el != null) {
				el.remove();
			}

			mock.scope.$destroy();
		}

		function compileScreen(screen) {
			mock.scope = mock.$rootScope.$new();
			try {
				var template = mock.templateCache.get(screen);
				var el = null;
				el = mock.compile(template)(mock.scope); 
				mock.scope.$apply();
				try {
					mock.$httpBackend.flush();
				} catch(e) {
				}

			} catch(e) {
				var error = {
					name: screen,
					error: e
				};
				screenFailures.push(error);
			}

			if(el != null) {
				el.remove();
			}

			mock.scope.$destroy();
		}

		it('components', function() {
			for(var i=0;i<mock.componentIds.length;i++) {
				compileIt(mock.componentIds[i]);
			}
			expect(componentFailures).toBeErrorFree();
		});

		it('screens', function() {
			for(var i=0;i<mock.screens.length;i++) {
				compileScreen(mock.screens[i]);
			}
			expect(screenFailures).toBeErrorFree();
		});

	});
});
