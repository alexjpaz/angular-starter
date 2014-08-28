angular.module('vehimatics/reporting').config(function(DirectiveProvider, ComponentProvider, $provide) {

	$provide.value('ReportTableColumn', function(key, label) {
		this.key = key;
		this.label = label;
	});

	DirectiveProvider.register('reports-data-table', function(ComponentTemplateResolver, Collection, ReportTableColumn, $parse) {
		return {
			restrict: 'EA',
			templateUrl: ComponentTemplateResolver.resolve('reports-data-table','reporting'),
			transclude: true,
			scope: true,
			compile: function(element, attrs) {
				return {
					post: function(scope, iElement, iAttrs, controller, transcludeFn) {
						transcludeFn(function(tElement) {
							var columns = tElement.filter('column');
							var collection = [];

							console.debug(columns)
							angular.forEach(columns, function(cc) {
								var bind = {};
								bind.key = cc.getAttribute('key');
								bind.label = cc.getAttribute('label') || cc.innerText || cc.textContent;
								bind.labelderp = $parse(bind.label)(scope);
								collection.push(bind);
							});

							scope.collection = collection;
						});
					}
				};
			}
		};
	});
});


						//transcludeFn(function(tElement) {
							//var e = tElement.filer('c');
							//console.debug('apaz',e);


						//});
//if(tElement.filter('block-content').length == 0) {
	//element.find('block-content').append(tElement);
	//} else {
		//var elToMove = ['block-menu','block-content'];
		//angular.forEach(elToMove, function(el) {
			//element.find(el).append(tElement.filter(el));
			//});
	//}
/** @file */
