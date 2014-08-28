describe("helpers/reports.js", function() {
	var mock = {};

	function Day(name, date, time) {
		this.name = name;
		this.date = date;
		this.time = time;
	}

	function NestedDay(name, date, time) {
		this.name = name;
		this.nested = {};
		this.nested.date = date;
		this.nested.time = time;
	}

	beforeEach(function() {
		var m = module('vehimatics');
	});

	beforeEach(inject(KarmaConfig.mock$httpBackend));

	beforeEach(inject(function($injector) {
		mock.ReportsHelper = $injector.get('ReportsHelper');
	}));

	it('should allow format and date', inject(function(ReportsHelper, $filter) {
		var report = [];
		report.push(new Day('aaa', '03/21/2014'));
		report.push(new Day('bbb', '02/21/2014'));
		report.push(new Day('ccc', '01/21/2014'));
		report.push(new Day('ddd'));

		ReportsHelper.makeDateTimeSortKey(report, 'MM/DD/YYYY', '$sortDate', 'date');		

		var ordered = $filter('orderBy')(report, '$sortDate');

		expect(ordered[0].name).toBe('ddd');
		expect(ordered[1].name).toBe('ccc');
		expect(ordered[2].name).toBe('bbb');
		expect(ordered[3].name).toBe('aaa');
	}));


	it('should allow format date and time', inject(function(ReportsHelper, $filter) {
		var report = [];
		report.push(new Day('aaa', '01/21/2014', '04:44PM DOESNT MATTER'));
		report.push(new Day('bbb', '01/21/2014', '03:33PM PST'));
		report.push(new Day('ccc', '01/21/2014', '02:22PM EDT'));
		report.push(new Day('ddd', '01/21/2014'));

		ReportsHelper.makeDateTimeSortKey(report, 'MM/DD/YYYY hh:mmA', '$sortDateTime', 'date', 'time');		

		var ordered = $filter('orderBy')(report, '$sortDateTime');

		expect(ordered[0].name).toBe('ddd');
		expect(ordered[1].name).toBe('ccc');
		expect(ordered[2].name).toBe('bbb');
		expect(ordered[3].name).toBe('aaa');
	}));

	it('should allow format date and time with dot.path', inject(function(ReportsHelper, $filter) {
		var report = [];
		report.push(new NestedDay('aaa', '01/21/2014', '04:44PM DOESNT MATTER'));
		report.push(new NestedDay('bbb', '01/21/2014', '03:33PM PST'));
		report.push(new NestedDay('ccc', '01/21/2014', '02:22PM EDT'));
		report.push(new NestedDay('ddd', '01/21/2014'));

		ReportsHelper.makeDateTimeSortKey(report, 'MM/DD/YYYY hh:mmA', '$sortDateTime', 'nested.date', 'nested.time');		

		var ordered = $filter('orderBy')(report, '$sortDateTime');

		expect(ordered[0].name).toBe('ddd');
		expect(ordered[1].name).toBe('ccc');
		expect(ordered[2].name).toBe('bbb');
		expect(ordered[3].name).toBe('aaa');
	}));

	it('should perform relatively well with large dataset', inject(function(ReportsHelper, $filter) {
		var report = [];
		var max=10000;

		for(var i=0;i<max;i++) {
			report.push(new NestedDay(''+i, '01/21/2014', '04:44PM DOESNT MATTER'+i));
		}

		ReportsHelper.makeDateTimeSortKey(report, 'MM/DD/YYYY hh:mmA', '$sortDateTime', 'nested.date', 'nested.time');		
		var ordered = $filter('orderBy')(report, '$sortDateTime');
	}));

});
