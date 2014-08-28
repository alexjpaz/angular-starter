KarmaConfig = (function() {
	function KarmaConfig() {
		this.watchLocationChange = false;
		this.logHttp = false;

		this.mock$httpBackend = function($injector) {
			//console.debug('mock$httpBackend: Bypassing http errors');
			$httpBackend = $injector.get('$httpBackend');
			$httpBackend.whenGET(/telematics\/rest\/translate/).respond({});
			$httpBackend.whenGET(/telematics\/rest\/account\/mobileproviders/).respond([]);
			$httpBackend.whenGET(/telematics\/rest\/manage\/countries/).respond([]);
		};
	}

	return new KarmaConfig();
})();

angular.module('vehimatics').constant('ParamAngularGlobalHack', {
	reloadOnPathChange: false,
	enableCORS: false
});

angular.module('vehimatics').config(function($httpProvider) {
	if(KarmaConfig.logHttp) {
		$httpProvider.interceptors.push(function($q) {
			return {
				'request': function(config) {
					console.debug('request made', config.method, config.url, config.params);
					return config || $q.when(config);
				},

				'requestError': function(response) {
					console.debug('requestERROR made', config.url);
					return $q.reject(response);
				}
			};
		});
	}

});

/*
 * This config block prevents the error "Some of the tests did a full page reload!".
 */
 angular.module('vehimatics').config(function($locationProvider) {
	 $locationProvider.html5Mode(false);

 });

 angular.module('vehimatics').run(function($rootScope, App) {
	 App.config.allowRedirects = false;

	 if(KarmaConfig.watchLocationChange) {
		 $rootScope.$on('$locationChangeSuccess', function(e, path) {
			 console.warn('location changed to', path);
		 });
	 }

 });

 vehimaticsMatchers = {
	 toBeVisible: function(util) {
		 return {
			 compare: function(actual, expected) {
				 var result = {};
				 result.pass = !actual.hasClass('ng-hide');
				 return result; 
			 }
		 }
	 },
	 toBeHidden: function(util) {
		 return {
			 compare: function(actual, expected) {
				 var result = {};
				 result.pass = actual.hasClass('ng-hide');
				 return result; 
			 }
		 }
	 }
 };
