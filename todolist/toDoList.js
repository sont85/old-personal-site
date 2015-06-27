$(document).ready(function() {
"use strict"
	var toDoListArray = []
	var completedListArray = []

	function populateLocalStorage() {
		if (localStorage.getItem("toDoList")) {
			var currentToDoList = localStorage.getItem("toDoList").split(",");
			currentToDoList.forEach(function (item, index, array) {
				createToDoList(item)
			});
		}

		if (localStorage.getItem("completedList")) {
			var currentCompletedList = localStorage.getItem("completedList").split(",");
			currentCompletedList.forEach(function (item, index, array) {
				createCompletedList(item)
			});
		}

	}

	populateLocalStorage()




	function createToDoList(itemText) {
		var html = "<div class='form-group'><div class='input-group'><span class='input-group-addon'><input type='checkbox' class='toDoCheckBox'></input></span><input type='text' class='form-control toDoText' disabled></input><span class='input-group-btn'><button class='btn btn-warning toDoEditButton'>Edit</button></span><span class='input-group-btn'><button class='btn btn-danger toDoDeleteButton'>Delete</button></span></div></div>"
		$("#toDoSection").append(html);
		$(".toDoText").last().val(itemText);
		toDoListArray.push(itemText);
		localStorage.setItem('toDoList', toDoListArray);

	}
	function createCompletedList(itemText) {
		var html = '<div class="form-group"><div class="input-group"><span class="input-group-addon"><input type="checkbox" class="completedCheckBox" checked></input></span><input type="text" class="form-control completedText" style="text-decoration: line-through;" disabled></input><span class="input-group-btn"><button class="btn btn-warning completedEditButton">Edit</button></span><span class="input-group-btn"><button class="btn btn-danger completedDeleteButton">Delete</button></span></div></div>';
		$("#completedSection").append(html);
		$(".completedText").last().val(itemText);

		var removeToDoIndex = localStorage.getItem("toDoList").indexOf(itemText)
		var currentToDoList = localStorage.getItem("toDoList").split(",")
		currentToDoList.splice(removeToDoIndex, 1)
		localStorage.setItem("toDoList", currentToDoList);

		console.log(localStorage.getItem("toDoList"))


		completedListArray.push(itemText);
		localStorage.setItem("completedList", completedListArray)

		console.log(localStorage.getItem("completedList"))

	}

	var voice = new webkitSpeechRecognition();
	voice.onresult = function(event) {
		var transcript = event.results[0][0].transcript
		console.log(transcript)
		createToDoList(transcript);
	};
	voice.start()

	$("#addButton").on("click", function () {
		var itemText = $("#addText").val();
		if (itemText) {
			$("#addText").val("")
			createToDoList(itemText);
		}



	});

	$("#addText").on("keydown", function (event) {
		if (event.which === 13) {                  //press enter keycode
			var itemText = $("#addText").val();
			$("#addText").val("")
			createToDoList(itemText);
		}
	})

	$("#toDoSection").on("change", ".toDoCheckBox", function () {
		var itemText = ($(this).closest(".input-group").find(".toDoText").val());
		$(this).closest(".input-group").detach();
		createCompletedList(itemText);
	})

	$("#toDoSection").on("click", ".toDoEditButton", function () {
		var $toDoTextInput = $(this).closest(".input-group").find(".toDoText");
		($toDoTextInput.is(":disabled"))? $toDoTextInput.prop("disabled", false) : $toDoTextInput.prop("disabled", true);
	});

	$("#toDoSection").on("click", ".toDoDeleteButton", function () {
		var removeToDoText = $(this).closest(".form-group").find(".toDoText").val();

		$(this).closest(".form-group").detach();
		console.log(removeToDoText)
		var removeToDoIndex = localStorage.getItem("toDoList").indexOf(removeToDoText)
		var currentToDoList = localStorage.getItem("toDoList").split(",");
		currentToDoList.splice(removeToDoIndex, 1)
		localStorage.setItem("toDoList", currentToDoList);
	})

	$("#completedSection").on("click", ".completedDeleteButton", function () {
		var removeCompletedText = $(this).closest(".form-group").detach();
		var removeCompletedIndex = localStorage.getItem("completedList").indexOf(removeCompletedText)

		var currentCompletedList = localStorage.getItem("completedList").split(",");
		currentCompletedList.splice(removeCompletedIndex, 1)
		localStorage.setItem("completedList", currentCompletedList);



	});	

	$("#completedSection").on("change", ".completedCheckBox", function () {
		var $formGroup =$(this).closest(".form-group");
		var itemText = $formGroup.find(".completedText").val();
		$formGroup.detach();
		createToDoList(itemText);
	});

	$("#completedSection").on("click", ".completedEditButton", function () {
		var $itemText = $(this).closest(".form-group").find(".completedText");
		($itemText.is(":disabled"))? $itemText.prop("disabled", false) : $itemText.prop("disabled", true);
		$itemText.css("text-decoration", "none")
	});


});
