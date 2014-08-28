angular.module('vehimatics').config(function(DirectiveProvider) {
	DirectiveProvider.register('term-tooltip', function($document, LearnResource) {
		return {
			link: function(scope, element, attr) {
				var params = {
					termName: attr.termTooltip
				};

				var options = {
					title: "Loading topic",
					content: "Loading topic"
				};

				LearnResource.help(params, function(term) {
					options.title = term.definitionText;
					$(element).tooltip(options);
				});
			}
		};
	});
});
/** @file */
