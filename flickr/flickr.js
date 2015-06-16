
$(document).ready(function () {

	$("#searchButton").click(function() {

		var search = $("#searchText").val();
		var url = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"
		var redditData = {
			api_key: "bb78081b95cc8f50170267e6662228dd",
			secret: "6a80e453abac397e",
			format: "json",
			tags: search,
			per_page: 20
		};

		$.getJSON(url, redditData).done(function(data){
			var html = ""
			$.each(data.items, function (i, item) {

				if (i % 3 === 0 ) {
					html += "<div class='row'>"
				}
			 	html += "<div class='col-sm-4'>";
				html += "<img src='"+item.media.m+"' class='image img-responsive'></img>"
				html += "<b>Title: </b><footer class='title'>"+item.title+"</footer>"
				html += "<b>Author: </b><footer>"+item.author+"</footer>"
				html += "<b>Date Taken: </b><footer>"+item.date_taken+"</footer>"
				html += "<a href='"+item.link+"'>Picture Link</a></div>"

				if (i % 3 === 2 || i === 19) {
					html += "</div>"
				}
			});
			$("#photoGallery").html(html)		
		});
	});

	//picture lightbox
	$("#photoGallery").on("click", ".image", function() {
		var imageSrc = $(this).attr("src");
		var title = $(this).siblings(".title").text();

		$("#overlayImage").attr("src",imageSrc);
		$("#overlayTitle").text(title)
		$("#overlay").show()
	})

	$("#overlay").click(function () {
		$(this).hide();
	})

});



