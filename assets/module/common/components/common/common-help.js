angular.module('vehimatics').config(function(ComponentProvider, $injector) {
	/**
	 * Display help
	 * @function module:vehimatics.components#common-help
	 * @type {module:vehimatics/framework.Component}
	 */
	 ComponentProvider.register('common-help', {
			 componentGroup: 'common',
			 replace: true,
			 scope: {},
			 controller: function($scope, $element, $http, $attrs) {

				 tagsString = $attrs.tagged;

				 var 
				 tags = tagsString.split(','),
				 excludeParams = '&',
				 tagParams;

				 $scope.filterFAQ = {};
				 $scope.topicInput = {};
				 $scope.topicInput.sectionTitle = $attrs.faqTitle || "FAQ";		

				 if ($attrs.anytags == "true") {
					 tagParams = '?in=';
				 } else {
					 tagParams = '?';
				 }

				 angular.forEach(tags, function(tag) {
					 tag = tag.trim();
					 if ($attrs.anytags == "true") {
						 if (tag.charAt(0) === '!') {
							 excludeParams += "tag=" + tag + '&';
						 } else {
							 tagParams += tag + ',';	
						 }
					 } else {
						 tagParams += "tag=" + tag + '&';	
					 }				
				 }); //builds an array of supplied tags and a concatenated string of shallow params

				 //REPLACE THE FOLLOWING THREE IF STATEMENTS WITH THIS:
				 /*function noTrailing(inputString) {
				  //console.log(inputString);
				  if (inputString.charAt(inputString.length-1) === '&' || inputString.charAt(inputString.length-1) === ',') {
					  inputString = inputString.substring(0, inputString.length-1);
				  }
				  console.log(inputString);
				  return inputString;
				 }

				 noTrailing(tagParams);
				 noTrailing(excludeParams);*/

				 if (tagParams.charAt(tagParams.length-1) === '&') {
					 tagParams = tagParams.substring(0, tagParams.length-1);
				 }
				 if (tagParams.charAt(tagParams.length-1) === ',') {
					 tagParams = tagParams.substring(0, tagParams.length-1);
				 }
				 if (excludeParams.charAt(excludeParams.length-1) === '&') {
					 excludeParams = excludeParams.substring(0, excludeParams.length-1);
				 }

				 var 
				 serviceUrl = '/telematics/rest/learn/help/topic',
				 query = tagParams + excludeParams;

				 $http({
						 method: 'GET',
						 url: serviceUrl + query,
				 }).success(function(response) {
				 $scope.faqTopics = response;
				 });

			 }
	 });

});
/** @file */
