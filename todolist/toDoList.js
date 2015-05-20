function createToDoList(itemText) {
	var html = "<div class='form-group'><div class='input-group'><span class='input-group-addon'><input type='checkbox' class='toDoCheckBox'></input></span><input type='text' class='form-control toDoText' disabled></input><span class='input-group-btn'><button class='btn btn-warning toDoEditButton'>Edit</button></span><span class='input-group-btn'><button class='btn btn-danger toDoDeleteButton'>Delete</button></span></div></div>"
	$("#toDoSection").append(html);
	$(".toDoText").last().val(itemText);
}

function createCompletedList(itemText) {
	var html = '<div class="form-group"><div class="input-group"><span class="input-group-addon"><input type="checkbox" class="completedCheckBox" checked></input></span><input type="text" class="form-control completedText" style="text-decoration: line-through;" disabled></input><span class="input-group-btn"><button class="btn btn-warning completedEditButton">Edit</button></span><span class="input-group-btn"><button class="btn btn-danger completedDeleteButton">Delete</button></span></div></div>';
	$("#completedSection").append(html);
	$(".completedText").last().val(itemText);

}

$(document).ready(function() {
	$("#addButton").on("click", function () {
		var itemText = $("#addText").val();
		$("#addText").val("")
		createToDoList(itemText);
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
		console.log(itemText)
		createCompletedList(itemText);
	})

	$("#toDoSection").on("click", ".toDoEditButton", function () {
		var $toDoTextInput = $(this).closest(".input-group").find(".toDoText");
		($toDoTextInput.is(":disabled"))? $toDoTextInput.prop("disabled", false) : $toDoTextInput.prop("disabled", true);
	});

	$("#toDoSection").on("click", ".toDoDeleteButton", function () {
		$(this).closest(".form-group").detach();
	})

	$("#completedSection").on("click", ".completedDeleteButton", function () {
		$(this).closest(".form-group").detach();
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
