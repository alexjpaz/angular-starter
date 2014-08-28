describe('helpers/struct', function() {
	describe('Collection', function() {

		var mock = null;

		beforeEach(function() {
			module('vehimatics');
		});

		beforeEach(inject(function(HeaderCollection, Collection, Header) {
			mock  = {};
			mock.c1 = new HeaderCollection();
			mock.c1.add('one','two');

			mock.c2 = new Collection(Header);
			mock.c2.add('a','b');
			mock.Header = Header;
		}));

		it('should return arrays', function() {
			expect(mock.c1.get()[0].name).toBe('one');

			expect(mock.c1.get(0).name).toBe('one');
			expect(mock.c1.get(0).key).toBe('two');

			expect(mock.c2.get(0).name).toBe('a');
			expect(mock.c2.get(0).key).toBe('b');
		});

		it('should be a header object', function() {
			expect(mock.c1.get(0) instanceof mock.Header).toBeTruthy();
			expect(mock.c2.get(0) instanceof mock.Header).toBeTruthy();
		});
	});
});
