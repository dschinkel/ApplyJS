/*global Apply, describe, it, expect, jasmine */
describe('Apply.Events', function () {
    'use strict';

    it('should support an \'on\' method that allows callbacks to be registered', function () {
        var events = new Apply.Events();
        var callback = function () {
        };

        events.on('test', callback);

        expect(events.events['test']).toEqual([callback]);
    });

    it('should support the triggering of events / callbacks that were previously registered', function () {
        var events = new Apply.Events();
        var callbacks = [jasmine.createSpy(), jasmine.createSpy()];

        events.on('test', callbacks[0]);
        events.on('test', callbacks[1]);

        events.trigger('test');

        expect(callbacks[0]).toHaveBeenCalled();
        expect(callbacks[1]).toHaveBeenCalled();
    });

    describe('trigger', function () {
        it('should support arguments that will be passed on to callbacks', function () {
            var events = new Apply.Events();
            var callback = jasmine.createSpy();

            events.on('test', callback);
            events.trigger('test', 'an argument');

            expect(callback).toHaveBeenCalledWith('an argument');
        });
    });

});