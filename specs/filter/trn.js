describe("filter `trn`", function() {

	var mock = {};

	var dummy = {
		tr: 'This should get translated'
	};

	var expected = {
		tr: 'It got translated'
	};


	beforeEach(function() {
		module('vehimatics');
	});


	beforeEach(inject(function($filter, gettextCatalog) {
		mock = {};
		mock.tr = $filter('trn');
		gettextCatalog.currentLanguage = 'dummy';
		var strings = {};
		strings[dummy.tr] = expected.tr;
		gettextCatalog.setStrings('dummy', strings);
	}));

	it('should translate strings',function() {
		var result = mock.tr(dummy.tr);
		expect(result).toEqual(expected.tr);
	});

	it("should echo back the original string if it doesn't exist", function() {
		var echo = 'echo';
		expect(mock.tr(echo), echo);
	});

});
