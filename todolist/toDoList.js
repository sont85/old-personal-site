$(document).ready(function() {
  'use strict';
  var toDoListArray = [];
  var completedListArray = [];

  function populateLocalStorage() {
    if (localStorage.getItem('toDoList')) {
      var currentToDoList = localStorage.getItem('toDoList').split(',');
      currentToDoList.forEach(function(item) {
        createToDoList(item);
      });
    }
    if (localStorage.getItem('completedList')) {
      var currentCompletedList = localStorage.getItem('completedList').split(',');
      currentCompletedList.forEach(function(item) {
        createCompletedList(item);
      });
    }
  }

  populateLocalStorage();

  function createToDoList(itemText) {
    var html = '<div class="form-group"><div class="input-group"><span class="input-group-addon"><input type="checkbox" class="toDoCheckBox"></input></span><input type="text" class="form-control toDoText" disabled></input><span class="input-group-btn"><button class="btn btn-warning toDoEditButton">Edit</button></span><span class="input-group-btn"><button class="btn btn-danger toDoDeleteButton">Delete</button></span></div></div>';
    $('#toDoSection').append(html);
    $('.toDoText').last().val(itemText);
    toDoListArray.push(itemText);
    localStorage.setItem('toDoList', toDoListArray);
  }

  function createCompletedList(itemText) {
    var html = '<div class="form-group"><div class="input-group"><span class="input-group-addon"><input type="checkbox" class="completedCheckBox" checked></input></span><input type="text" class="form-control completedText" style="text-decoration: line-through;" disabled></input><span class="input-group-btn"><button class="btn btn-warning completedEditButton">Edit</button></span><span class="input-group-btn"><button class="btn btn-danger completedDeleteButton">Delete</button></span></div></div>';
    $('#completedSection').append(html);
    $('.completedText').last().val(itemText);
		editLocalStorage(itemText, null, 'toDoList');
    completedListArray.push(itemText);
    localStorage.setItem('completedList', completedListArray);
  }

	function editLocalStorage(currentText, newText, list) {
		var currentList = localStorage.getItem(list).split(',');
		var removeToDoIndex = currentList.indexOf(currentText);
		if (newText) {
			currentList.splice(removeToDoIndex, 1, newText);
		} else {
			currentList.splice(removeToDoIndex, 1);
		}
		localStorage.setItem(list, currentList);
	}

  var voice = new webkitSpeechRecognition();
  voice.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    console.log(transcript);
    createToDoList(transcript);
  };
  voice.start();

  $('#addButton').on('click', function() {
    var itemText = $('#addText').val();
    if (itemText) {
      $('#addText').val('');
      createToDoList(itemText);
    }
  });

  $('#addText').on('keydown', function(event) {
    if (event.which === 13) { //press enter keycode
      var itemText = $('#addText').val();
      $('#addText').val('');
      createToDoList(itemText);
    }
  });

  $('#toDoSection').on('change', '.toDoCheckBox', function() {
    var itemText = ($(this).closest('.input-group').find('.toDoText').val());
    $(this).closest('.input-group').detach();
    createCompletedList(itemText);
		editLocalStorage(itemText, null, 'toDoList');
  });

	var currentToDoText = '';
  $('#toDoSection').on('click', '.toDoEditButton', function() {
    var $toDoTextInput = $(this).closest('.input-group').find('.toDoText');
    if ($toDoTextInput.is(':disabled')) {
			currentToDoText = $toDoTextInput.val();
      $toDoTextInput.prop('disabled', false);
    } else {
      $toDoTextInput.prop('disabled', true);
			editLocalStorage(currentToDoText, $toDoTextInput.val(), 'toDoList');
    }
  });

  $('#toDoSection').on('click', '.toDoDeleteButton', function() {
    var removeToDoText = $(this).closest('.form-group').find('.toDoText').val();
    $(this).closest('.form-group').detach();
		editLocalStorage(removeToDoText, null, 'toDoList');
  });

  $('#completedSection').on('click', '.completedDeleteButton', function() {
    var removeCompletedText = $(this).closest('.form-group').detach();
		var deletedText = removeCompletedText.find('.completedText').val();
		editLocalStorage(deletedText, null, 'completedList')
  });

  $('#completedSection').on('change', '.completedCheckBox', function() {
    var $formGroup = $(this).closest('.form-group');
    var itemText = $formGroup.find('.completedText').val();
    $formGroup.detach();
    createToDoList(itemText);
  });

	var currentCompletedText = '';
  $('#completedSection').on('click', '.completedEditButton', function() {
    var $itemText = $(this).closest('.form-group').find('.completedText');
    if ($itemText.is(':disabled')) {
			currentCompletedText = $itemText.val();
			$itemText.prop('disabled', false);
		} else {
			$itemText.prop('disabled', true);
			editLocalStorage(currentCompletedText, $itemText.val(), 'completedList');
		}
    $itemText.css('text-decoration', 'none');
  });
});
