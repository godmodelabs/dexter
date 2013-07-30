/**
 *
 */
define(function() {
    var debugBar = function(viewCache) {
        var $debugBar, self;

        $debugBar = $('<div id="debugBar">' +
            '<span class="views">Viewpicker</span>' +
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

        $debugBar.find('.views').on('click', function() {
            var $this = $(this);

            if ($this.hasClass('on')) {
                $this.removeClass('on');
                $('.debugBar__overlay').remove();

            } else {
                $this.addClass('on');
                $('[id]').each(function() {
                    var $this, id, overlay;

                    $this = $(this);
                    id = $this.attr('id');
                    overlay = $('<div></div>');

                    if ($this.css('position') === 'static') {
                        $this.css('position', 'relative');
                    }
                    overlay.addClass('debugBar__overlay')
                        .attr('data-target', id)
                        .css('position', 'absolute')
                        .css('width', '100%')
                        .css('height', '100%')
                        .css('top', '0')
                        .css('left', '0')
                        .css('z-index', 9999)
                        .css('cursor', 'pointer')
                        .css('background', 'rgba(0,0,255,0.05)');

                    if (id in viewCache) {
                        $this.prepend(overlay);
                    }
                });

                $('.debugBar__overlay').on('mouseenter', function() {
                    var $this, id;

                    $this = $(this);
                    id = $this.attr('data-target');

                    $this.css('background', 'rgba(0,0,255,0.15)');

                    //if (id in viewCache) {}
                });

                $('.debugBar__overlay').on('mouseleave', function() {
                    $(this).css('background', 'rgba(0,0,255,0.05)');
                });

                $('.debugBar__overlay').on('click', function() {
                    var $this, id;

                    $this = $(this);
                    id = $this.attr('data-target');

                    window.view = viewCache[id];
                    console.log(viewCache[id]);
                    $debugBar.find('.views').trigger('click');
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