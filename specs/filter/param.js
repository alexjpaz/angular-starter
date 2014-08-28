describe("filter `param`", function() {

	var mock = {};

	beforeEach(function() {
		module('vehimatics');
	});

	beforeEach(inject(function($filter, jQuery) {
		mock = {};
		mock.tr = $filter('param');
		mock.jQuery = jQuery;
	}));

	it('should serialize an object',function() {
		var dummy = { foo: 'bar', baz: 1 };
		var result = mock.tr(dummy);
		expect(result).toEqual("foo=bar&baz=1");
	});

	it('should serialize a arrays in objects with []',function() {
		var dummy = { arr: [1,2,'bob'] };
		var result = mock.tr(dummy);
		var expected = "arr%5B%5D=1&arr%5B%5D=2&arr%5B%5D=bob";
		expect(result).toEqual(expected);
	});

	it('should serialize a arrays in objects without [] when shallow = true',function() {
		var dummy = { arr: [1,2,'bob'] };
		var result = mock.tr(dummy, true);
		var expected = "arr=1&arr=2&arr=bob";
		expect(result).toEqual(expected);
	});

});
