describe("filter/filterAny", function() {

	var mock = {};

	beforeEach(function() {
		module('vehimatics');
	});

	beforeEach(inject(function($filter, jQuery) {
		mock = {};
		mock.exportReport = $filter('filterAny');

		mock.report = {
			filter: {},
			data: [],
		};

		mock.report.data.push({
			'name': 'Alexander Paz',
			'model': 'FooBar V60'
		});

		mock.report.data.push({
			'name': 'Smith John',
			'model': 'Junker V8'
		});
	}));

	it('should do full text search',function() {
		var results = null 
		results = mock.exportReport(mock.report.data, 'FooBar V60');
		expect(results[0].name).toBe("Alexander Paz");

		results = mock.exportReport(mock.report.data, 'Paz V60 Alexander');
		expect(results[0].name).toBe("Alexander Paz");

		results = mock.exportReport(mock.report.data, 'v60 foobar');
		expect(results[0].name).toBe("Alexander Paz");

		results = mock.exportReport(mock.report.data, 'paz v60 alex');
		expect(results[0].name).toBe("Alexander Paz");

		results = mock.exportReport(mock.report.data, 'v60 john');
		expect(results[0].name).toBe("Alexander Paz");
		expect(results[1].name).toBe("Smith John");

		results = mock.exportReport(mock.report.data, '8 junker');
		expect(results[0].name).toBe("Smith John");

	});
});
