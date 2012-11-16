/*global $, Apply, spyOn, it, expect, ajax */
describe('Apply.View', function () {
    'use strict';

    it('should create a div element by default', function () {
        var view = new Apply.View();

        expect(view.$el).toBeDefined();
        expect(view.$el.is('div')).toBe(true);
    });

    it('should load and render a template if one is provided', function () {
        ajax.setResult('<div><a href="javascript://">Link</a></div>');
        var MyView = Apply.View({resource:'Apply.View.tmpl'});

        expect(new MyView().render().html()).toBe('<a href="javascript://">Link</a>');
    });

    it('should work with the source property if provided', function () {
        var MyView = Apply.View({source: '<div><a href="javascript://">Link</a></div>'});

        expect(new MyView().render().html()).toBe('<a href="javascript://">Link</a>');
    });

    it('should throw an exception if the resource does not have a single root element', function() {
        ajax.setResult('<li></li><li></li>');

        expect(function() {
            Apply.View({resource:'Apply.View2.tmpl'});
        }).toThrow(new Error('Apply.View2.tmpl must have a single root element.'));
    });

    it('should throw an exception if the source does not have a single root element', function() {
        expect(function() {
            Apply.View({source: '<li></li><li></li>'});
        }).toThrow(new Error('All view source must have a single root element.'));
    });

    it('should throw an exception if an attempt to render is made before a resource is loaded', function() {
        ajax.neverReturn();

        expect(function() {
            var MyView = Apply.View({resource: 'test.tmpl'});
            new MyView().render();
        }).toThrow(new Error('Please wait for test.tmpl before rendering.'));
    });

});