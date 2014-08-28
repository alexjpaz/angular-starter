angular.module('vehimatics').config(function(DirectiveProvider) {
	/**
	 * @function module:vehimatics/help.directive#term-popover
	 */
	 DirectiveProvider.register('term-popover', function($document, LearnResource) {
		 return {
			 link: function(scope, element, attr) {
				 var params = {
					 termName: attr.termPopover,
				 }

				 var options = {
					 html: true,
					 title: "Loading topic",
					 content: "Loading topic"
				 };

				 LearnResource.help(params, function(term) {
					 options.content = term.definitionHtml || term.definitionText;
					 options.title = term.term;

					 $(element).popover(options) //TODO: angulize;
				 });
			 }
		 };
	 });
});
/** @file */
