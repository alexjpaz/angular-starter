angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-user-lookup', {
		pageTitle: 'User Lookup Utility',
		controller: function ($http, $scope, $injector, $animate, GetUser, SecurityInfo, ResetPassword, $location) {

			removeParams = {};
			$scope.form = {};
			$scope.query = {};
			$scope.filter = {};

			$animate.enabled(false);
			UserSession = $injector.get('UserSession');

			$scope.reportLoading = false;
			$scope.page = {};
			$scope.page.title = 'Create Coupons by Service/DTC';
			$scope.page.dynamicButton1 = "Lookup User";
			$scope.page.dynamicButton2 = "Hide Other Users";
		
			UserSession.onRefresh(function(e, session) {
				$scope.user = session;
			});

			$scope.form.lookupMethods = [{
				'value': 'default', 
				'label': 'Select Lookup Method...'	    
			}, {
				'value': 'loginId', 
				'label': 'Login ID'	    
			}, {
				'value': 'emailAddress', 
				'label': 'Email Address'	    
			}, {
				'value': 'phoneNo', 
				'label': 'Phone Number (no dashes)'	    
			}, {
				'value': 'lastName', 
				'label': 'Last Name'	    
			}];

			$scope.form.lookupSelect = $scope.form.lookupMethods[0];

			function clear(){
				$scope.userInfo = null;
				$scope.securityInfo = null;
				$scope.password = {};
				
			}

			$scope.submit = function () {
				clear();

				$scope.page.dynamicButton1 = "Retrieving User...";
				$scope.reportLoading = true;	

				userParams = $scope.query;

				GetUser.query(userParams, function(results){

					$scope.reportLoading = false;
					$scope.userInfo = results;
					$scope.page.dynamicButton1 = "Lookup User";
					$scope.query = {};
					$scope.userInfo.hideOthers = false;

					if ($scope.userInfo) {
						angular.forEach($scope.userInfo, function(obj, objIndex) {
							angular.forEach(obj.jsonEmailAddresses, function(obj2, obj2Index) {
								angular.forEach(obj2, function (objValue, objProp){
									if (objValue == "Primary Email") {
										obj.primaryEmail = obj2.emailAddress;
									}
								});							
							});
						});
					}

					if (results.length < 1) {
						$scope.userInfo = {noResults: "Sorry, no results were found."};
					}

					

				});

				

			} // end submit function

			$scope.viewSecurity = function (userObj) {

				$scope.userInfo.hideOthers = true;
				userObj.hideOthers = true;
				$scope.page.dynamicButton2 = "Show All Users";

				securityParam = {personId : userObj.personId};
				
				SecurityInfo.get(securityParam, function(results){

					$scope.reportLoading = false;
					$scope.securityInfo = results;
					$scope.securityInfo.personId = userObj.personId;
					$scope.securityInfo.firstName = userObj.firstName;
					$scope.securityInfo.lastName = userObj.lastName;
					$scope.securityInfo.primaryEmail = userObj.primaryEmail;
					$scope.securityInfo.loginId = userObj.loginId;

					if (results.length < 1) {
						$scope.securityInfo = {noResults: "Sorry, no results were found. Double check that there weren't any typos and try to verify that you are entering the correct lookup info for the user. "};
					}

				});

				

			}

			$scope.pwdReset = function () {

				//loginParam = {loginId: $scope.securityInfo.loginId};
				postData = {loginId: $scope.securityInfo.loginId};


				ResetPassword.postArray(postData, function(results){

					$scope.resetResponse = results[0];
					$scope.password = {};
					$scope.password.reset = true;

				});

			}

			$scope.hideOthers = function (userObj) {

				$scope.userInfo.hideOthers = !$scope.userInfo.hideOthers;
				userObj.hideOthers = !userObj.hideOthers;

				if ($scope.userInfo.hideOthers) {
					$scope.page.dynamicButton2 = "Show Other Users";	
				}
				if (!$scope.userInfo.hideOthers) {
					$scope.page.dynamicButton2 = "Hide Other Users";	
				}
				
			}

			
		}

	});

});
/** @file */
