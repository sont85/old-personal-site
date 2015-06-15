$(document).ready(function() {
	var firebaseRef = new Firebase('https://firechat3.firebaseio.com/Chatroom');
	var userID
	var validUser

firebaseRef.authWithCustomToken("AUTH_TOKEN", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});


	var hideButtons = function() {
		$(".sign-in").addClass("hidden");
		$("#logOutButton").removeClass("hidden");
	}


	$("#annoymousButton").click(function(event) {
		event.preventDefault();
		firebaseRef.authAnonymously(function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    validUser = true;
		    hideButtons();
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
				validUser = true
				hideButtons()

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
	    	validUser = true
				hideButtons()
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
		if (validUser) {
			$(".sign-in").removeClass("hidden");
			$("#logOutButton").addClass("hidden");
			validUser = false;
		}
	});
	
	var getTime = function() {
		var date = new Date()
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var timeStamp = hours + ':' + minutes + ' ' + ampm;
	  return timeStamp;
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
		if (content.message) {
			var $clone = $("#template").clone().removeClass("hidden")
			$clone.find(".user").text(content.user + ": ");
			$clone.find(".message").text(content.message);
			$clone.find(".timeStamp").text(content.timeStamp)
			$("#messageBox").prepend($clone)
		}
	};

	$("#textInput").on("keyup", function(event){
		if (event.which === 13) {
			if (!validUser) {
				alert("Please log in first with an email or annoymously")
			} else {
			captureMessage();
			}
		}
	});

	$("#submitButton").click(function(event) {
		if (!validUser) {
			alert("Please log in first with an email or annoymously")
		} else {
			event.preventDefault();
			captureMessage();
		}
	});
});


