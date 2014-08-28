angular.module('vehimatics/reporting').config(function(DirectiveProvider) {
	DirectiveProvider.register('reports-col', function() {
		return {
			require: ['^reportsTable'],
			link: function(scope, element, attrs, ctrls) {
				var ReportsTableCtrl = ctrls[0];
				var report = ReportsTableCtrl.report;
				var isSort = (attrs.sort || attrs.sort === "");
				var col = attrs.reportsCol;

				var dotPath = report+'.columns["'+attrs.reportsCol+'"]';

				function updateClass(by, reverse) {
					 attrs.$removeClass('asc');
					 attrs.$removeClass('desc');
					 if(by === col) {
						 if(reverse) {
							 attrs.$addClass('asc');
						 } else {
							 attrs.$addClass('desc');
						 }
					 }
				 }

				if(isSort) {
					attrs.$addClass('sortable');

					element.bind('click', function() {
						if(scope[report].orderBy === col) {
							scope[report].orderByReverse = !scope[report].orderByReverse;
						} else {
							scope[report].orderBy = col;
							scope[report].orderByReverse = false;
						}

						updateClass(scope[report].orderBy, scope[report].orderByReverse);
						scope.$apply();
					});
				}

				scope.$watch(report+'.orderBy', function(orderBy) {
					updateClass(orderBy);
				});

				scope.$watch(dotPath, function(r) {
					if(angular.isUndefined(r)) return;
					if(r.visible) {
						attrs.$removeClass('ng-hide');
					} else {
						attrs.$addClass('ng-hide');
					}
				}, true);
			}
		};
	});
});
/** @file */
