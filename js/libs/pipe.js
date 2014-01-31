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

    var emitter,
        pipe;

    emitter = new EventEmitter2({
        wildcard: true,
        delimiter: '/',
        maxListeners: 9999
    });

    /**
     * An event emitter used as a communication
     * network between distant objects.
     *
     * @author Riplexus <riplexus@gmail.com>
     * @ignore
     */

    pipe = {
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