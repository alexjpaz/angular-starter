angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-reporting-index', {
		pageTitle: 'Reporting Dashboard',
		controller: function ($scope, $filter, $http, $location, UserReports, $injector) {

			UserSession = $injector.get('UserSession');

			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
			});

			UserReports.get( function(results){
				$scope.reportPermissions = results.availableReports;
				$scope.userReports = {};

				angular.forEach($scope.reportPermissions, function(obj, objIndex) {
					angular.forEach(obj, function(objValue, objProp) {
						if (objProp === "reportType") {
							this[objValue] = true;
						}
					}, $scope.userReports);
				});
			});

			$scope.language = {};
			$scope.language.select = "en";

			$scope.$watch('language.select' , function() {


				$http({
					method:'GET',
					url: '/telematics/rest/translate/' + $scope.language.select,		
				}).then(function(translations) {

					$scope.trans = translations.data.translations;
					$scope.rtl = translations.data.rtl;

					if ($scope.rtl === true) {
						document.documentElement.setAttribute("dir", "rtl");
					} else {
						document.documentElement.setAttribute("dir", "ltr");
					}//dom hack for ltr / rtl selection - remove when able
					
				});

			}); 
				
		}

	});

});
/** @file */
