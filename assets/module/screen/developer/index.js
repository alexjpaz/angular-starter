angular.module('vehimatics/screen').config(function(ScreenProvider) {
	ScreenProvider.register('screen-developer-index', {
			controller: function($scope, Translation, gettextCatalog, UserAccount) {
				$scope.lang = function(code) {
					gettextCatalog.currentLanguage = code;

					$scope.currentLanguage = code; 

					Translation.get({
							code: code
					}, function(translations) {
						$scope.translations = translations;
						gettextCatalog.setStrings(code, translations);
					});
				};

				$scope.currentUser = UserAccount.get();

				$scope.togglePermission = function(permKey) {
					var p = $scope.currentUser.globalPermissions[permKey]
					$scope.currentUser.globalPermissions[permKey] = !p; 
				};
			}
	});
});
/** @file */
