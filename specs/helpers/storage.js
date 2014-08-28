describe('helpers/storage', function() {
	var mock = {};

	beforeEach(function() {
		var m = module('vehimatics');
	});

	beforeEach(inject(KarmaConfig.mock$httpBackend));

	beforeEach(inject(function($injector) {
		mock.Storage = $injector.get('Storage')
		mock.$parse = $injector.get('$parse');

		localStorage.setItem('mock_one', "");
		delete localStorage['mock_two'];
		delete localStorage['mock_three'];
		delete localStorage['mock_four'];
		delete localStorage['mock_five'];
		delete localStorage['mock_six'];
	}));

	describe('Storage', function() {
		var Storage = null
		
		beforeEach(function() {
			Storage = mock.Storage;
		});

		it('should update after `put`', function() {
			expect(localStorage.getItem('mock_two')).toBe(null);
			var store = Storage.getInstance('mock_two');
			store.put("primitive",1);
			expect(JSON.parse(localStorage.getItem('mock_two')).primitive).toBe(1);

			store.put("object",{paz:'lol'});
			expect(JSON.parse(localStorage.getItem('mock_two')).object.paz).toBe('lol');
		});

		it('should get data from localStorage', function() {
			var mockLs = {
				dummy: 'text'
			};

			localStorage.setItem('mock_three', JSON.stringify(mockLs));

			var store = Storage.getInstance('mock_three');
			expect(store.get('dummy')).toBe('text');
		});
		
		it('should extend an object', function() {
			var mockKey = 'mock_six';
			var mockLs = {
				dummy: {
					foo: 'foo1',
					bar: 'bar1',
				},
			};

			var ex = {
				bar: 'bar2',
				baz: 'baz2'
			}


			localStorage.setItem(mockKey, JSON.stringify(mockLs));

			var store = Storage.getInstance(mockKey);
			expect(store.get('dummy', ex).foo).toBe('foo1');
			expect(store.get('dummy', ex).bar).toBe('bar2');
			expect(store.get('dummy', ex).baz).toBe('baz2');
		});

		it('should extend defaults', function() {
			var store = Storage.getInstance('mock_four');

			var obj = store.get();
			expect(obj).toEqual({});

			var defaults = {
				mock: 'one'
			};

			store = Storage.getInstance('mock_five', defaults);
			obj = store.get();
			expect(obj.mock).toEqual('one');
		});
	});
});
