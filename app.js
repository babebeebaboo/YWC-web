function startAnimationText(div, text, next)
{
	var step = $(div).width() / text.length;

	$(div).offset({
		left: $(div).offset().left + $(div).width()
	});

	$(div).text("");

	$(div).css({
		visibility: 'visible'
	});

	var curAnimationLength = 0;
	var curStepSize = 0;

	var func = function() {
		$(div).append(text[curAnimationLength]);
		if (++curAnimationLength < text.length)
		{
			curStepSize += step;
			$(div).css({
				transform: 'translateX(-' + curStepSize + 'px)'
			});
		}
		else
			setTimeout(next, 0);
	}

	$(div).on('transitionend', function() {
		console.log('transitionend');
		func();
	});

	func();
}

function manageLayout() {
	var viewportWidth = $(window).outerWidth();
	var viewportHeight = $(window).outerHeight();

	$("#div_app")
		.height(viewportHeight)
		.width(viewportWidth);

	$('#div_webmaster').offset({
		top: (viewportHeight / 2.0) - ($('#div_webmaster').height() / 2.0),
		left: (viewportWidth / 2.0) - ($('#div_webmaster').width() / 2.0)
	});

	$('#div_young').offset({
		top: (viewportHeight / 2.0) - ($('#div_young').height() / 2.0) - 100,
		left: (viewportWidth / 2.0) - ($('#div_young').width() / 2.0)
	});

	$('#div_camp').offset({
		top: (viewportHeight / 2.0) - ($('#div_camp').height() / 2.0) + 100,
		left: (viewportWidth / 2.0) - ($('#div_camp').width() / 2.0)
	});
}

$(document).ready(function() {
	console.log("[ready] ready");

	window.app = {} || window.app;
	window.app.young_ani_flag = 0;

	$(window).on('resize', function() {
		manageLayout();
	});

	$("#div_app")
		.height($(window).innerHeight())
		.width($(window).innerWidth());

	manageLayout();

	startAnimationText($('#div_young'), "YOUNG", function() {
		startAnimationText($('#div_webmaster'), "WEBMASTER", function() {
			startAnimationText($('#div_camp'), "CAMP");
		});
	});
	/*manageLayout();*/
});
