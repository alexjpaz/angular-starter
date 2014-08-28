angular.module('vehimatics/screen').config(function(ScreenProvider, $provide) {

	ScreenProvider.register('screen-change-log', {
		pageTitle: "Change Log",
		controller: function ($scope, $filter, $http, $location, ReportsHelper, ChangeLog) {

			//$scope.loading = false;
			$scope.loading = true;
			$scope.url = $location.search();
			$scope.urLOL = $location.search();
			
			$scope.filter = {};
			$scope.sort = {};
			
			

			function clear(){
				$scope.changeLog = null;
			}
	
			$scope.getChangeLog = function() {
				
				clear();
				$scope.loading = true;

				//var messagingParams = {showAll: true};

				ChangeLog.query(function(results){

					$scope.loading = false;
					$scope.changeLog = results;

					//console.log(results.length);

					if (results.length < 1) {

						$scope.changeLog = [
							{

							    "messageId": "53ee1dd6e4b0eb957e557e6c",
							    "startDate": "08212014",
							    "startTime": "5:00 AM",
							    "endDate": "12312014",
							    "endTime": "11:00 PM",
							    "messageTitle": "New Feature! Maintenance Center",
							    "messageBody": '<img class=\"pull-left margin-right_10 img300\" src=\"//s3.amazonaws.com/bucketimgs3/shared/img/changelog/maintenance-center-navbar-link.png\"></img> <p>Up in the top navigation, you\'ll now notice your new and improved <a href=\"/carcare/vehicles/maintenance\">Maintenance Center</a>! The Maintenance Center is a single page for managing and tracking the maintenance and health of your vehicles. You can use it to see upcoming maintenance due, check out any Diagnostic Trouble Codes that may be causing your check engine light to come on, look at your vehicle\'s complete OE Maintenance Schedule and more...</p><p>There\'s a LOT you can do here, and on top of all that, your servicing shop and participating manufacturers can offer you coupons based on your current vehicle health and upcoming maintenance due. Make sure to check it out often, especially before coming in to the shop - you can save yourself a lot of time and money!</p>',
							    "dashMessage": false,
							    "changeLogMessage": true,
							    "submittedByUser": 2446,
							    "lastUpdatedDate": 1408114134701,
							    "lastUpdatedUser": 2446,
							    "notifyNowAdresses": null,
							    "status": "ACTIVE",
							    "urgency": "LOW",
							    "category": "NEW_FEATURE",
							    "subscriberIds": [
							        1
							    ],
							    "businessRoleTypes": [ ]

							},
							{

							    "messageId": "number2",
							    "startDate": "08212014",
							    "startTime": "5:00 AM",
							    "endDate": "12312014",
							    "endTime": "11:00 PM",
							    "messageTitle": "New Feature! Reporting",
							    "messageBody": '<img class=\"pull-left margin-right_10 margin-right_10 img300\" src=\"//s3.amazonaws.com/bucketimgs3/shared/img/changelog/reporting-trip-log-example.png\"></img><p>We now have an advanced suite of <a href=\"/carcare/reporting/\">Reporting Utilities</a> available. Reporting allows you to view detailed info about your vehicles and how they are driven over long periods of time. Depending on your package, you can view and export info about how and where your vehicles are driven, mileage in a given period, summaries of alerts and vehicle health, and more. All of these reports can be exported as CSV to archive, print, or share with others, and more are in development.</p>',
							    "dashMessage": false,
							    "changeLogMessage": true,
							    "submittedByUser": 2446,
							    "lastUpdatedDate": 1408114134701,
							    "lastUpdatedUser": 2446,
							    "notifyNowAdresses": null,
							    "status": "ACTIVE",
							    "urgency": "LOW",
							    "category": "NEW_FEATURE",
							    "subscriberIds": [
							        1
							    ],
							    "businessRoleTypes": [ ]

							},
							{

							    "messageId": "number3",
							    "startDate": "08212014",
							    "startTime": "5:00 AM",
							    "endDate": "12312014",
							    "endTime": "11:00 PM",
							    "messageTitle": "New Feature! Need Help? Frequently Asked Questions",
							    "messageBody": '<img class=\"pull-left margin-right_10 margin-bottom_10 img300\" src=\"//s3.amazonaws.com/bucketimgs3/shared/img/changelog/faq-trip-log-example.png\"></img><p>You\'ll start seeing Frequently Asked Questions (FAQ) and Help available throughout the site. You can click <span class="needHelp_collapsed linkStyle_color textPointer"><span class="needHelp_text"><strong>Need Help</strong> </span><i class="icon-question-sign needHelp_icon"></i></span> or the question mark icon (<i class=\"icon-question-sign linkStyle_color\"></i>) to view help info about that page, section, or topic. As time goes on we will be implementing more and more of this throughout the site to help improve your experience. If you\'re having problems (or have had problems) understanding something, <a href=\"/carcare/feedback.jsp\">let us know</a> and we\'ll add a topic for it. We\'re Listening!</p>',
							    "dashMessage": false,
							    "changeLogMessage": true,
							    "submittedByUser": 2446,
							    "lastUpdatedDate": 1408114134701,
							    "lastUpdatedUser": 2446,
							    "notifyNowAdresses": null,
							    "status": "ACTIVE",
							    "urgency": "LOW",
							    "category": "NEW_FEATURE",
							    "subscriberIds": [
							        1
							    ],
							    "businessRoleTypes": [ ]

							},
							{

							    "messageId": "number5",
							    "startDate": "07142014",
							    "startTime": "5:00 AM",
							    "endDate": "12312014",
							    "endTime": "11:00 PM",
							    "messageTitle": "New Feature! 24/7 Support Call Centers",
							    "messageBody": "<img class=\"pull-left margin-right_10 margin-bottom_10 img300\" src=\"//s3.amazonaws.com/bucketimgs3/shared/img/changelog/support-centers.png\"></img><p>Support is now available 24 hours a day, 7 days a week and the call center is staffed with multi-lingual support specialists. In the top navication, you can click \"Contact\", then choose the <a href=\"/carcare/feedback.jsp\">\"Contact Support\"</a> option. You should see your support number at the top of the page under the header labeled \"Contact Support By Phone\". Call Center phone numbers are language-specific based on the language you selected when you setup your account.</p>",
							    "dashMessage": false,
							    "changeLogMessage": true,
							    "submittedByUser": 2446,
							    "lastUpdatedDate": 1408114134701,
							    "lastUpdatedUser": 2446,
							    "notifyNowAdresses": null,
							    "status": "ACTIVE",
							    "urgency": "LOW",
							    "category": "NEW_FEATURE",
							    "subscriberIds": [
							        1
							    ],
							    "businessRoleTypes": [ ]

							},
							{

							    "messageId": "number5",
							    "startDate": "08212014",
							    "startTime": "5:00 AM",
							    "endDate": "12312014",
							    "endTime": "11:00 PM",
							    "messageTitle": "Change Log - We've Been Listening!",
							    "messageBody": "<p>We've been listening to your feedback and making a lot of changes to our interface in an effort to improve your experience. To help communicate these changes to you, we're also rolling out this new Change Log. Some recent changes include:*</p><ul><li>\"Request Appointment\" links are now much more prominent and available in multiple locations for users with a servicing shop.</li><li>Total Idle Time available on homepage (Fleet and Shop Admins): if a vehicle has idle alerts configured and idle events have occurred, Fleet and Shop Admins can see that vehicle's Total Idle Time on the homepage.</li><li>Max Speed will now show up for the homepage for all users with speed alerts enabled. Note: Basic Family Monitoring (Car Care Package) does not allow these kinds of monitoring alerts, but packages may be upgraded at any time.</li><li>Visual Feedback: more visual feedback and messaging indicating when settings are changed.</li><li>Clarification: changed instances of \"Device Configuration\" to \"Alert Configuration\".</li><li>Bug Fixed: Maps no longer default to the middle of the ocean if location unknown.</li><li>Bugs Fixed: a number of IE-specific problems have been fixed.</li><li>Boundary Configuration: In response to user feedback, we simplified Boundary Configuration by changing some of the verbage.</li><li>...A Change Log! There are a ton of changes we've made based on user feedback. We're relentlessly working on this software day and night, so you should see things added pretty regularly to our new Change Log. <a href=\"/carcare/feedback.jsp\">Keep submitting your issues and suggestions</a> and check back here to see what's been changed. We're Listening!</li></ul><p><em>*Note: Some features may not be available for your package. Packages can be upgraded at any time.</em></p>",
							    "dashMessage": false,
							    "changeLogMessage": true,
							    "submittedByUser": 2446,
							    "lastUpdatedDate": 1408114134701,
							    "lastUpdatedUser": 2446,
							    "notifyNowAdresses": null,
							    "status": "ACTIVE",
							    "urgency": "LOW",
							    "category": "NEW_FEATURE",
							    "subscriberIds": [
							        1
							    ],
							    "businessRoleTypes": [ ]

							}
						];

					}
					

					//ReportsHelper.makeDateTimeSortKey($scope.changeLog, 'MMDDYYYY h:mm A', '$sortChangeDate', 'startDate', 'startTime');
					ReportsHelper.makeDateTimeSortKey($scope.changeLog, 'MMDDYYYY hh:mmA', '$sortChangeDate', 'startDate', 'startTime');						
					//ReportsHelper.makeDateTimeSortKey($scope.changeLog, 'MM/DD/YY', '$sortPackageEndDate', 'packageEndDate');

					//$scope.sort.by = '$sortChangeDate';
					$scope.sort.by = '$sortChangeDate';
					$scope.sort.reverse = true;

					//console.log($scope.changeLog);

				});

			}

			$scope.getChangeLog();
			
		}

	});

});
/** @file */
