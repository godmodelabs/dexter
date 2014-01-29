define(function() {

    /**
     * A simple, not optimized toolbar for an
     * easier debugging.
     *
     * @param viewCache
     * @global
     * @ignore
     */

    var debugBar = function(viewCache) {
        var $debugBar;

        $debugBar = $('<div id="debugBar">' +
            '<span class="dump">Dump view</span>' +
            '<span class="open">Open view in new window</span>' +
            '<span class="close">X</span>' +
            '</div>');

        $debugBar.css('position', 'fixed')
            .css('bottom', '0')
            .css('width', '100%')
            .css('height', '25px')
            .css('background', '#313432')
            .css('color', '#eeeefe')
            .css('line-height', '25px')
            .css('padding', '0 10px');

        $debugBar.find('span').css('cursor', 'pointer');

        $debugBar.find('.dump').on('click', function() {
            var overlays, $this = $(this);

            if ($this.hasClass('on')) {
                $this.removeClass('on');
                $('.debugBar__overlay').remove();

            } else {
                $this.addClass('on');

                $('[data-dX]').each(function() {
                    var $this, id, overlay, zindex;

                    $this = $(this);
                    id = $this.attr('data-dX');
                    overlay = $('<div></div>');
                    zindex = 9100;

                    if ($this.css('position') === 'static') {
                        $this.css('position', 'relative');
                    }

                    overlay.addClass('debugBar__overlay')
                        .attr('data-target', id)
                        .css('position', 'absolute')
                        .css('width', '100%')
                        .css('height', '100%')
                        .css('padding-top', '10px')
                        .css('font-weight', 'bold')
                        .css('font-size', '16px')
                        .css('text-shadow', '0 0 10px #000')
                        .css('color', 'white')
                        .css('text-align', 'center')
                        .css('box-spacing', 'border-box')
                        .css('top', '0')
                        .css('left', '0')
                        .css('z-index', zindex)
                        .css('cursor', 'pointer')
                        .css('background', 'rgba(0,0,255,0.05)');

                    if (id in viewCache) {
                        overlay.text(viewCache[id].dXName);
                        $this.prepend(overlay);
                    }
                });

                overlays = $('.debugBar__overlay');

                overlays.on('mouseenter', function() {
                    var $this, id;

                    $this = $(this);
                    id = $this.attr('data-target');

                    $this.css('background', 'rgba(0,0,255,0.15)');

                    //if (id in viewCache) {}
                });

                overlays.on('mouseleave', function() {
                    $(this).css('background', 'rgba(0,0,255,0.05)');
                });

                overlays.on('click', function() {
                    var $this, id;

                    $this = $(this);
                    id = $this.attr('data-target');

                    window.view = viewCache[id];
                    console.log(viewCache[id]);
                    $debugBar.find('.dump').trigger('click');
                });
            }
        });

        $debugBar.find('.close')
            .css('float', 'right');

        $debugBar.find('.close').on('click', function() {
            debugBar.disable();
        });

        $('body').append($debugBar);
    };

    debugBar.disable = function() {
        $('.debugBar__overlay').remove();
        $('#debugBar').remove();
    };

    return debugBar;
});