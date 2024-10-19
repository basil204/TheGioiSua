/**
 * The theme scripts file
 *
 * This file contains custom JavaScript functionality for the Special theme. It
 * utilizes the jQuery javascript framework.
 *
 * @package WordPress
 * @subpackage Special
 * @since Special 1.0
 */

// Enclose the script so that it does not conflict with other scripts.
(function($) {

	/**
	 * Call us toggle functionality
	 *
	 * The script below powers the call us toggle functionality located in the
	 * top right of the page.
	 */
	function callUsToggle() {

		// If there is a call us block.
		if ( $('#call-us').length > 0 ) {

			// When a user clicks the toggle link.
			$('#call-us-heading').click(function(){

				// Toggle active classes on the link and wrapper.
				$(this).toggleClass('active');
				$('#call-us').toggleClass('active');

			});

		}

	}

	/**
	 * Header menu toggle functionality.
	 *
	 * The script below powers both the mobile and desktop header menu toggle
	 * functionality.
	 */
	function headerMenuToggle() {

		// If there is a header menu.
		if ( $('#menu-header-menu').length > 0 ) {

			// When a user clicks the mobile menu toggle.
			$('#header-menu-toggle').click(function(event) {
				event.preventDefault();
				$(this).toggleClass('active');
				$('#menu-header-menu').slideToggle();
			});

			// When a user clicks on a drop down menu link.
			$('#menu-header-menu > .menu-item-has-children > a').click(function(event) {
				event.preventDefault();
				$(this).parent().toggleClass('active').find('ul').slideToggle();
			});

		}

	}

	/**
	 * Reset the header menu.
	 *
	 * The script below removes inline styles added by the toggle script so that
	 * the main menu works when the browser window is resized.
	 */
	function resetHeaderMenu() {

		// If there is a header menu.
		if ( $('#menu-header-menu').length > 0 ) {

			// Store the width of the browser window.
			var windowWidth = $(window).width();

			// If it is a large display.
			if ( windowWidth >= 1200 ) {

				// Reset the menu.
				$('#header-menu-toggle').removeClass('active');
				$('#menu-header-menu').removeAttr('style');

			}

		}

	}

	/**
	 * Make changes to the footer
	 *
	 * The script below creates a wrapper around the first word of widget titles
	 * so they can be styled thinner and adds a link to the latest news widget.
	 */
	function improveFooter() {

		// If there is a footer widget.
		if ( $('#footer-widgets-wrapper .widget').length > 0 ) {

			// Wrap the first word of the footer widget titles.
			$('#footer-widgets-wrapper .widget-title').each(function() {
				$(this).html($(this).html().replace(/^(\w+)/, '<span>$1</span>'));
			});

		}

		// If there is a recent news widget.
		if ( $('#recent-posts-2').length > 0 ) {

			// Add a link to view all news posts.
			var postLink = $('#recent-posts-2 a').attr('href');
			$('#recent-posts-2').append('<p><a href="' + postLink + '">View post</a> - <a href="/news/">View all news</a></p>');

		}

	}

	/**
	 * Portfolio filtering functionality
	 *
	 * The script below adds animated filtering to the portfolio page by using
	 * the Isotope plugin.
	 */
	function portfolioFiltering() {

		// If it is the portfolio page.
		if ( $('#portoflio-wrapper').length > 0 ) {

			// Configure the Isotope container.
			var $container = $('#portoflio-wrapper');

			// Call and configure Isotope.
			$container.isotope({
				itemSelector : '.portfolio-piece',
				layoutMode : 'masonry',
				resizable : 'true',
				packery: {
					isHorizontal: true
				}
			});

			// Set up filtering.
			$('#industry-filter, #services-filter').change(function() {
				var industry = $('#industry-filter').val();
				var service = $('#services-filter').val();
				var selector = industry + service;
				if (selector){
					$container.isotope({ filter: selector });
				}
				else {
					$container.isotope({ filter: '*' });
				}
				return false;
			});

		}

	}

	/**
	 * Home page slideshow
	 *
	 * The script below sets up the home page slideshow using the owl carousel
	 * jQuery plugin.
	 */
	function homePageSlideshow() {

		// If there is a slideshow.
		if ( $("#slideshow").length > 0 ) {

			// Set up Owl Carousel.
			$("#slideshow").owlCarousel({
				items: 1,
				nav: true,
				dots: false,
				loop: true
			});

		}

	}
	
	/**
	 * Presentation slideshow
	 *
	 * The script below sets up the presantation slideshow using the owl carousel
	 * jQuery plugin.
	 */
	function presentationSlideshow() {

		// If there is a slideshow.
		if ( $("#presentation").length > 0 ) {

			// Set up Owl Carousel.
			$("#presentation").owlCarousel({
				items: 1,
				nav: true,
				dots: false,
				loop: true
			});

		}

	}

	/**
	 * Home page client toggle functionality
	 *
	 * The script below powers the client carousel toggle functionality on the
	 * theme home pages.
	 */
	function clientsToggle() {

		// If there is a clients block.
		if ( $('#clients-section').length > 0 ) {

			// Make the first carousel active.
			$('#trusted-by-toggle').addClass('active');
			$('#partnered-carousel').hide();

			// When a user clicks the trusted by toggle.
			$('#trusted-by-toggle').click(function(event){
				event.preventDefault();
				$('#clients-toggle .active').removeClass('active');
				$(this).addClass('active');
				$('#partnered-carousel').hide();
				$('#trusted-carousel').show();
			});

			// When a user clicks the prevented with toggle.
			$('#partnered-with-toggle').click(function(event){
				event.preventDefault();
				$('#clients-toggle .active').removeClass('active');
				$(this).addClass('active');
				$('#trusted-carousel').hide();
				$('#partnered-carousel').show();
			});

		}

	}

	/**
	 * Set up home page client slideshows.
	 *
	 * The script below uses the Owl Carousel plugin to set up carousels for
	 * the home page clients block.
	 */
	function clientSlideshows() {

		// If there is a trusted carousel.
		if ( $("#trusted-carousel").length > 0 ) {

			// Set up Owl Carousel.
			$("#trusted-carousel").owlCarousel({
				nav: true,
				margin: 5,
				loop: true,
				dots: false,
				responsive:{
					0:{
						items:2
					},
					640:{
						items:3
					},
					740:{
						items:4
					},
					1200:{
						items:6
					}
				}
			});

		}

		// If there is a partnered carousel.
		if ( $("#partnered-carousel").length > 0 ) {

			// Set up Owl Carousel.
			$("#partnered-carousel").owlCarousel({
				nav: true,
				margin: 5,
				loop: true,
				dots: false,
				responsive:{
					0:{
						items:2
					},
					640:{
						items:3
					},
					740:{
						items:4
					},
					1200:{
						items:6
					}
				}
			});

		}

	}

	/**
	 * Scrolling functionality
	 *
	 * The script below powers the home and portfolio scrolling links. These let
	 * users easily scroll to the main content that is below the fold.
	 */
	function homePageScrollLink() {

		// If there is a home page scroll link.
		if ( $('#home-scroll-link').length > 0 ) {

			// When a user clicks the scroll link.
			$('#home-scroll-link').click(function(event){

				// Prevent the default behavior and scroll the user down.
				event.preventDefault();
		        var contentOffset = $('#section').offset().top;
		        $('html,body').animate({ scrollTop: contentOffset }, 800, 'swing');

			});

		}

		// If there is a portfolio scroll link.
		if ( $('#info-link').length > 0 ) {

			// When a user clicks the scroll link.
			$('#info-link').click(function(event){

				// Prevent the default behavior and scroll the user down.
				event.preventDefault();
		        var contentOffset = $('#section-wrapper').offset().top;
		        $('html,body').animate({ scrollTop: contentOffset }, 800, 'swing');

			});

		}

	}

	/**
	 * Bio toggle functionality
	 *
	 * The script below adds the toggle functionality to team member bios on
	 * team page templates.
	 */
	function bioToggle() {

		if ( $('.bio-toggle').length > 0 ) {

			$('.bio-toggle').click(function(event){
				event.preventDefault();
				$(this).toggleClass('active').parent().parent().find('.bio').slideToggle();
			});

		}

	}


	// After the document is ready.
	$(document).ready(function() {

		// Call needed functions.
		callUsToggle();
		headerMenuToggle();
		improveFooter();
		homePageSlideshow();
		presentationSlideshow();
		clientsToggle();
		homePageScrollLink();
		bioToggle();

	});

	// When the window is resized.
	$(window).resize(function() {

		// Reset the header menu.
		resetHeaderMenu();

	});

	// After the entire page has loaded.
	$(window).load(function() {

		// Call needed functions.
		setTimeout( function() {
			portfolioFiltering();
			clientSlideshows();
		} , 500 );

	});

})(jQuery);
