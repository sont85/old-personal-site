$(document).ready(function (){


	//click button to change background and font color
	$(".light").click(function(event){
		$("body").css({"background-color": "#DED", "color": "#232"});
		$(this).hide(300);
		$(".dark").fadeIn(300);
	});

	$(".dark").click(function(event){
		$("body").css({"background-color": "#232", "color": "#DED"});
		$(this).hide(300);
		$(".light").fadeIn(300);
	});


	//click More link
	$(".clickMore").click(function(){
		var hiddenMessage = $(this).closest("div").find(".hiddenMessage");
		hiddenMessage.toggleClass("hidden");
	});


	//change font color of paragraph when hover
	$("p").mouseenter(function (){
		$(this).addClass("hover");
	});
	$("p").mouseleave(function () {
		$(this).removeClass("hover");
	});

	//animate heading
	$("h1").click(function () {
		$(this).animate({"font-size": "5em"}, "slow");
		$(this).animate({"font-size" : "2.5em"}, "slow");
	});

	//add content to page

	$(".addButton").click(function() {
		var $content = $(this).closest(".row").find(".content");
		var contentVal = $content.text();
		contentVal += " " + $(this).parent().find("input").val();
		$content.text(contentVal);
	})


	//click rainbow button to change div background-color randomly
	$(".rainbow").click(function (){
		$("div").each(function (index, div) {
				var r = Math.floor(Math.random() * 256);
				var g = Math.floor(Math.random() * 256);
				var b = Math.floor(Math.random() * 256);
				var rgb = "rgb("+r+","+g+","+b+")";
				$(this).css("background", rgb);
		});
	});







});