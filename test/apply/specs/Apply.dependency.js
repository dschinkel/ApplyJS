/*global $, Apply, spyOn, it, expect, jasmine, ajaxSpy */
describe('Apply.dependency', function() {
	'use strict';
	
	it('should be able to load a file from the internet', function() {
		ajaxSpy.setResult('var x = 1;');
		
		Apply.dependency('test.atl', function(result) {
			expect(result).toBe('var x = 1;');
		});
		
		expect($.ajax).toHaveBeenCalled();
	});
	
	it('should return a cached version if the resource was already requested', function() {
		ajaxSpy.setResult('var x = 1;');
		
		Apply.dependency('test2.atl');
		Apply.dependency('test2.atl', function(result) {
			expect(result).toBe('var x = 1;');
		});
		
		expect($.ajax.callCount).toBe(1);
	});
	
	it('should work with deferred objects', function() {
		ajaxSpy.setResult('var x = 1;');
		
		var check = jasmine.createSpy('check');
		
		$.when(Apply.dependency('test3.atl')).then(function(result) {
			expect(result).toBe('var x = 1;');
			check();
		});
		
		$.when(Apply.dependency('test3.atl')).then(function(result) {
			expect(result).toBe('var x = 1;');
			check();
		});
		
		expect(check.callCount).toBe(2);
		expect($.ajax.callCount).toBe(1);
	});
	
	it('should execute .js files by default', function() {
		ajaxSpy.setResult('window.testVar = 2;');
		
		Apply.dependency('test.js');
		
		/*global testVar*/
		expect(testVar).toBe(2);
	});
	
});