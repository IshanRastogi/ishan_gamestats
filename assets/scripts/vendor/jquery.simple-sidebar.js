/*! simple-sidebar v2.2.0 (https://dcdeiv.github.io/simple-sidebar)
** Davide Di Criscito <davide.dicriscito@gmail.com> (http://github.com/dcdeiv)
** (c) 2014-2015 Licensed under GPLv2
*/
(function($) {
    $.fn.simpleSidebar = function(options) {
        var opts = $.extend(true, $.fn.simpleSidebar.settings, options);

        return this.each(function() {
            var pAlign, sAlign, ssbCSS, ssbStyle, maskCSS, maskStyle, sbw,
                attr = opts.attr,
                $sidebar = $(this),
                $btn = $(opts.opener),
                $wrapper = $(opts.wrapper),
                $ignore = $(opts.ignore),
                $add = $(opts.add),
                $links = opts.sidebar.closingLinks,

                sbMaxW = opts.sidebar.width,
                gap = opts.sidebar.gap,
                winMaxW = sbMaxW + gap,

                w = $(window).width(),

                duration = opts.animation.duration,

                animationStart = {},
                animationReset = {},
                sidebarStart = {},
                sidebarReset = {},

                hiddenFlow = function() {
                    $('body, html').css('overflow', 'hidden');
                },
                autoFlow = function() {
                    $('body, html').css('overflow', 'auto');
                },

                activate = {
                    duration: duration,
                    easing: opts.animation.easing,
                    //complete: hiddenFlow
                    complete: autoFlow
                },
                deactivate = {
                    duration: duration,
                    easing: opts.animation.easing,
                    complete: autoFlow
                },

                animateOpen = function() {
                    $elements.animate(animationStart, activate);

                    $sidebar.animate(sidebarStart, activate)
                        .attr('data-' + attr, 'active');
                    
                    $mask.fadeIn(duration); //Disabling Mask
                },
                animateClose = function() {
                    $elements.animate(animationReset, deactivate);

                    $sidebar.animate(sidebarReset, deactivate)
                        .attr('data-' + attr, 'disabled');
                    
                    $mask.fadeOut(duration); //Disabling Mask
                },
                closeSidebar = function() {
                    var isWhat = $sidebar.attr('data-' + attr),
                        csbw = $sidebar.width();

                    //Redefining animationReset
                    animationReset[pAlign] = '-=' + csbw;
                    animationReset[sAlign] = '+=' + csbw;
                    animationReset[sAlign] = 0;
                    
                    sidebarReset[pAlign] = -csbw;

                    if (isWhat === 'active') {

                        $elements.not($sidebar)
                            .animate(animationReset, deactivate);

                        $sidebar.animate(sidebarReset, deactivate)
                            .attr('data-' + attr, 'disabled');


                        $mask.fadeOut(duration);
                    }
                },

                $sbWrapper = $('<div>').attr('data-' + attr, 'sbwrapper')
                    .css(opts.sbWrapper.css),

                $mask = $('<div>').attr('data-' + attr, 'mask'),

                //defining elements to move
                $siblings = $wrapper.siblings().not('script noscript'),
                $elements = $wrapper.add($siblings)
                    .not($ignore)
                    .not($sidebar)
                    .not($mask)
                    .not('script')
                    .not('noscript')
                    .add($add);
                

            //Checking sidebar align
            if (opts.sidebar.align === undefined || opts.sidebar.align === 'right') {
                pAlign = 'right';
                sAlign = 'left';
            } else if (opts.sidebar.align === 'left') {
                pAlign = 'left';
                sAlign = 'right';
            }

            //Mask plugin style
            maskCSS = {
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: opts.sidebar.css.zIndex - 1,
                display: 'none'
            };
            maskStyle = $.extend(true, maskCSS, opts.mask.css);

            //Appending Mask if mask.display is true
            if (true === opts.mask.display) {
                $mask.appendTo('body')
                    .css(maskStyle);
            }

            //Defining initial Sidebar width
            if (w < winMaxW) {
                sbw = w - gap;
            } else {
                sbw = sbMaxW;
            }

            //Sidebar plugin style
            ssbCSS = {
                position: 'absolute',//'fixed',
                top: 0,
                bottom: 0,
                width: sbw
            };

            //Opening sidebar
            sidebarStart[pAlign] = 0;//sbw;//0;

            //pushing align to ssbCSS
            ssbCSS[pAlign] = 0;//-sbw;

            //Overriding user style
            ssbStyle = $.extend(true, ssbCSS, opts.sidebar.css);

            //Sidebar initial status            
            //$sidebar.css(ssbStyle).attr('data-' + attr, 'disabled');
            $sidebar.css(ssbStyle).attr('data-' + attr, 'active');

            //Wrapping sidebar inner content if wrapInner.display is TRUE
            if (true === opts.sbWrapper.display) {
                $sidebar.wrapInner($sbWrapper);
            }

            //Animating the sidebar
            $btn.click(function() {
                //Checking if sidebar is active or disabled
                var isWhat = $sidebar.attr('data-' + attr),
                    csbw = $sidebar.width();

                //Defining animations
                animationStart[pAlign] = '+=' + csbw;
                animationStart[sAlign] = '-=' + csbw/4;
                
                animationReset[pAlign] = '-=' + csbw;
                animationReset[sAlign] = '+=' + csbw/4;
                
                sidebarReset[pAlign] = -csbw;

                if ('disabled' === isWhat) {
                    animateOpen();
                } 
                
                /*
               	else if ('active' === isWhat) {
                    animateClose();
                }
                */
            });

            //Closing Sidebar
            $mask.click(closeSidebar);

            //closing sidebar when a link is clicked
            $sidebar.on('click', $links, closeSidebar);

            //Adjusting width and resetting sidebar on window resize
            $(window).resize(function() {
                var rsbw,
                    isWhat = $sidebar.attr('data-' + attr),
                    nw = $(window).width(),
                    reset = {};

                if (nw < winMaxW) {
                    rsbw = nw - gap;
                } else {
                    rsbw = sbMaxW;
                }

                //Redefining animations ad CSS
                animationReset[pAlign] = '-=' + rsbw;
                animationReset[sAlign] = '+=' + rsbw;
                reset[pAlign] = -rsbw;
                reset[sAlign] = '';
                reset.width = rsbw;

                $sidebar.css(reset)
                    .attr('data-' + attr, 'disabled');

                if (isWhat === 'active') {

                    $elements.not($sidebar)
                        .animate(animationReset, deactivate);

                    $mask.fadeOut(duration);
                }
            });
        });
    };

    //options
    $.fn.simpleSidebar.settings = {
        attr: 'simplesidebar',
        animation: {
            duration: 500,
            easing: 'swing'
        },
        sidebar: {
            width: 300,
            gap: 64,
            closingLinks: 'a',
            css: {
                zIndex: 3000
            }
        },
        sbWrapper: {
            display: true,
            css: {
                position: 'relative',
                height: '100%',
                overflowY: 'auto',
                overflowX: 'auto'
            }
        },
        mask: {
            display: false,
            css: {
                backgroundColor: 'white',
                opacity: 0,
                filter: 'Alpha(opacity=0)'
            }
        }
    };
    
})(jQuery);
