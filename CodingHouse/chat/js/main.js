var ref = new Firebase("https://torrid-heat-146.firebaseio.com/son");

$("textarea").on("keyup", function(event) {
	if (event.which===13) {
		sendMessage(this.value)
		$(this).val("")
	}

})

var sendMessage =function (textValue) {
	if (textValue) {
		ref.push({
			author: "Son",
			message: textValue,
			messageDate: Firebase.ServerValue.TIMESTAMP
		});
	}
}

ref.on("child_added", function(snapshot) {
	console.log(snapshot.val());
	var newMessage = snapshot.val()
	if (newMessage.author && newMessage.message && newMessage.message.trim().length > 0) {
		var messageDiv = $("<div id='message'>")
			.append($("<span>", { class: "author", text: newMessage.author + ":"}))
			.append($("<span>", { class: "time", text: moment(newMessage.messageDate).format("lll")}))
			.append($("<span>", { class: "body", html: marked(newMessage.message)}))

		$("#chat").prepend(messageDiv);
	}
}, function (errorObject) {
	console.log("The read failed" + errorObject.code)
});
