$(document).ready(function() {
	var firebaseRef = new Firebase('https://firechat3.firebaseio.com/Chatroom');
	var userID

firebaseRef.authWithCustomToken("AUTH_TOKEN", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});



	$("#annoymousButton").click(function(event) {
		event.preventDefault();
		firebaseRef.authAnonymously(function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
	  	}
	  }), function(error, authData) {
	    remember: "sessionOnly"
	  };
	});


	$("#createNewUserButton").click(function (event) {
		event.preventDefault();
		firebaseRef.createUser({
			email: $("#signUpEmail").val(),
			password: $("#signUpPassword").val()
		}, function(error, userData) {
			if (error) {
				console.log("Error creating user:", error);
			} else {
				console.log("Successful created user account with uid:", userData.uid);
			}
		});
		userID = $("#signUpEmail").val();
		$("#signUpPassword").val("");
		$("#signUpEmail").val("");
	});

	$("#logInButton").click(function(event) {
		event.preventDefault();
	  firebaseRef.authWithPassword({
	    email: $("#logInEmail").val(),
	    password: $("#logInPassword").val()
	  }, function(error, authData) {
	    if (error) {
	      console.log("Login Failed!", error);
	    } else {
	    	userID = authData.password.email
	      console.log("Authenticated successfully with payload:", authData);
	    }
	  }, function(error, authData) {
	    remember: "sessionOnly"
	  });
	  $("#logInEmail").val("");
		$("#logInPassword").val("");
	});

	$("#logOutButton").click(function () {
		firebaseRef.unauth()
	});
	
	var getTime = function() {
		var date = new Date()
		var hour = date.getHours();
		var minute = date.getMinutes();
		var timeStamp = "Posted: "+hour+":"+minute
		return timeStamp
	}

	var captureMessage = function() {
		var newMessage = $("#textInput").val();
		var userName = $("#userName").val();
		if (newMessage) {
			$("#textInput").val("");
			firebaseRef.push({
				user: userName || userID || "annoymous",
				message: newMessage,
				timeStamp: getTime()
			})
		}
	};

	firebaseRef.on("child_added", function(snapshot){
		var content = snapshot.val()
		console.log(content)
			cloneTemplate(content);
		}), function(errorObject) {
			console.log(errorObject.code)
	}

	var cloneTemplate = function(content) {
		if (content.user && content.message) {
			var $clone = $("#template").clone().removeClass("hidden")
			$clone.find(".user").text(content.user + ": ");
			$clone.find(".message").text(content.message);
			$clone.find(".timeStamp").text(content.timeStamp)
			$("#messageBox").prepend($clone)
		}
	};

	$(document).on("keyup", function(event){
		if (event.which === 13) {
			captureMessage();
		}
	});

	$("#submitButton").click(function(event) {
		event.preventDefault();
		captureMessage();
	});
});


