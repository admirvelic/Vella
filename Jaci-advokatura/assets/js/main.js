/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

		(function($) {

			"use strict";
		
		
		  // Form
			var contactForm = function() {
				if ($('#contactForm').length > 0 ) {
					$( "#contactForm" ).validate( {
						rules: {
							name: "required",
							subject: "required",
							email: {
								required: true,
								email: true
							},
							message: {
								required: true,
								minlength: 5
							}
						},
						messages: {
							name: "Please enter your name",
							subject: "Please enter your subject",
							email: "Please enter a valid email address",
							message: "Please enter a message"
						},
						/* submit via ajax */
						
						submitHandler: function(form) {		
							var $submit = $('.submitting'),
								waitText = 'Submitting...';
		
							$.ajax({   	
							  type: "POST",
							  url: "php/sendEmail.php",
							  data: $(form).serialize(),
		
							  beforeSend: function() { 
								  $submit.css('display', 'block').text(waitText);
							  },
							  success: function(msg) {
							   if (msg == 'OK') {
								   $('#form-message-warning').hide();
									setTimeout(function(){
									   $('#contactForm').fadeIn();
								   }, 1000);
									setTimeout(function(){
									   $('#form-message-success').fadeIn();   
								   }, 1400);
		
								   setTimeout(function(){
									   $('#form-message-success').fadeOut();   
								   }, 8000);
		
								   setTimeout(function(){
									   $submit.css('display', 'none').text(waitText);  
								   }, 1400);
		
								   setTimeout(function(){
									   $( '#contactForm' ).each(function(){
														this.reset();
													});
								   }, 1400);
								   
								} else {
								   $('#form-message-warning').html(msg);
									$('#form-message-warning').fadeIn();
									$submit.css('display', 'none');
								}
							  },
							  error: function() {
								  $('#form-message-warning').html("Something went wrong. Please try again.");
								 $('#form-message-warning').fadeIn();
								 $submit.css('display', 'none');
							  }
						  });    		
						  } // end submitHandler
		
					});
				}
			};
			contactForm();
		
		})(jQuery);
		
})(jQuery);