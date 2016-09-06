(function($){

    "use strict";
	
    /* ---------------------------------------------------------------------------
	 * Sticky header
	 * --------------------------------------------------------------------------- */
    var topBarTop = '61px';
    var mfn_header_height = 0;
    
    // header height
    function mfn_stickyH(){
    	if( jQuery('body').hasClass('header-below') ){
	    	// header below slider
	    	mfn_header_height = jQuery('.mfn-main-slider').innerHeight() + jQuery('#Header').innerHeight();
	    } else {
	    	// default
	    	mfn_header_height = jQuery('#Top_bar').innerHeight() + jQuery('#Action_bar').innerHeight();
	    }
    }
    
    // init
	function mfn_sticky(){
		if( jQuery('body').hasClass('sticky-header') ){	
			var start_y = mfn_header_height;
			var window_y = jQuery(window).scrollTop();
	
			if( window_y > start_y ){
				if( ! (jQuery('#Top_bar').hasClass('is-sticky'))){
					
					jQuery('.header-classic .header_placeholder').css('height', jQuery('#Top_bar').innerHeight() - jQuery('#Action_bar').innerHeight());
					jQuery('.header-stack   .header_placeholder').css('height', 71);
					jQuery('.header-below   .header_placeholder').css('height', jQuery('#Top_bar').innerHeight());
					jQuery('.minimalist-header .header_placeholder').css('height', jQuery('#Top_bar').innerHeight());
					
					jQuery('#Top_bar')
						.addClass('is-sticky')
						.css('top',-60)
						.animate({
							'top': jQuery('#wpadminbar').innerHeight()
						},300);
				}
			}
			else {
				if(jQuery('#Top_bar').hasClass('is-sticky')) {
					jQuery('.header_placeholder').css('height',0);
					jQuery('#Top_bar')
						.removeClass('is-sticky')
						.css('top', topBarTop);
				}	
			}
		}
	}
	
	
	/* ---------------------------------------------------------------------------
	 * Sidebar height
	 * --------------------------------------------------------------------------- */
	function mfn_sidebar(){
		if( jQuery('.with_aside .four.columns').length ){
			var maxH = jQuery('#Content .sections_group').height() - 20
			jQuery('.with_aside .four.columns .widget-area').each(function(){
				jQuery(this).css( 'min-height', 0 );
				if( jQuery(this).height() > maxH ){
					maxH = jQuery(this).height();
				}
			});
			jQuery('.with_aside .four.columns .widget-area').css( 'min-height', maxH + 'px' );
		}
	}
	
	
		/* ---------------------------------------------------------------------------
		 * Overlay menu
		 * --------------------------------------------------------------------------- */
		jQuery('.overlay-menu-toggle').click(function(e){
			e.preventDefault();
			
			jQuery(this).toggleClass('focus');
			jQuery('#Overlay').stop(true,true).fadeToggle(500);
			
			var menuH = jQuery('#Overlay nav').height() / 2;
			jQuery('#Overlay nav').css( 'margin-top', '-' + menuH + 'px' );	
		});
		
	/* ---------------------------------------------------------------------------
	 * Sliding Footer | Height
	 * --------------------------------------------------------------------------- */
	function mfn_footer(){
		if( jQuery('.footer-fixed #Footer, .footer-sliding #Footer').length ){
			var footerH = jQuery('#Footer').height();
			jQuery('#Content').css( 'margin-bottom', footerH + 'px' );
		}
	}
	
	
	/* ---------------------------------------------------------------------------
	 * Header width
	 * --------------------------------------------------------------------------- */
	function mfn_header(){
		var rightW = jQuery('.top_bar_right').innerWidth();
		var parentW = jQuery('#Top_bar .one').innerWidth() - 10;
		var leftW = parentW - rightW;
		jQuery('.top_bar_left, .menu > li > ul.mfn-megamenu ').width( leftW );
	}
	
	
	/* ---------------------------------------------------------------------------
	 * Full Screen Section
	 * --------------------------------------------------------------------------- */
	function mfn_sectionH(){
		var windowH = jQuery(window).height();
		jQuery('.section.full-screen').each(function(){
			var section = jQuery(this);
			var wrapper = jQuery('.section_wrapper',section);
			section
				.css('padding', 0)
				.height( windowH );
			var padding = ( windowH - wrapper.height() ) / 2;
			wrapper.css('padding-top', padding + 20);			// 20 = column margin-bottom / 2
		});
	}
	
	
	/* ---------------------------------------------------------------------------
	 * # Hash smooth navigation
	 * --------------------------------------------------------------------------- */
	function hashNav(){
		
		// # window.location.hash
		var hash = window.location.hash;
		
		if( hash && jQuery(hash).length ){	
			
			var stickyH = jQuery('.sticky-header #Top_bar').innerHeight();
			var tabsHeaderH = jQuery(hash).siblings('.ui-tabs-nav').innerHeight();
			
			jQuery('html, body').animate({ 
				scrollTop: jQuery(hash).offset().top - stickyH - tabsHeaderH
			}, 500);
		}
	}
	
	
	/* ---------------------------------------------------------------------------
	 * One Page | Scroll Active
	 * --------------------------------------------------------------------------- */
	function onePageActive(){
		if( jQuery('body').hasClass('one-page') ){
			
			var stickyH = jQuery('.sticky-header #Top_bar').innerHeight();
	
			var winTop = jQuery(window).scrollTop();
			var offset = stickyH + 1; // offset top
	
	        var visible = jQuery('[data-id]').filter(function(ndx, div){
	            return winTop >= jQuery(div).offset().top - offset &&
	            winTop < jQuery(div).offset().top - offset + jQuery(div).outerHeight()
	        });
	        
	        var newActive = visible.first().attr('id');        
	        var active = '[data-hash="#'+ newActive +'"]';
	        
	        if( newActive ){
		        var menu = jQuery('#menu');
		        menu.find('li').removeClass('current-menu-item currenet-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');
		        jQuery( active, menu ).closest('li').addClass('current-menu-item');
	        }
	        
		}
	}
	
	
	/* ---------------------------------------------------------------------------
	 * niceScroll | Padding right fix for short content
	 * --------------------------------------------------------------------------- */
	function niceScrollFix(){ 
		var el = jQuery('body > .nicescroll-rails');
		if( el.length ){
			if( el.is(":visible") ){
				jQuery('body').addClass('nice-scroll');
			} else {
				jQuery('body').removeClass('nice-scroll');
			}
		}
	}

	
	/* --------------------------------------------------------------------------------------------------------------------------
	 * jQuery(document).ready
	 * ----------------------------------------------------------------------------------------------------------------------- */
	jQuery(document).ready(function(){
	
		topBarTop = parseInt(jQuery('#Top_bar').css('top'), 10);
		if( topBarTop < 0 ) topBarTop = 61;
		topBarTop = topBarTop + 'px';


		/* ---------------------------------------------------------------------------
		 * Content sliders
		 * --------------------------------------------------------------------------- */
		mfnSliderContent();
		mfnSliderOffer();
		mfnSliderOfferThumb();
		mfnSliderBlog();
		mfnSliderClients();
		mfnSliderPortfolio();
		mfnSliderShop();
		mfnSliderTestimonials();
		
		
		/* ---------------------------------------------------------------------------
		 * Responsive menu
		 * --------------------------------------------------------------------------- */
		jQuery('.responsive-menu-toggle').click(function(e){
			e.preventDefault();
			var el = jQuery(this)
			var menu = jQuery('#Top_bar #menu');
			var menuWrap = menu.closest('.menu_wrapper');
			el.toggleClass('active');
			
			if( el.hasClass('is-sticky') && el.hasClass('active') ){
				var top = 0;
				if( menuWrap.length ) top = menuWrap.offset().top;
				jQuery('body,html').animate({
					scrollTop: top
				}, 200);
			}

			menu.stop(true,true).slideToggle(200);
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Main menu
		 * --------------------------------------------------------------------------- */
		
		// Muffin Menu -------------------------------
		jQuery("#menu > ul.menu").muffingroup_menu({
			arrows	: true
		});
		
		jQuery("#secondary-menu > ul.secondary-menu").muffingroup_menu();
		
		mfn_stickyH()
		mfn_sticky();

		
		/* ---------------------------------------------------------------------------
		 * Menu | OnePage - remove active
		 * Works with .scroll class
		 * Since 4.8 replaced with admin option: Page Options / One Page [function: onePageMenu()]
		 * --------------------------------------------------------------------------- */
		function onePageScroll(){
			if( ! jQuery('body').hasClass('one-page') ){
				var menu = jQuery('#menu');
				
				if( menu.find('li.scroll').length > 1 ){
					menu.find('li.current-menu-item:not(:first)').removeClass('current-menu-item currenet-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');
					
					// menu item click
					menu.find('a').click(function(){
						jQuery(this).closest('li').siblings('li').removeClass('current-menu-item currenet-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');
						jQuery(this).closest('li').addClass('current-menu-item');
					});
				}
			}
		}
		onePageScroll();
		
		
		/* ---------------------------------------------------------------------------
		 * One Page | Menu with Active on Scroll
		 * --------------------------------------------------------------------------- */
		function onePageMenu(){
			if( jQuery('body').hasClass('one-page') ){
				
				var menu = jQuery('#menu');
				
				// remove active
				menu.find('li').removeClass('current-menu-item currenet-menu-parent current-menu-ancestor current_page_item current_page_parent current_page_ancestor');

				// add attr [data-hash]
				jQuery('a[href]', menu).each(function(){	

					// data-hash
					var url = jQuery(this).attr('href');
					var hash = '#' + url.split('#')[1];
					if( hash && jQuery(hash).length ){	// check if element with specified ID exists
						jQuery(this).attr('data-hash',hash);
						jQuery(hash).attr('data-id',hash);
					}
					
				});
				
				// click
				jQuery('#menu a[data-hash]').click(function(e){
					e.preventDefault(); // only with: body.one-page
					
					// active
					menu.find('li').removeClass('current-menu-item');
					jQuery(this).closest('li').addClass('current-menu-item');
	
					var hash = jQuery(this).attr('data-hash');
					var stickyH = 0;
					var tabsHeaderH = jQuery(hash).siblings('.ui-tabs-nav').innerHeight();

					// FIX | sticky top bar height
					var topBar = jQuery('.sticky-header #Top_bar');
					if( topBar.hasClass('is-sticky') ){
						stickyH = jQuery('.sticky-header #Top_bar').innerHeight();
					} else {
						topBar.addClass('is-sticky');
						stickyH = jQuery('.sticky-header #Top_bar').innerHeight();
						topBar.removeClass('is-sticky');
					}	

					// FIX | responsive 
					var responsive = jQuery('.responsive-menu-toggle');
					if( responsive.length ){
						if( responsive.is(":visible") ){
							stickyH = 0;
						}
					}

					jQuery('html, body').animate({ 
						scrollTop: jQuery(hash).offset().top - stickyH - tabsHeaderH
					}, 500);
					
				});
				
			}
		};
		onePageMenu();

		
		/* ---------------------------------------------------------------------------
		 * Creative Header
		 * --------------------------------------------------------------------------- */
		function creativeHeader(){
			var ch = jQuery('body:not(.header-open) #Header_creative');
			var current;
			
			jQuery('.creative-menu-toggle').click(function(e){
				e.preventDefault();
				ch.addClass('active').animate({ 'left':-1 },500);
				ch.find('.creative-wrapper').fadeIn(500);
				ch.find('.creative-menu-toggle, .creative-social').fadeOut(500);
			});
			if(ch.length>0){
			ch.on('mouseenter', function() {    
			    current = 1;
			}).on('mouseleave', function() {
			    current = null;
			    setTimeout(function(){
			    	if ( ! current ){
				    	ch.removeClass('active').animate({ 'left':-200 },500);
						ch.find('.creative-wrapper').fadeOut(500);
						ch.find('.creative-menu-toggle, .creative-social').fadeIn(500);
			    	}
			    }, 1000);
			});
			}
			
		}
		creativeHeader();

		
		/* ---------------------------------------------------------------------------
		 * Maintenance
		 * --------------------------------------------------------------------------- */
        jQuery('.downcount').each(function(){
            var el = jQuery(this);
           	el.downCount({
    			date	: el.attr('data-date'),
    			offset	: el.attr('data-offset')
    		});  
        }); 
        
        
        /* ---------------------------------------------------------------------------
         * Tooltip Image
         * --------------------------------------------------------------------------- */
        jQuery('.tooltip-img').hover(function(){
        	 jQuery('.tooltip-content').stop(true,true).show();
        },function(){
        	jQuery('.tooltip-content').stop(true,true).hide();
        });

        
        /* ---------------------------------------------------------------------------
		 * Popup Contact
		 * --------------------------------------------------------------------------- */
		jQuery("#popup_contact > a.button").click(function(e){
			e.preventDefault();
			jQuery(this).parent().toggleClass('focus');
		});
		

        /* ---------------------------------------------------------------------------
		 * niceScroll
		 * --------------------------------------------------------------------------- */
        if( jQuery('body').hasClass('nice-scroll-on') 
        	&& jQuery(window).width() > 767
        	&& ! navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/))
        {
        	jQuery('html').niceScroll({
        		autohidemode		: false,
        		cursorborder		: 0,
        		cursorborderradius	: 5,
        		cursorcolor			: '#222222',
        		cursorwidth			: 10,
        		horizrailenabled	: false,
        		mousescrollstep		: ( window.mfn_nicescroll ) ? window.mfn_nicescroll : 40,
        		scrollspeed			: 60
        	});
        	
        	jQuery('body').removeClass('nice-scroll-on').addClass('nice-scroll');
        	niceScrollFix();
	    }

        
        /* ---------------------------------------------------------------------------
		 * WP Gallery
		 * --------------------------------------------------------------------------- */
		jQuery('.gallery-icon > a')
			.wrap('<div class="image_frame scale-with-grid"><div class="image_wrapper"></div></div>')
			.prepend('<div class="mask"></div>')
			.attr('rel', 'prettyphoto[gallery]')
			.children('img' )
				.css('height', 'auto')
				.css('width', '100%');
		

		/* ---------------------------------------------------------------------------
		 * PrettyPhoto
		 * --------------------------------------------------------------------------- */

		if( ( typeof(window.mfn_prettyphoto) !== 'undefined' && ! window.mfn_prettyphoto.disable ) && ( jQuery(window).width() >= 768 ) ){
			jQuery('a[rel^="prettyphoto"], .prettyphoto').prettyPhoto({
				default_width	: window.mfn_prettyphoto.width ? window.mfn_prettyphoto.width : 500,
				default_height	: window.mfn_prettyphoto.height ? window.mfn_prettyphoto.height : 344,
				show_title		: false,
				deeplinking		: false,
				social_tools	: false
			});
		}
		
        
		/* ---------------------------------------------------------------------------
		 * Black & White
		 * --------------------------------------------------------------------------- */
        jQuery('.greyscale .image_wrapper > a, .greyscale .client_wrapper .gs-wrapper, .greyscale.portfolio-photo a').has('img').BlackAndWhite({
    		hoverEffect		: true,
    		intensity		: 1			// opacity: 0, 0.1, ... 1
    	});
		

		/* ---------------------------------------------------------------------------
		 * Sliding Top
		 * --------------------------------------------------------------------------- */
		jQuery(".sliding-top-control").click(function(e){
			e.preventDefault();
			jQuery('#Sliding-top .widgets_wrapper').slideToggle();
			jQuery('#Sliding-top').toggleClass('active');
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Header Search
		 * --------------------------------------------------------------------------- */
		jQuery("#search_button, #Top_bar .icon_close").click(function(e){
			e.preventDefault();
			jQuery('#Top_bar .search_wrapper').fadeToggle();
		});
	
		
		/* ---------------------------------------------------------------------------
		 * Alert
		 * --------------------------------------------------------------------------- */
		jQuery('.alert .close').click(function(e){
			e.preventDefault();
			jQuery(this).closest('.alert').hide(300);
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Buttons - mark Buttons with Icon & Label
		 * --------------------------------------------------------------------------- */
		jQuery('a.button_js').each(function(){
			var btn = jQuery(this);
			if( btn.find('.button_icon').length && btn.find('.button_label').length ){
				btn.addClass('kill_the_icon');
			}
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Posts sticky navigation
		 * --------------------------------------------------------------------------- */
		jQuery('.fixed-nav').appendTo('body');
		
		
		/* ---------------------------------------------------------------------------
		 * Feature List
		 * --------------------------------------------------------------------------- */
		jQuery('.feature_list ul li:nth-child(4n):not(:last-child)').after('<hr />');
		
		
		/* ---------------------------------------------------------------------------
		 * IE fixes
		 * --------------------------------------------------------------------------- */
		function checkIE(){
			// IE 9
			var ua = window.navigator.userAgent;
	        var msie = ua.indexOf("MSIE ");
	        if( msie > 0 && parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) == 9 ){
	        	jQuery("body").addClass("ie");
			}
		}
		checkIE();
		
		
		/* ---------------------------------------------------------------------------
		 * Paralex Backgrounds
		 * --------------------------------------------------------------------------- */
		var ua = navigator.userAgent,
		isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
		if( ! isMobileWebkit && jQuery(window).width() >= 768 ){
			$.stellar({
				horizontalScrolling	: false,
				responsive			: true
			});
		}
		
		
		/* ---------------------------------------------------------------------------
		 * Ajax | Load More
		 * --------------------------------------------------------------------------- */
		jQuery('.pager_load_more').click(function(e){
			e.preventDefault();
			
			var el = jQuery(this);
			var pager = el.closest('.pager_lm');
			var href = el.attr('href');
			
			// index | for many items on the page
			var index = jQuery('.lm_wrapper').index(el.closest('.isotope_wrapper').find('.lm_wrapper'));

			el.fadeOut(50);
			pager.addClass('loading');
			
			$.get( href, function(data){

				// content
				var content = jQuery('.lm_wrapper:eq('+ index +')', data).wrapInner('').html();

				if( jQuery('.lm_wrapper:eq('+ index +')').hasClass('isotope') ){
					// isotope
					jQuery('.lm_wrapper:eq('+ index +')').append( jQuery(content) ).isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
				} else {
					// default
					jQuery( content ).hide().appendTo('.lm_wrapper:eq('+ index +')').fadeIn(1000);
				}
				
				// next page link
				href = jQuery( '.pager_load_more:eq('+ index +')', data ).attr('href');		
				pager.removeClass('loading');					
				if( href ){
					el.fadeIn();
					el.attr( 'href', href );
				}

				// refresh some staff -------------------------------
				mfn_jPlayer();
				iframesHeight();	
				mfn_sidebar();
				
				// isotope fix: second resize
				setTimeout(function(){
					jQuery('.lm_wrapper.isotope').isotope( 'reLayout');
				},1000);				
				
			});

		});
	
		
		/* ---------------------------------------------------------------------------
		 * Blog & Portfolio filters
		 * --------------------------------------------------------------------------- */
		jQuery('.filters_buttons .open').click(function(e){
			e.preventDefault();
			var type = jQuery(this).closest('li').attr('class');
			jQuery('.filters_wrapper').show(200);
			jQuery('.filters_wrapper ul.'+ type).show(200);
			jQuery('.filters_wrapper ul:not(.'+ type +')').hide();
		});
		
		jQuery('.filters_wrapper .close a').click(function(e){
			e.preventDefault();
			jQuery('.filters_wrapper').hide(200);
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Portfolio List - next/prev buttons
		 * --------------------------------------------------------------------------- */
		jQuery('.portfolio_next_js').click(function(e){
			e.preventDefault();
			
			var stickyH = jQuery('#Top_bar.is-sticky').innerHeight();
			var item = jQuery(this).closest('.portfolio-item').next();
			
			if( item.length ){
				jQuery('html, body').animate({ 
					scrollTop: item.offset().top - stickyH
				}, 500);
			}
		});
		
		jQuery('.portfolio_prev_js').click(function(e){
			e.preventDefault();
			
			var stickyH = jQuery('#Top_bar.is-sticky').innerHeight();
			var item = jQuery(this).closest('.portfolio-item').prev();
			
			if( item.length ){
				jQuery('html, body').animate({ 
					scrollTop: item.offset().top - stickyH
				}, 500);
			}
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Tabs
		 * --------------------------------------------------------------------------- */

		if(typeof(tabs) !== 'undefined'){
		jQuery(".jq-tabs").tabs();
		}

		
		/* ---------------------------------------------------------------------------
		 * Smooth scroll
		 * --------------------------------------------------------------------------- */
		jQuery('li.scroll > a, a.scroll').click(function(){
			var url = jQuery(this).attr('href');
			var hash = '#' + url.split('#')[1];
			
			var stickyH = jQuery('.sticky-header #Top_bar').innerHeight();
			var tabsHeaderH = jQuery(hash).siblings('.ui-tabs-nav').innerHeight();
			
			if( hash && jQuery(hash).length ){
				jQuery('html, body').animate({ 
					scrollTop: jQuery(hash).offset().top - stickyH - tabsHeaderH
				}, 500);
			}
		});

		
		/* ---------------------------------------------------------------------------
		 * Muffin Accordion & FAQ
		 * --------------------------------------------------------------------------- */
		jQuery('.mfn-acc').each(function(){
			var el = jQuery(this);
			
			if( el.hasClass('openAll') ){
				// show all -----------
				
				el.find('.question')
					.addClass("active")
					.children(".answer")
						.show();
				
			} else {
				// show one -----------
				
				var active_tab = el.attr('data-active-tab');
				if( el.hasClass('open1st') ) active_tab = 1;
				
				if( active_tab ){
					el.find('.question').eq( active_tab - 1 )
						.addClass("active")
						.children(".answer")
							.show();
				}
				
			}	
		});

		jQuery(".mfn-acc .question > .title").click(function(){		
			if(jQuery(this).parent().hasClass("active")) {
				jQuery(this).parent().removeClass("active").children(".answer").slideToggle(200);
			}
			else
			{
				if( ! jQuery(this).closest('.mfn-acc').hasClass('toggle') ){
					jQuery(this).parents(".mfn-acc").children().each(function() {
						if(jQuery(this).hasClass("active")) {
							jQuery(this).removeClass("active").children(".answer").slideToggle(200);
						}
					});
				}
				jQuery(this).parent().addClass("active");
				jQuery(this).next(".answer").slideToggle(200);
			}
		});

		
		/* ---------------------------------------------------------------------------
		 * jPlayer
		 * --------------------------------------------------------------------------- */
		function mfn_jPlayer(){
			jQuery('.mfn-jplayer').each(function(){
				var m4v = jQuery(this).attr('data-m4v');
				var poster = jQuery(this).attr('data-img');
				var swfPath = jQuery(this).attr('data-swf');
				var cssSelectorAncestor = '#' + jQuery(this).closest('.mfn-jcontainer').attr('id');
				
				jQuery(this).jPlayer({
					ready	: function () {
						jQuery(this).jPlayer('setMedia', {
							m4v		: m4v,
							poster	: poster
						});
					},
					play	: function () { // To avoid both jPlayers playing together.
						jQuery(this).jPlayer('pauseOthers');
					},
					size: {
						cssClass	: 'jp-video-360p',
						width		: '100%',
						height		: '360px'
					},
					swfPath				: swfPath,
					supplied			: 'm4v',
					cssSelectorAncestor	: cssSelectorAncestor,
					wmode				: 'opaque'
				});
			});
		}
		mfn_jPlayer();
		
		
		/* ---------------------------------------------------------------------------
		 * Love
		 * --------------------------------------------------------------------------- */
		/*jQuery('.mfn-love').click(function() {
			var el = jQuery(this);
			if( el.hasClass('loved') ) return false;
			
			var post = {
				action: 'mfn_love',
				post_id: el.attr('data-id')
			};
			
			$.post(window.mfn_ajax, post, function(data){
				el.find('.label').html(data);
				el.addClass('loved');
			});

			return false;
		});	*/
		
		
		/* ---------------------------------------------------------------------------
		 * Go to top
		 * --------------------------------------------------------------------------- */	
		jQuery('#back_to_top').click(function(){
			jQuery('body,html').animate({
				scrollTop: 0
			}, 500);
			return false;
		});		
		
		
		/* ---------------------------------------------------------------------------
		 * Section navigation
		 * --------------------------------------------------------------------------- */	
		jQuery('.section .section-nav').click(function(){
			var el = jQuery(this);
			var section = el.closest('.section');

			if( el.hasClass('prev') ){
				// Previous Section -------------
				if( section.prev().length ){	
					jQuery('html, body').animate({
						scrollTop: section.prev().offset().top
					}, 500);
				}
			} else {
				// Next Section -----------------
				if( section.next().length ){	
					jQuery('html, body').animate({
						scrollTop: section.next().offset().top
					}, 500);
				}			
			}
		});
		
		
		/* ---------------------------------------------------------------------------
		 * WooCommerce
		 * --------------------------------------------------------------------------- */	
		function addToCart(){
			jQuery('body').on('click', '.add_to_cart_button', function(){
				jQuery(this)
					.closest('.product')
						.addClass('adding-to-cart')
						.removeClass('added-to-cart');
			});

			jQuery('body').bind('added_to_cart', function() {
				jQuery('.adding-to-cart')
					.removeClass('adding-to-cart')
					.addClass('added-to-cart');
			});
		}
		addToCart();
		
		
		/* ---------------------------------------------------------------------------
		 * Iframe height
		 * --------------------------------------------------------------------------- */		
		function iframeHeight( item, ratio ){
			var itemW = item.width();
			var itemH = itemW * ratio;
			if( itemH < 147 ) itemH = 147;
			item.height(itemH);
		}
		
		function iframesHeight(){
			iframeHeight(jQuery(".blog_wrapper .post-photo-wrapper .mfn-jplayer, .blog_wrapper .post-photo-wrapper iframe, .post-related .mfn-jplayer, .post-related iframe, .blog_slider_ul .mfn-jplayer, .blog_slider_ul iframe"), 0.78);	// blog - list			
			iframeHeight(jQuery(".single-post .single-photo-wrapper .mfn-jplayer, .single-post .single-photo-wrapper iframe" ), 0.4);	// blog - single
			
			iframeHeight(jQuery(".section-portfolio-header .mfn-jplayer, .section-portfolio-header iframe" ), 0.4);	// portfolio - single
		}
		iframesHeight();

		
		/* ---------------------------------------------------------------------------
		 * Debouncedresize
		 * --------------------------------------------------------------------------- */
		jQuery(window).bind("debouncedresize", function() {
			
			iframesHeight();	
			jQuery('.masonry.isotope,.isotope').isotope();
			
			// carouFredSel wrapper Height set
			mfn_carouFredSel_height();
			
			// Sidebar Height
			mfn_sidebar();
			
			// Sliding Footer | Height
			mfn_footer();
			
			// Header Width
			mfn_header();
			
			// Full Screen Section
			mfn_sectionH();
			
			// niceScroll | Padding right fix for short content
			niceScrollFix();
		});
		
		/* ---------------------------------------------------------------------------
		 * isotope
		 * --------------------------------------------------------------------------- 
		function isotopeFilter( domEl, isoWrapper ){
			var filter = domEl.attr('data-rel');
			isoWrapper.isotope({ filter: filter });
		}
		
		jQuery('.isotope-filters .filters_wrapper').find('li:not(.close) a').click(function(e){
			e.preventDefault();
			isotopeFilter( jQuery(this), jQuery('.isotope') );
		});
		jQuery('.isotope-filters .filters_buttons').find('li.reset a').click(function(e){
			e.preventDefault();
			isotopeFilter( jQuery(this), jQuery('.isotope') );
		});
		
		// carouFredSel wrapper | Height
		mfn_carouFredSel_height();
		
		// Sidebar | Height
		mfn_sidebar();
		
		// Sliding Footer | Height
		mfn_footer();
		
		// Header | Width
		mfn_header();

		// Full Screen Section
		mfn_sectionH();
		
		// Navigation | Hash
		hashNav();
	});
	*/
	
		/* ---------------------------------------------------------------------------
		 * Isotope
		 * --------------------------------------------------------------------------- */
		
		// Isotope | Fiters
		function isotopeFilter( domEl, isoWrapper ){
			var filter = domEl.attr('data-rel');
			isoWrapper.isotope({ filter: filter });
		}
		
		// Isotope | Fiters | Click
		$('.isotope-filters .filters_wrapper').find('li:not(.close) a').click(function(e){
			e.preventDefault();

			var filters = $(this).closest('.isotope-filters');
			var parent  = filters.attr('data-parent');
			
			if( parent ){
				parent = filters.closest( '.' + parent );
				var isoWrapper = parent.find('.isotope').first()
			} else {
				var isoWrapper = $('.isotope');
			}
			
			filters.find('li').removeClass('current-cat');
			$(this).closest('li').addClass('current-cat');

			isotopeFilter( $(this), isoWrapper );
		});

		
		// Isotope | Fiters | Reset
		$('.isotope-filters .filters_buttons').find('li.reset a').click(function(e){
			e.preventDefault();
			
			$('.isotope-filters .filters_wrapper').find('li').removeClass('current-cat');
			isotopeFilter( $(this), $('.isotope') );
		});
		
		
		// carouFredSel wrapper | Height
		mfn_carouFredSel_height();
		
		// Sidebar | Height
		mfn_sidebar();
		
		// Sliding Footer | Height
		mfn_footer();
		
		// Header | Width
		mfn_header();

		// Full Screen Section
		mfn_sectionH();
		
		// Navigation | Hash
		hashNav();
		
		// Equal Columns | Height
		//mfn_equalH();
	});
	
	/* --------------------------------------------------------------------------------------------------------------------------
	 * jQuery(window).scroll
	 * ----------------------------------------------------------------------------------------------------------------------- */
	jQuery(window).scroll(function(){
		
			mfn_stickyH();

		mfn_sticky();
		onePageActive();
	});
	
	
	/* --------------------------------------------------------------------------------------------------------------------------
	 * jQuery(window).load
	 * ----------------------------------------------------------------------------------------------------------------------- */
	jQuery(window).load(function(){
		
		

		/* ---------------------------------------------------------------------------
		 * Isotope
		 * --------------------------------------------------------------------------- */
		// Portfolio - Isotope
		jQuery('.portfolio_wrapper  .isotope:not(.masonry-flat)').isotope({
			itemSelector	: '.portfolio-item',
			layoutMode		: 'fitRows'
		});
		
		// Portfolio - Masonry Flat
		jQuery('.portfolio_wrapper .masonry-flat').isotope({
			itemSelector	: '.portfolio-item',
			masonry			: {
			      columnWidth: 1
		    }
		});

		// Blog & Portfolio - Masonry
		jQuery('.masonry.isotope').isotope({
			itemSelector	: '.isotope-item',
			layoutMode		: 'masonry'
		});

		
		/* ---------------------------------------------------------------------------
		 * Chart
		 * --------------------------------------------------------------------------- */
		jQuery('.chart').waypoint({
			offset		: '100%',
			triggerOnce	: true,
			handler		: function(){
				var color = jQuery(this).attr('data-color');
				jQuery(this).easyPieChart({
					animate		: 1000,
					barColor	: color,
					lineCap		: 'circle',
					lineWidth	: 8,
					size		: 140,
					scaleColor	: false,
					trackColor	: '#f8f8f8'
				});
			}
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Skills
		 * --------------------------------------------------------------------------- */
		jQuery('.bars_list').waypoint({
			offset		: '100%',
			triggerOnce	: true,
			handler		: function(){
				jQuery(this).addClass('hover');
			}
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Progress Icons
		 * --------------------------------------------------------------------------- */
		jQuery('.progress_icons').waypoint({
			offset		: '100%',
			triggerOnce	: true,
			handler		: function(){
				
				var el = jQuery(this);
				var active = el.attr('data-active');
				var color = el.attr('data-color');
				var icon = el.find('.progress_icon');
				var timeout = 200;		// timeout in milliseconds
				
				icon.each(function(i){
					if( i < active ){
						var time = (i+1) * timeout; 
						setTimeout(function(){
							jQuery(icon[i])
								.addClass('themebg')
								.css('background-color',color);
						},time );	
						
					}
				});
				
			}
		});
		
		
		/* ---------------------------------------------------------------------------
		 * Animate Math [counter, quick_fact, etc.]
		 * --------------------------------------------------------------------------- */
		jQuery('.animate-math .number').waypoint({
			offset		: '100%',
			triggerOnce	: true,
			handler		: function(){
				var el			= jQuery(this);
				var duration	= Math.floor((Math.random()*1000)+1000);
				var to			= el.attr('data-to');

				jQuery({property:0}).animate({property:to}, {
					duration	: duration,
					easing		:'linear',
					step		: function() {
						el.text(Math.floor(this.property));
					},
					complete	: function() {
						el.text(this.property);
					}
				});
			}
		});
		
		
		// carouFredSel wrapper | Height
		mfn_carouFredSel_height();
		
		// Sidebar | Height
		mfn_sidebar();
		
		// Sliding Footer | Height
		mfn_footer();
		
		// Header | Width
		mfn_header();

		// Full Screen Section
		mfn_sectionH();
		
		// Navigation | Hash
		hashNav();
		
		// niceScroll | Padding right fix for short content
		niceScrollFix();
	});
	

	/* --------------------------------------------------------------------------------------------------------------------------
	 * jQuery(document).mouseup
	 * ----------------------------------------------------------------------------------------------------------------------- */
	jQuery(document).mouseup(function(e){
		
		// search
		if( jQuery("#searchform").has(e.target).length === 0 ){
			if( jQuery("#searchform").hasClass('focus') ){
				jQuery(this).find('.icon_close').click();
			}
		}
		
	});
	
	
	/* ---------------------------------------------------------------------------
	 * Sliders configuration
	 * --------------------------------------------------------------------------- */
	
	// carouFredSel wrapper Height set -------------------------------------------
	function mfn_carouFredSel_height(){
		jQuery('.caroufredsel_wrapper > ul').each(function(){
			var el = jQuery(this);
			var maxH = 0;
			el.children('li').each(function(){				
				if( jQuery(this).innerHeight() > maxH ){
					maxH = jQuery(this).innerHeight();
				}
			});
//			console.log(maxH);
			el.closest('.caroufredsel_wrapper').height( maxH );
		});
		
	}
	
	// --- Slider ----------------------------------------------------------------
function mfnSliderContent(){	
		$('.content_slider_ul').each(function(){

			if( $(this).closest('.content_slider').hasClass('carousel') ){
				var style = { min:1, max:6};
			} else {
				var style = 1;
			}

			// Init carouFredSel
			$( this ).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					width	: 380,
					visible	: style
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing'
				},
				prev        : {
					button		: function(){
						return $(this).closest('.content_slider').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return $(this).closest('.content_slider').find('.slider_next');
					}
				},
				pagination	: {
					container	: function(){
						return $(this).closest('.content_slider').find('.slider_pagination');
					}
				},
				auto		: {
					play			: window.mfn_sliders.slider ? true : false,
					timeoutDuration	: window.mfn_sliders.slider ? window.mfn_sliders.slider : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						$(this).find('a').addClass('disable');
						$(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						$(this).find('a').removeClass('disable');
					}
				}
			});
			
			// Disable accidental clicks while swiping
			$(this).on('click', 'a.disable', function() {
				return false; 
			});
		});
	}
	
	
	
	// --- Testimonials ----------------------------------------------------------------
	function mfnSliderTestimonials(){	
		$('.testimonials_slider_ul').each(function(){
			
			// Init carouFredSel
			$(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					visible	: 1,
					width	: 100
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing'
				},
				prev        : {
					button		: function(){
						return $(this).closest('.testimonials_slider').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return $(this).closest('.testimonials_slider').find('.slider_next');
					}
				},
				pagination	: {
					container	: function(){
						return $(this).closest('.testimonials_slider').find('.slider_pager');
					},
					anchorBuilder : false
				},
				auto		: {
					play			: window.mfn_sliders.testimonials ? true : false,
					timeoutDuration	: window.mfn_sliders.testimonials ? window.mfn_sliders.testimonials : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						$(this).find('a').addClass('disable');
						$(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						$(this).find('a').removeClass('disable');
					}
				}
			});
			
			// Disable accidental clicks while swiping
			$(this).on('click', 'a.disable', function() {
				return false; 
			});
		});
	}
	
	
	// --- Offer -----------------------------------------------------------------
	function mfnSliderOffer(){	
		jQuery('.offer_ul').each(function(){
			
			// Init carouFredSel
			jQuery(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					visible	: 1,
					width	: 100
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing',
					onAfter		: function(){
						jQuery(this).closest('.offer').find('.current').text(jQuery(this).triggerHandler("currentPosition")+1);
					}
				},
				prev        : {
					button		: function(){
						return jQuery(this).closest('.offer').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return jQuery(this).closest('.offer').find('.slider_next');
					}
				},
				auto		: {
					play			: window.mfn_sliders.offer ? true : false,
					timeoutDuration	: window.mfn_sliders.offer ? window.mfn_sliders.offer : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						jQuery(this).find('a').addClass('disable');
						jQuery(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						jQuery(this).find('a').removeClass('disable');
						jQuery(this).closest('.offer').find('.current').text(jQuery(this).triggerHandler("currentPosition")+1);
					}
				}
			});
			
			// Disable accidental clicks while swiping
			jQuery(this).on('click', 'a.disable', function() {
				return false; 
			});
			
			// Items count
			var count = jQuery(this).children('.offer_li').length;
			jQuery(this).closest('.offer').find('.count').text(count);
		});
	}
	
	
	// --- Offer Thumb -----------------------------------------------------------------
	function mfnSliderOfferThumb_Pager(nr) {
		var thumb = jQuery('.offer_thumb').find('.offer_thumb_li:eq('+ (nr-1) +') .thumbnail img').attr('src');			
	    return '<a href="#'+ nr +'"><img src="'+ thumb +'" alt="'+ nr +'" /></a>';
	}
	
	function mfnSliderOfferThumb(){	
		jQuery('.offer_thumb_ul').each(function(){
			
			// Init carouFredSel
			jQuery(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					visible	: 1,
					width	: 100
				},
				pagination	: {
				 	container		: jQuery(this).closest('.offer_thumb').find('.slider_pagination'),
				 	anchorBuilder	: mfnSliderOfferThumb_Pager
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing',
					onAfter		: function(){
						jQuery(this).closest('.offer_thumb').find('.current').text(jQuery(this).triggerHandler("currentPosition")+1);
					}
				},
				auto		: {
					play			: window.mfn_sliders.offer ? true : false,
					timeoutDuration	: window.mfn_sliders.offer ? window.mfn_sliders.offer : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						jQuery(this).find('a').addClass('disable');
						jQuery(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						jQuery(this).find('a').removeClass('disable');
						jQuery(this).closest('.offer_thumb').find('.current').text(jQuery(this).triggerHandler("currentPosition")+1);
					}
				}
			});
			
			// Disable accidental clicks while swiping
			jQuery(this).on('click', 'a.disable', function() {
				return false; 
			});
		});
	}
	
	
	// --- Blog ------------------------------------------------------------------	
	function mfnSliderBlog(){	
		jQuery('.blog_slider_ul').each(function(){
			
			// Init carouFredSel
			jQuery(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					width : 380,
					visible	: {
						min		: 1,
						max		: 4
					}
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing'
				},
				prev        : {
					button		: function(){
						return jQuery(this).closest('.blog_slider').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return jQuery(this).closest('.blog_slider').find('.slider_next');
					}
				},
				pagination	: {
					container	: function(){
						return jQuery(this).closest('.blog_slider').find('.slider_pagination');
					}
				},
				auto		: {
					play			: window.mfn_sliders.blog ? true : false,
					timeoutDuration	: window.mfn_sliders.blog ? window.mfn_sliders.blog : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						jQuery(this).find('a').addClass('disable');
						jQuery(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						jQuery(this).find('a').removeClass('disable');
					}
				}
			});
			
			// Disable accidental clicks while swiping
			jQuery(this).on('click', 'a.disable', function() {
				return false; 
			});
		});
	}
	
	
	// --- Clients ------------------------------------------------------------------	
	function mfnSliderClients(){	
		jQuery('.clients_slider_ul').each(function(){
			
			// Init carouFredSel
			jQuery(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					width : 380,
					visible	: {
						min		: 1,
						max		: 4
					}
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing'
				},
				prev        : {
					button		: function(){
						return jQuery(this).closest('.clients_slider').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return jQuery(this).closest('.clients_slider').find('.slider_next');
					}
				},
				pagination	: {
					container	: function(){
						return jQuery(this).closest('.clients_slider').find('.slider_pagination');
					}
				},
				auto		: {
					play			: window.mfn_sliders.clients ? true : false,
					timeoutDuration	: window.mfn_sliders.clients ? window.mfn_sliders.clients : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						jQuery(this).find('a').addClass('disable');
						jQuery(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						jQuery(this).find('a').removeClass('disable');
					}
				}
			});
			
			// Disable accidental clicks while swiping
			jQuery(this).on('click', 'a.disable', function() {
				return false; 
			});
		});
	}
	
	
	// --- Shop ------------------------------------------------------------------	
	function mfnSliderShop(){	
		jQuery('.shop_slider_ul').each(function(){
			
			// Init carouFredSel
			jQuery(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					width : 380,
					visible	: {
						min		: 1,
						max		: 4
					}
				},
				scroll		: {
					duration	: 500,
					easing		: 'swing'
				},
				prev        : {
					button		: function(){
						return jQuery(this).closest('.shop_slider').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return jQuery(this).closest('.shop_slider').find('.slider_next');
					}
				},
				pagination	: {
					container	: function(){
						return jQuery(this).closest('.shop_slider').find('.slider_pagination');
					}
				},
				auto		: {
					play			: window.mfn_sliders.shop ? true : false,
					timeoutDuration	: window.mfn_sliders.shop ? window.mfn_sliders.shop : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						jQuery(this).find('a').addClass('disable');
						jQuery(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						jQuery(this).find('a').removeClass('disable');
					}
				}
			});
			
			// Disable accidental clicks while swiping
			jQuery(this).on('click', 'a.disable', function() {
//				return false; 
			});
		});
	}
	
	
	// --- Portfolio -------------------------------------------------------------
	function mfnSliderPortfolio(){	
		jQuery('.portfolio_slider_ul').each(function(){
			
			// Init carouFredSel
			jQuery(this).carouFredSel({
				circular	: true,
				responsive	: true,
				items		: {
					width : 380,
					visible	: {
						min		: 1,
						max		: 5
					}
				},
				scroll		: {
					duration	: 600,
					easing		: 'swing'
				},
				prev        : {
					button		: function(){
						return jQuery(this).closest('.portfolio_slider').find('.slider_prev');
					}
				},
				next        : {
					button		: function(){
						return jQuery(this).closest('.portfolio_slider').find('.slider_next');
					}
				},
				auto		: {
					play			: window.mfn_sliders.portfolio ? true : false,
					timeoutDuration	: window.mfn_sliders.portfolio ? window.mfn_sliders.portfolio : 2500,
				},
				swipe		: {
					onTouch		: true,
					onMouse		: true,
					onBefore	: function(){
						jQuery(this).find('a').addClass('disable');
						jQuery(this).find('li').trigger('mouseleave');
					},
					onAfter		: function(){
						jQuery(this).find('a').removeClass('disable');
					}
				}
			});
			
			// Disable accidental clicks while swiping
			jQuery(this).on('click', 'a.disable', function() {
				return false; 
			});
		});
	}

window.mfn_nicescroll = 25;
			window.mfn_prettyphoto = {
				disable : 0,
				width : 0,
				height : 0
			};
			window.mfn_sliders = {
				blog : 0,
				clients : 0,
				offer : 10000,
				portfolio : 0,
				shop : 0,
				slider : 6000,
				testimonials : 7000
		
		};
	



				jQuery(document).ready(function($) {
					jQuery('.masonry.isotope,.isotope').isotope();
					
					jQuery('#configurator .control').click(function(e) {
						e.preventDefault();
						if (jQuery('#configurator').hasClass('active')) {
							jQuery('#configurator').removeClass('active').animate({
								'right' : -272
							}, 500);
						} else {
							jQuery('#configurator').addClass('active').animate({
								'right' : -1
							}, 500);
						}
					});
					jQuery('#mfn-demo-panel .control').click(function(e) {
						e.preventDefault();
						if (jQuery('#mfn-demo-panel').hasClass('active')) {
							jQuery('#mfn-demo-panel').removeClass('active').animate({
								'right' : -367
							}, 500);
						} else {
							jQuery('#mfn-demo-panel').addClass('active').animate({
								'right' : -1
							}, 500);
						}
					});
	
	demosSliderH();
		/* ---------------------------------------------------------------------------
		 * niceScroll
		 * --------------------------------------------------------------------------- */ 
		jQuery(".demos-slider").niceScroll({
    		autohidemode		: false,
    		cursorborder		: 0,
    		cursorborderradius	: 5,
    		cursorcolor			: '#222222',
    		cursorwidth			: 0,
    		horizrailenabled	: false,
    		mousescrollstep		: 40,
    		scrollspeed			: 60
    	});
		
		
	
					jQuery('#configurator .select-layout a').click(function(e) {
						e.preventDefault();
						var newClass = jQuery(this).attr('class');
						jQuery('body').removeClass('layout-full-width layout-boxed').addClass(newClass);
						jQuery(this).parent().addClass('active').siblings().removeClass('active');
						jQuery(window).trigger('resize');
					});
					jQuery('#configurator .select-header a:not(.minimalist-header)').click(function(e) {
						var link = jQuery(this).attr('href');
						if (link == '#')
							e.preventDefault();
						var newClass = jQuery(this).attr('class');
						jQuery('body').removeClass('minimalist-header header-modern header-classic header-simple header-empty header-stack header-center header-left header-right header-fixed header-below header-transparent header-magazine').addClass(newClass);
						jQuery(this).parent().addClass('active').siblings().removeClass('active');
						jQuery('a.minimalist-header').removeClass('active');
						if (newClass == 'header-below') {
							jQuery('#mfn-rev-slider').insertAfter('#Sliding-top');
						} else {
							jQuery('#mfn-rev-slider').insertAfter('#Top_bar');
						}
						jQuery(window).resize();
					});
					jQuery('#configurator a.minimalist-header').click(function(e) {
						e.preventDefault();
						jQuery('body').addClass('minimalist-header');
						jQuery(this).addClass('active');
					});
					jQuery('#configurator .select-color a').click(function(e) {
						e.preventDefault();
						var style = jQuery(this).attr('style');
						var value = style.substr(style.length - 7);						
				jQuery('head style.old_style').remove();
				jQuery('head').append('<style class="old_style">#Error_404 .error_pic i, .button-love a.mfn-love, .fancy_heading_arrows .icon-left-dir, .fancy_heading_arrows .icon-right-dir, .fancy_heading_icon .icon_top, .fancy_heading_line .title, .format-link .post-title .icon-link, .opening_hours .opening_hours_wrapper li span, .pager-single a:hover, .pager-single > span, .shop_slider .shop_slider_ul li .item_wrapper .price, .themecolor, .widget_archive ul, .widget_meta ul, .widget_mfn_recent_comments ul li::after, .widget_nav_menu ul, .widget_pages ul, .widget_price_filter .price_label .from, .widget_price_filter .price_label .to, .widget_recent_comments ul li::after, .widget_rss ul, .woocommerce .product div.entry-summary .price, .woocommerce .star-rating span, .woocommerce ul.product_list_widget li .quantity .amount, .woocommerce ul.products li.product .price, .woocommerce-page ul.products li.product .price {    color: '+value+';}#Filters .filters_wrapper ul li a:hover, #Top_bar a#header_cart span, #comments .commentlist > li .reply a.comment-reply-link, .Recent_posts ul li .desc::after, .Recent_posts ul li .photo .c, .fixed-nav .arrow, .offer_thumb .slider_pagination a.selected::after, .offer_thumb .slider_pagination a::before, .pager .pages a.active, .pager .pages a:hover, .pager .pages span.page-numbers.current, .pager-single span::after, .slider_pagination a.selected, .slider_pagination a.selected::after, .testimonials_slider .slider_images, .testimonials_slider .slider_images a::after, .testimonials_slider .slider_images::before, .themebg, .tp-bullets.simplebullets.round .bullet.selected, .tp-bullets.simplebullets.round .bullet.selected::after, .tp-bullets.tp-thumbs .bullet.selected::after, .tp-leftarrow.default, .tp-rightarrow.default, .widget_categories ul, .widget_mfn_menu ul li a:hover, .widget_mfn_menu ul li.current_page_item a, .widget_product_categories ul, .widget_recent_entries ul li::after, div.jp-interface {    background-color: '+value+';}a {    color: '+value+';}*::-moz-selection {    background-color: '+value+';}.dropcap, .highlight:not(.highlight_image) {    background-color: '+value+';}a.button_theme, a.tp-button.button_theme, button, input[type="button"], input[type="reset"], input[type="submit"] {    background-color: '+value+';}a.mfn-link:hover {    color: '+value+';}.woocommerce a.button_theme, .woocommerce button.button, .woocommerce input[type="button"], .woocommerce input[type="reset"], .woocommerce input[type="submit"] {    background-color: '+value+' !important;}.column_column ol, .column_column ul, .the_content_wrapper ol, .the_content_wrapper ul {    color: #737e86;}.hr_color, .hr_color hr, .hr_dots span {    background: '+value+' none repeat scroll 0 0;    color: '+value+';}.hr_zigzag i {    color: '+value+';}.highlight-left::after, .highlight-right::after {    background: '+value+' none repeat scroll 0 0;}@media only screen and (max-width: 767px) {.highlight-left .column:first-child, .highlight-right .column:last-child {    background: '+value+' none repeat scroll 0 0;}}#Top_bar .menu > li.current-menu-ancestor > a, #Top_bar .menu > li.current-menu-item > a, #Top_bar .menu > li.current_page_ancestor > a, #Top_bar .menu > li.current_page_item > a, #Top_bar .menu > li.hover > a {    color: '+value+';}#Top_bar .menu > li a::after, .menu-highlight #Top_bar #menu > ul > li.current-menu-ancestor > a, .menu-highlight #Top_bar #menu > ul > li.current-menu-item > a, .menu-highlight #Top_bar #menu > ul > li.current_page_ancestor > a, .menu-highlight #Top_bar #menu > ul > li.current_page_item > a, .menu-highlight #Top_bar #menu > ul > li.hover > a {    background: '+value+' none repeat scroll 0 0;}#Top_bar .search_wrapper {    background: '+value+' none repeat scroll 0 0;}#Subheader ul.breadcrumbs li, #Subheader ul.breadcrumbs li a {    color: rgba(136, 136, 136, 0.6);}#Footer a {    color: '+value+';}#Footer .star-rating span, #Footer .themecolor, #Footer .widget_archive ul, #Footer .widget_meta ul, #Footer .widget_mfn_recent_comments ul li::after, #Footer .widget_nav_menu ul, #Footer .widget_pages ul, #Footer .widget_price_filter .price_label .from, #Footer .widget_price_filter .price_label .to, #Footer .widget_recent_comments ul li::after, #Footer .widget_rss ul {    color: '+value+';}#Footer .Recent_posts ul li .desc::after, #Footer .Recent_posts ul li .photo .c, #Footer .themebg, #Footer .widget_categories ul, #Footer .widget_mfn_menu ul li a:hover, #Footer .widget_product_categories ul, #Footer .widget_recent_entries ul li::after {    background-color: '+value+';}#Sliding-top a {    color: '+value+';}#Sliding-top .star-rating span, #Sliding-top .themecolor, #Sliding-top .widget_archive ul, #Sliding-top .widget_meta ul, #Sliding-top .widget_mfn_recent_comments ul li::after, #Sliding-top .widget_nav_menu ul, #Sliding-top .widget_pages ul, #Sliding-top .widget_price_filter .price_label .from, #Sliding-top .widget_price_filter .price_label .to, #Sliding-top .widget_recent_comments ul li::after, #Sliding-top .widget_rss ul {    color: '+value+';}#Sliding-top .Recent_posts ul li .desc::after, #Sliding-top .Recent_posts ul li .photo .c, #Sliding-top .themebg, #Sliding-top .widget_categories ul, #Sliding-top .widget_mfn_menu ul li a:hover, #Sliding-top .widget_product_categories ul, #Sliding-top .widget_recent_entries ul li::after {    background-color: '+value+';}.image_frame .image_wrapper .image_links {    background: rgba(41, 145, 214, 0.8) none repeat scroll 0 0;}.image_frame .image_wrapper .image_links a:hover {    background: #fff none repeat scroll 0 0;    color: '+value+';}.sliding_box .desc_wrapper {    background: '+value+' none repeat scroll 0 0;}.sliding_box .desc_wrapper::after {    border-bottom-color: '+value+';}.counter .icon_wrapper i, .quick_fact .number {    color: '+value+';}.progress_bars .bars_list li .bar .progress {    background-color: '+value+';}a.icon_bar:hover {    color: '+value+' !important;}a.content_link, a.content_link:hover {    color: '+value+';}a.content_link::before {    border-bottom-color: '+value+';}a.content_link::after {    border-color: '+value+';}.get_in_touch, .infobox {    background-color: '+value+';}.column_map .google-map-contact-wrapper .get_in_touch::after {    border-top-color: '+value+';}.timeline .post-item::before, .timeline_items li h3::before, .timeline_items::after {    border-color: '+value+';}.how_it_works .image .number {    background: '+value+' none repeat scroll 0 0;}.trailer_box .desc .subtitle {    background-color: '+value+';}.icon_box .icon_wrapper, .icon_box a .icon_wrapper {    color: '+value+';}.icon_box a:hover .icon_wrapper::before, .icon_box:hover .icon_wrapper::before {    background-color: '+value+';}ul.clients.clients_tiles li .client_wrapper:hover::before {    background: '+value+' none repeat scroll 0 0;}ul.clients.clients_tiles li .client_wrapper::after {    border-bottom-color: '+value+';}.list_item.lists_1 .list_left {    background-color: '+value+';}.feature_list ul li .icon i, .list_item .list_left {    color: '+value+';}.feature_list ul li:hover, .feature_list ul li:hover a {    background: '+value+' none repeat scroll 0 0;}.accordion .question.active .title, .accordion .question.active .title > .acc-icon-minus, .accordion .question.active .title > .acc-icon-plus, .faq .question.active .title, .faq .question.active .title > .acc-icon-plus, .ui-tabs .ui-tabs-nav li.ui-state-active a { color: '+value+';}.ui-tabs .ui-tabs-nav li.ui-state-active a::after, table tr:hover td {    background: '+value+' none repeat scroll 0 0;}.pricing-box .plan-header .price sup.currency, .pricing-box .plan-header .price > span {    color: '+value+';}.pricing-box .plan-inside ul li .yes, .pricing-box-box.pricing-box-featured {    background: '+value+' none repeat scroll 0 0;}.shop_slider .shop_slider_ul li .item_wrapper span.onsale, .woocommerce span.onsale {    border-top-color: '+value+' !important;}.woocommerce .widget_price_filter .ui-slider .ui-slider-handle {border-color: '+value+' !important;}</style>');
					});
					
					jQuery('#configurator .select-image a').click(function(e) {
						e.preventDefault();
						var bg_attr = jQuery(this).attr('data-rel');
						var bg = 'url("http://be.beantownthemes.com/html/images/patterns/' + jQuery(this).attr('data-image') + '.png") ' + bg_attr;
						jQuery('html').css('background', 'none').css('background', bg);
						jQuery('body').removeClass('layout-full-width').addClass('layout-boxed');
						
					});
					/*jQuery('#colorSelector').ColorPicker({
						color : '#3996D3',
						onShow : function(colpkr) {
							jQuery(colpkr).fadeIn(500);
							return false;
						},
						onHide : function(colpkr) {
							jQuery(colpkr).fadeOut(500);
							var color = jQuery('#colorSelector').attr('data-color');
							if (color) {
								jQuery('#configurator .inp-color').attr('name', 'mfn-c').val('one');
								jQuery('#configurator .inp-one').attr('name', 'mfn-o').val(color);
							}
							return false;
						},
						onChange : function(hsb, hex, rgb) {
							jQuery('#colorSelector').css('background-color', '#' + hex).attr('data-color', hex);
						var value="#"+hex;
						jQuery('head style.old_style').remove();
						jQuery('head').append('<style class="old_style">#Error_404 .error_pic i, .button-love a.mfn-love, .fancy_heading_arrows .icon-left-dir, .fancy_heading_arrows .icon-right-dir, .fancy_heading_icon .icon_top, .fancy_heading_line .title, .format-link .post-title .icon-link, .opening_hours .opening_hours_wrapper li span, .pager-single a:hover, .pager-single > span, .shop_slider .shop_slider_ul li .item_wrapper .price, .themecolor, .widget_archive ul, .widget_meta ul, .widget_mfn_recent_comments ul li::after, .widget_nav_menu ul, .widget_pages ul, .widget_price_filter .price_label .from, .widget_price_filter .price_label .to, .widget_recent_comments ul li::after, .widget_rss ul, .woocommerce .product div.entry-summary .price, .woocommerce .star-rating span, .woocommerce ul.product_list_widget li .quantity .amount, .woocommerce ul.products li.product .price, .woocommerce-page ul.products li.product .price {    color: '+value+';}#Filters .filters_wrapper ul li a:hover, #Top_bar a#header_cart span, #comments .commentlist > li .reply a.comment-reply-link, .Recent_posts ul li .desc::after, .Recent_posts ul li .photo .c, .fixed-nav .arrow, .offer_thumb .slider_pagination a.selected::after, .offer_thumb .slider_pagination a::before, .pager .pages a.active, .pager .pages a:hover, .pager .pages span.page-numbers.current, .pager-single span::after, .slider_pagination a.selected, .slider_pagination a.selected::after, .testimonials_slider .slider_images, .testimonials_slider .slider_images a::after, .testimonials_slider .slider_images::before, .themebg, .tp-bullets.simplebullets.round .bullet.selected, .tp-bullets.simplebullets.round .bullet.selected::after, .tp-bullets.tp-thumbs .bullet.selected::after, .tp-leftarrow.default, .tp-rightarrow.default, .widget_categories ul, .widget_mfn_menu ul li a:hover, .widget_mfn_menu ul li.current_page_item a, .widget_product_categories ul, .widget_recent_entries ul li::after, div.jp-interface {    background-color: '+value+';}a {    color: '+value+';}*::-moz-selection {    background-color: '+value+';}.dropcap, .highlight:not(.highlight_image) {    background-color: '+value+';}a.button_theme, a.tp-button.button_theme, button, input[type="button"], input[type="reset"], input[type="submit"] {    background-color: '+value+';}a.mfn-link:hover {    color: '+value+';}.woocommerce a.button_theme, .woocommerce button.button, .woocommerce input[type="button"], .woocommerce input[type="reset"], .woocommerce input[type="submit"] {    background-color: '+value+' !important;}.column_column ol, .column_column ul, .the_content_wrapper ol, .the_content_wrapper ul {    color: #737e86;}.hr_color, .hr_color hr, .hr_dots span {    background: '+value+' none repeat scroll 0 0;    color: '+value+';}.hr_zigzag i {    color: '+value+';}.highlight-left::after, .highlight-right::after {    background: '+value+' none repeat scroll 0 0;}@media only screen and (max-width: 767px) {.highlight-left .column:first-child, .highlight-right .column:last-child {    background: '+value+' none repeat scroll 0 0;}}#Top_bar .menu > li.current-menu-ancestor > a, #Top_bar .menu > li.current-menu-item > a, #Top_bar .menu > li.current_page_ancestor > a, #Top_bar .menu > li.current_page_item > a, #Top_bar .menu > li.hover > a {    color: '+value+';}#Top_bar .menu > li a::after, .menu-highlight #Top_bar #menu > ul > li.current-menu-ancestor > a, .menu-highlight #Top_bar #menu > ul > li.current-menu-item > a, .menu-highlight #Top_bar #menu > ul > li.current_page_ancestor > a, .menu-highlight #Top_bar #menu > ul > li.current_page_item > a, .menu-highlight #Top_bar #menu > ul > li.hover > a {    background: '+value+' none repeat scroll 0 0;}#Top_bar .search_wrapper {    background: '+value+' none repeat scroll 0 0;}#Subheader ul.breadcrumbs li, #Subheader ul.breadcrumbs li a {    color: rgba(136, 136, 136, 0.6);}#Footer a {    color: '+value+';}#Footer .star-rating span, #Footer .themecolor, #Footer .widget_archive ul, #Footer .widget_meta ul, #Footer .widget_mfn_recent_comments ul li::after, #Footer .widget_nav_menu ul, #Footer .widget_pages ul, #Footer .widget_price_filter .price_label .from, #Footer .widget_price_filter .price_label .to, #Footer .widget_recent_comments ul li::after, #Footer .widget_rss ul {    color: '+value+';}#Footer .Recent_posts ul li .desc::after, #Footer .Recent_posts ul li .photo .c, #Footer .themebg, #Footer .widget_categories ul, #Footer .widget_mfn_menu ul li a:hover, #Footer .widget_product_categories ul, #Footer .widget_recent_entries ul li::after {    background-color: '+value+';}#Sliding-top a {    color: '+value+';}#Sliding-top .star-rating span, #Sliding-top .themecolor, #Sliding-top .widget_archive ul, #Sliding-top .widget_meta ul, #Sliding-top .widget_mfn_recent_comments ul li::after, #Sliding-top .widget_nav_menu ul, #Sliding-top .widget_pages ul, #Sliding-top .widget_price_filter .price_label .from, #Sliding-top .widget_price_filter .price_label .to, #Sliding-top .widget_recent_comments ul li::after, #Sliding-top .widget_rss ul {    color: '+value+';}#Sliding-top .Recent_posts ul li .desc::after, #Sliding-top .Recent_posts ul li .photo .c, #Sliding-top .themebg, #Sliding-top .widget_categories ul, #Sliding-top .widget_mfn_menu ul li a:hover, #Sliding-top .widget_product_categories ul, #Sliding-top .widget_recent_entries ul li::after {    background-color: '+value+';}.image_frame .image_wrapper .image_links {    background: rgba(41, 145, 214, 0.8) none repeat scroll 0 0;}.image_frame .image_wrapper .image_links a:hover {    background: #fff none repeat scroll 0 0;    color: '+value+';}.sliding_box .desc_wrapper {    background: '+value+' none repeat scroll 0 0;}.sliding_box .desc_wrapper::after {    border-bottom-color: '+value+';}.counter .icon_wrapper i, .quick_fact .number {    color: '+value+';}.progress_bars .bars_list li .bar .progress {    background-color: '+value+';}a.icon_bar:hover {    color: '+value+' !important;}a.content_link, a.content_link:hover {    color: '+value+';}a.content_link::before {    border-bottom-color: '+value+';}a.content_link::after {    border-color: '+value+';}.get_in_touch, .infobox {    background-color: '+value+';}.column_map .google-map-contact-wrapper .get_in_touch::after {    border-top-color: '+value+';}.timeline .post-item::before, .timeline_items li h3::before, .timeline_items::after {    border-color: '+value+';}.how_it_works .image .number {    background: '+value+' none repeat scroll 0 0;}.trailer_box .desc .subtitle {    background-color: '+value+';}.icon_box .icon_wrapper, .icon_box a .icon_wrapper {    color: '+value+';}.icon_box a:hover .icon_wrapper::before, .icon_box:hover .icon_wrapper::before {    background-color: '+value+';}ul.clients.clients_tiles li .client_wrapper:hover::before {    background: '+value+' none repeat scroll 0 0;}ul.clients.clients_tiles li .client_wrapper::after {    border-bottom-color: '+value+';}.list_item.lists_1 .list_left {    background-color: '+value+';}.feature_list ul li .icon i, .list_item .list_left {    color: '+value+';}.feature_list ul li:hover, .feature_list ul li:hover a {    background: '+value+' none repeat scroll 0 0;}.accordion .question.active .title, .accordion .question.active .title > .acc-icon-minus, .accordion .question.active .title > .acc-icon-plus, .faq .question.active .title, .faq .question.active .title > .acc-icon-plus, .ui-tabs .ui-tabs-nav li.ui-state-active a { color: '+value+';}.ui-tabs .ui-tabs-nav li.ui-state-active a::after, table tr:hover td {    background: '+value+' none repeat scroll 0 0;}.pricing-box .plan-header .price sup.currency, .pricing-box .plan-header .price > span {    color: '+value+';}.pricing-box .plan-inside ul li .yes, .pricing-box-box.pricing-box-featured {    background: '+value+' none repeat scroll 0 0;}.shop_slider .shop_slider_ul li .item_wrapper span.onsale, .woocommerce span.onsale {    border-top-color: '+value+' !important;}.woocommerce .widget_price_filter .ui-slider .ui-slider-handle {border-color: '+value+' !important;}</style>');
							
						}
					});*/
				});

				
})(jQuery);

 function demosSliderH(){
    	var panel = jQuery('#mfn-demo-panel');
		var panelH = panel.height() - panel.find('.header').height();
		jQuery(".demos-slider").height(panelH);
    }
