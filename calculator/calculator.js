$(document).ready(function() {
	var totalValue = 0
	var enterValue = ""
	var operatorCount = 0
	var addLast = false;
	var subtractLast = false;
	var multiplyLast = false;
	var divideLast = false;
	var numberLast= false;
	var equalLast = false;
	var clickAudio = document.getElementById("clickAudio");


	function reset() {
		addLast = false;
		subtractLast = false;
		multiplyLast = false;
		divideLast = false;
		numberLast = false;
		equalLast = false;
		enterValue = ""
	}

	function displayAnswer(value) {
		$("#answerDisplay").text(value)
	}

	function decimalCheck() { //display numbers with decimal if check is true
		if (totalValue % 1 !== 0) {
			displayAnswer(totalValue.toFixed(2));
		} else {
			displayAnswer(totalValue);
		}
	}


	function addClick() {
		enterValue = $("#answerDisplay").text();
		if ((enterValue && numberLast) || (enterValue && equalLast)) { //checking to make sure enterValue is not empty and number key was last key press instead of operator key
			addEvent(enterValue);
			operatorCount += 1
		} else {
			$("#answerDisplay").text("");
			enterValue = ""
		}
	}

	function addEvent(value) {
		if (operatorCount >= 1){    //total value equal enterValue on first operator
			totalValue = totalValue + parseFloat(value);
		} else if (operatorCount < 1){
			totalValue = parseFloat(value)
		}
		displayAnswer(totalValue);
		reset();
		addLast = true;  // set addLast as true so equal button would add with the last number
	}

	function subtractClick() {
		enterValue = $("#answerDisplay").text();
		if ((enterValue && numberLast) || (enterValue && equalLast)) {
			subtractEvent(enterValue);
			operatorCount += 1;
		} else {
			$("#answerDisplay").text("");
			enterValue = ""
		}
	}


	function subtractEvent(value) {
		if (operatorCount >=1){ 
			totalValue = totalValue - parseFloat(value);
		} else if (operatorCount < 1){
			totalValue = parseFloat(value)
		}
		displayAnswer(totalValue);
		reset();
		subtractLast = true;
	}


	function multiplyClick() {
		enterValue = $("#answerDisplay").text();
		if ((enterValue && numberLast) || (enterValue && equalLast)) {
			multiplyEvent(enterValue);
			operatorCount += 1
		} else {
			$("#answerDisplay").text("");
			enterValue = ""
		}
	}


	function multiplyEvent(value) {
		if (operatorCount >=1){
			totalValue = totalValue * parseFloat(value);
		} else if (operatorCount < 1){
			totalValue = parseFloat(value)
		}
		decimalCheck();  // check for decimal and display
		reset();
		multiplyLast = true;
	}

	function divideClick() {
		enterValue = $("#answerDisplay").text();
		if ((enterValue && numberLast) || (enterValue && equalLast)) {
			divideEvent(enterValue);
			operatorCount += 1
		} else {
			$("#answerDisplay").text("");
			enterValue = ""
		}
	}

	function divideEvent(value) {
		if (operatorCount >=1){
			totalValue = totalValue / parseFloat(value);
		} else if (operatorCount < 1){
			totalValue = parseFloat(value)
		}
		decimalCheck();  //check for decimal and display
		reset();
		divideLast = true;
	}

	function equalClick() {
		if (enterValue) { //making sure enterValue is not empty
			if (addLast) { //checking to see which operator button was press last.
				addEvent(enterValue);
			} else if (subtractLast) {
				subtractEvent(enterValue);
			} else if (multiplyLast) {
				multiplyEvent(enterValue);
			} else if (divideLast) {
				divideEvent(enterValue);
			} 
		}
		reset();
		equalLast = true;
		operatorCount = 0;
	}

	function deleteEvent(value) {
		enterValue = $("#answerDisplay").text();
		enterValue = enterValue.substring(0, enterValue.length - 1); //delete last character on string
		displayAnswer(enterValue);
	}


	function squareRootEvent(value) {
		enterValue = $("#answerDisplay").text();
		enterValue = Math.sqrt(parseFloat(enterValue));
		if (enterValue) {
			totalValue = enterValue.toFixed(2)
			displayAnswer(totalValue);
		}
		enterValue = ""
	}

	function plusMinusEvent() {
		enterValue = $("#answerDisplay").text();
		enterValue = parseFloat(enterValue) * -1
		displayAnswer(enterValue);
	}

	$(".btn").click(function() {
		clickAudio.currentTime = 0;
		clickAudio.play();
	});

	$(".numbers").click(function () { //entering numbers in as string
		enterValue += $(this).text();
		numberLast = true;
		displayAnswer(enterValue);
	});

	$("#decimalButton").click(function () {
		enterValue += "."
		displayAnswer(enterValue);
	});

	$("#plusMinusButton").click(function () {
		plusMinusEvent();
	});

	$("#deleteButton").click(function (){
		deleteEvent();
	});

	$("#squareRootButton").click(function () {
		squareRootEvent();
	})

	$("#clearButton").click(function () {
		totalValue = 0;
		operatorCount = 0;
		reset();
		$("#answerDisplay").text("0");
	});

	$("#addButton").click(function () {
		addClick();
	});

	$("#subtractButton").click(function() {
		subtractClick();
	});

	$("#multiplyButton").click(function() {
		multiplyClick();
	});

	$("#divideButton").click(function() {
		divideClick();
	});

	$("#equalButton").click(function() {
		equalClick();
	});

	//keyboard events
	window.addEventListener("keypress", function (event) { 
		console.log(event.which)
		clickAudio.currentTime = 0;
		clickAudio.play();

		var ascii = (event.which >=96 && event.which <= 105)? event.keyCode - 48 : event.keyCode //change numpad keycode to regular num keycode
		if ((event.which >=48 && event.which <= 57) || (event.which >=96 && event.which <= 105)) { //number keys
			enterValue += String.fromCharCode(ascii);
			numberLast = true;
			displayAnswer(enterValue);

		} else if (event.which === 46 || event.which === 110) { // decimal
			enterValue += "."
			displayAnswer(enterValue);

		} else if (event.which === 8) { //backspace
			deleteEvent();

		} else if (event.which === 189) { //negative symbol
			plusMinusEvent();

		} else if (event.which === 107 || event.which === 43) { //plus sign
			addClick()

		} else if (event.which === 109 || event.which === 45) { //subtract sign
			subtractClick();

		} else if (event.which === 106 || event.which === 42) { //multiply sign
			multiplyClick();

		} else if (event.which === 111 || event.which === 47) { //divide sign
			divideClick();

		} else if (event.which === 13 || event.which === 61) { //enter key
			event.preventDefault();
			equalClick();
		}

	}); //end of keyboard event

});
