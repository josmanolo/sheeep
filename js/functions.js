$(document).ready(function(){
	var targetOffset = $(".acercade").offset().top;
var targetOffset2 = $(".contacto").offset().top;

var $w = $(window).scroll(function(){
	if ( $w.scrollTop() >= targetOffset ) {   
		$("header nav h2").addClass("scroll");
		$("header nav span").addClass("scroll");
		
	} else {
		$("header nav h2").removeClass("scroll");
		$("header nav span").removeClass("scroll");
	}
});

var scrollC = $(window).scroll(function(){
	if ( scrollC.scrollTop() >= targetOffset2 ) {   
		$("header nav h2").addClass("scroll-white");
		$("header nav span").addClass("scroll-white");
	} else {
		$("header nav h2").removeClass("scroll-white");
		$("header nav span").removeClass("scroll-white");
	}
});

	$(".project").hover3d({
		selector: ".project__card",
		sensitivity: 40,
	});

	function animateLabel(tag) {
		$(tag).each(function(){
			$(this).focus(function(){
				$(this).next().addClass("active");
			});
			$(this).blur(function(){
				if ($(this).val() == '') {
					$(this).next().removeClass("active");
				}
			});
		})
	}
	animateLabel(".contacto input[type='text']");
	animateLabel(".contacto textarea");


	function scrollToAnchor(goTo,clickT){
	    var aTag = $(goTo);
	    $(clickT).click(function(){
	    	$('html,body').animate({scrollTop: aTag.offset().top},'slow');
	    });
	}
	
	
	scrollToAnchor(".acercade","#nav2");
	scrollToAnchor(".cv","#nav4");
	scrollToAnchor(".proyectos","#nav3");
	scrollToAnchor(".contacto","#nav6");

	$(".contacto input[type='submit']").click(function(e){
		e.preventDefault();

		let nombre = $("input[name='nombre']").val();
		let email = $("input[name='email']").val();
		let telefono = $("input[name='telefono']").val();
		let mensaje = $(".contacto textarea").val();

		$.ajax({
			data: { "querystring__nombre": nombre, "querystring__email": email, "querystring__telefono": telefono, "querystring__mensaje": mensaje },
			type: "POST",
			dataType: "json",
			url: "https://hooks.zapier.com/hooks/catch/5061727/oy4i43m/",
		})
			.done(function (data, textStatus, jqXHR) {
				if (console && console.log) {
					console.log("La solicitud se ha completado correctamente.");
					$(".contacto section:first-child, .contacto form").fadeOut().promise().done(function(){
						$(".confirm").fadeIn();
					});
				}
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				if (console && console.log) {
					console.log("La solicitud a fallado: " + textStatus);
				}
			});
	});





});