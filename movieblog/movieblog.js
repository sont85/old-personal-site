$(document).ready(function () {

	var ref = new Firebase("https://movieblog.firebaseio.com/");
	var movieRef = ref.child("Movie Posting");
	var commentRef = ref.child("Comments");
	var logInUser = ref.child("Log in User");
	var moviePostTemplate = $(".movie-post-template:first");
	var selectionInput = $("#movieSelection");

	movieRef.on("child_added", function(snap) {
		snap = snap.val()

		var template = moviePostTemplate.clone();
		template.addClass(snap.movie)
		template.find(".movie-title").text(snap.movie);
		template.find(".movie-year").text("("+snap.year+")");
		template.find(".posted-date").text(new Date(snap.datePosted).toLocaleString())
		template.find(".movie-picture").attr("src", snap.pictureUrl);
		template.find(".movie-review").text(snap.review);

		$("#moviePost").append(template)
		var movieOption = $("<option>").text(snap.movie)
		selectionInput.append(movieOption);


	});
	
	commentRef.on("child_added", function(snap) {
		snap = snap.val()
		var commentSection = $("."+snap.movie).find(".comment-section-template")
		console.log(commentSection)
		var commenterName = $("<span>").addClass("commenter-name").text(snap.name)
		var commentPostDate = $("<span>").addClass(".posted-date").text(new Date(snap.datePosted).toLocaleString())
		var comments = $("<p>").addClass("comments").text(snap.comments)
		var eachCommentDiv = $("<div>")
		eachCommentDiv.append(commenterName).append(commentPostDate).append(comments)
		commentSection.append(eachCommentDiv)

	})

	ref.onAuth(function(authData) {
	  if (authData) {
	  	$("#logIn").hide()
	  	$("#logOut").show()
	  	console.log(authData)
		  $("#signInName").text("Welcome " + authData.google.displayName)
		  
		logInUser.push(authData.uid).set({
				name: authData.google.displayName,
				"Login date": Firebase.ServerValue.TIMESTAMP
			})
		}

		$("#movieSubmitButton").click(function () {
			var movieName = $("#movieNameInput").val()
			var review = $("#summaryInput").val()
			var movieYear = $("#movieYearInput").val()
			var pictureUrl = $("#pictureUrl").val()
			$("#movieNameInput").val("")
			$("#movieYearInput").val("")
			$("#summaryInput").val("")
			$("#pictureUrl").val("")
			movieRef.push({
				movie: movieName,
				year: movieYear,
				review: review,
				datePosted: Firebase.ServerValue.TIMESTAMP,
				pictureUrl: pictureUrl
			});
		})

		$("#commentSubmitButton").click(function() {
			var comments = $("#movieComments").val();
			var name = authData.google.displayName;
			var movie = $("#movieSelection").val()
			commentRef.push({
				name: authData.google.displayName,
				movie: movie,
				comments: comments,
				datePosted: Firebase.ServerValue.TIMESTAMP
			});
		});

	});

	$("#logIn").click(function (event) {
		event.preventDefault();
		ref.authWithOAuthRedirect("google", function(error) {
		  if (error) {
		    console.log("Login Failed!", error);
		  }
		});
	});
	$("#logOut").click(function (event) {
		event.preventDefault()
		ref.unauth();
  	$("#logOut").hide()
  	$("#logIn").show()
  	$("#signInName").text("")
	})


})
