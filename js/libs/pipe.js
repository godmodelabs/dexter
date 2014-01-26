define([
    'libs/debug',
    'libs/override',
    'eventemitter2'
], function(
    debug,
    override,
    EventEmitter2
) {

    debug = debug('Pipe');

    var emitter = new EventEmitter2({
        wildcard: true,
        delimiter: '/',
        maxListeners: 9999
    });

    /**
     * An event emitter used as a communication
     * network between distant objects.
     *
     * @author Tamas-Imre Lukacs
     * @global
     * @ignore
     */

    var pipe = {
        emit: function() {
            if (arguments[0] !== 'newListener') {
                debug.purple('emit ' + arguments[0]);
            }
            emitter.emit.apply(emitter, arguments);
        },
        on: function() {
            debug.purple('connect with ' + arguments[0]);
            emitter.on.apply(emitter, arguments);
        }
    };

    return pipe;
});