/*global Apply, describe, it, expect */
describe('Apply.List', function() {
	'use strict';
	
	it('should recognize the size of a list passed into the constructor', function() {
		var list = new Apply.List([{name: 'Frank'}, {name: 'Pete'}]);
		
		expect(list.size()).toBe(2);
	});
	
	it('should support a get method that returns an Apply.Model from the list by default', function() {
		var list = new Apply.List([{name: 'Frank'}, {name: 'Pete'}]);

		expect(list.get(0).deflate()).toEqual({name: 'Frank'});
		expect(list.get(1).deflate()).toEqual({name: 'Pete'});
	});

    it('should not add a model or fail if nothing is passed to the constructor', function() {
        var list = new Apply.List();

        expect(list.size()).toBe(0);
    });
	
	it('should support an add method that allows the addition of additional objects to the list', function() {
		var list = new Apply.List([{name: 'Frank'}]);
		
		list.add([{name: 'Pete'},{name: 'Henry'}]);
		
		expect(list.size()).toBe(3);
		expect(list.get(0).deflate()).toEqual({name: 'Frank'});
		expect(list.get(1).deflate()).toEqual({name: 'Pete'});
		expect(list.get(2).deflate()).toEqual({name: 'Henry'});
	});
	
	it('should support the addition of a single object through the add method', function() {
		var list = new Apply.List([{name: 'Frank'}]);
		
		list.add({name: 'Pete'});
		
		expect(list.size()).toBe(2);
		expect(list.get(0).deflate()).toEqual({name: 'Frank'});
		expect(list.get(1).deflate()).toEqual({name: 'Pete'});
	});
	
	it('should support mapping to other models', function() {
		var MyModel = Apply.Model({prop: 'prop'});
		var MyList = Apply.List({mapping: MyModel});
		
		var object = new MyList([{name: 'Frank'}]).get(0);
		
		expect(object.__proto__.constructor).toBe(MyModel);
		expect(object.deflate()).toEqual({name: 'Frank'});
	});
	
});