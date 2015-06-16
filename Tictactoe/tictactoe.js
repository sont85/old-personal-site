var turnCount = 0;
var activePlayer = "X"
var win = false;


function switchPlayer() {
	activePlayer = (activePlayer === "X")? "O" : "X";
	$("#player1").toggleClass("activePlayer");
	$("#player2").toggleClass("activePlayer")
}

function printXO(button) {
	button.html(activePlayer);
}

function displayWin() {
	win = true;
	$("#winnerText").html("Winner:  Player " + activePlayer)
	$(".ticTacButton").addClass("disabled")
}

function displayTie(tie) {
	if (tie && !win) {
		$("#winnerText").html("Draw Game")
	}
}

function rowCheck() {
	if ($("#box1").html() === activePlayer && $("#box2").html() === activePlayer && $("#box3").html() === activePlayer) {
		displayWin();
	} else if ($("#box4").html() === activePlayer && $("#box5").html() === activePlayer && $("#box6").html() === activePlayer) {
		displayWin();
	} else if ($("#box7").html() === activePlayer && $("#box8").html() === activePlayer && $("#box9").html() === activePlayer) {
		displayWin();
	}
}

function columnCheck() {
	if ($("#box1").html() === activePlayer && $("#box4").html() === activePlayer && $("#box7").html() === activePlayer) {
		displayWin();
	} else if ($("#box2").html() === activePlayer && $("#box5").html() === activePlayer && $("#box8").html() === activePlayer) {
		displayWin();
	} else if ($("#box3").html() === activePlayer && $("#box6").html() === activePlayer && $("#box9").html() === activePlayer) {
		displayWin()
	}
}

function diagonalCheck() {
	if ($("#box1").html() === activePlayer && $("#box5").html() === activePlayer && $("#box9").html() === activePlayer) {
		displayWin();
	} else if ($("#box3").html() === activePlayer && $("#box5").html() === activePlayer && $("#box7").html() === activePlayer) {
		displayWin();
	} 
}

function tieCheck() {
	if (turnCount === 9) {
		var tie = true
		displayTie(tie)
	}
}

function winCheck() {
	rowCheck();
	columnCheck();
	diagonalCheck();
	tieCheck();
}

function reset() {
	activePlayer = "X"
	turnCount = 0;
	$(".ticTacButton").html("");
	$(".ticTacButton").removeClass("disabled");
	$("#winnerText").html("")
	win = false
}

function clickAudio() {
	var clickAudio = document.getElementById("clickAudio");
	clickAudio.currentTime=0;
	clickAudio.play();
}


$(document).ready(function () {
	$(".animsition").animsition();

	$(".ticTacButton").on("click", function () {
		printXO($(this));
		clickAudio();

		$(this).addClass("disabled");
		turnCount += 1;

		if (turnCount >= 5) {
			winCheck();
		}
		switchPlayer();

	});

	$("#playButton").on("click",function (){
		reset();
	})

})








