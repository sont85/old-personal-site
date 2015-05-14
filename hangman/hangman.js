
var words1 = ["RUBY", "NODE", "VARIABLE", "SCRIPT", "ANGULAR",
			 "JAVASCRIPT", "JQUERY", "BOOTSTRAP", "HAYMAKER", 
			 "PETRIFY", "SERENITY", "CLOUD", "EMAIL", "MULTIVERSE", "ALGORITHM"];

var words = [{"Programming":
				[{"RUBY": "RHint"},
				{"NODE": "NHint"},
				{"ANGULAR": "AHint"},
				{"JQUERY": "JHint"}]},

			{"NATION":
				[{"America" : "Very Rich"},
				{"Japan": "Rising Sun"},
				{"INDIA": "Sub-continent nation"}]}];


var startPos = [[150,150],[25,150],[25,25],[80,25],[80,45],[80,55],[80,65],[80,65],[80,100],[80,100]]
var drawToPos = [[25,150],[25,25],[80,25],[80,35],[10,0],[80,100],[45,80],[115,80],[55,135],[105,135]]

var word = ""
var amountCorrect = 0
var lives = 10
var hint = ""
var strokeCount = 0;
var lettersPicked = []
var lettersWrong = []


function randomPick() {
	var randomNumber = ( Math.floor(Math.random() * words.length) );
	var selectedCategory = words[randomNumber];
	var categoryName = Object.keys(selectedCategory);
	var categoryArray = selectedCategory[categoryName];
	var randomNumber2 = ( Math.floor(Math.random() * categoryArray.length));
	


	displayCategory(categoryName);



	console.log(categoryArray[randomNumber2]);



	return categoryArray[randomNumber2]

}

function buildHtml(length) {
	var $letterHtml = "<ul>";
	for (var i=0; i<length; i++) {
		$letterHtml += '<li class=\"letter\">_</li>'
	}
	$letterHtml += "</ul>";
	$("#wordDiv").html($letterHtml)
}

function displayCategory(category) {
	$("#category").html(category)
}

function displayData() {
	var livesMessage = "You Have "+lives+" lives left";
	$("#lives").html(livesMessage);
	$("#letterPickedDiv").html(lettersPicked.join(", "));
	$("#LetterWrongDiv").html(lettersWrong.join(", "))
}

function displayHint() {
	$("#hint").html(hint)
}



function compare(chosenLetter, word){
	console.log(chosenLetter, word)
	lettersPicked.push(chosenLetter);
	var letterIndex = []
	var correct = false;
	word = word.split("")
	for (var i=0; i<word.length;i++) {
		if (word[i] === chosenLetter) {
			letterIndex.push(i);
			correct = true;
		}
	}
	console.log(letterIndex)
	if (correct === false) {
		lives -=1
		lettersWrong.push(chosenLetter);
		myCanvas();
	}
	displayData();
	add(letterIndex, chosenLetter);
}

function myCanvas() {
	canvas = document.getElementById("canvas")
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	if (strokeCount !== 4 && strokeCount < 10) {
		ctx.moveTo(startPos[strokeCount][0],startPos[strokeCount][1]);
		ctx.lineTo(drawToPos[strokeCount][0],drawToPos[strokeCount][1]);
	} else if (strokeCount === 4) {
		ctx.arc(startPos[strokeCount][0],startPos[strokeCount][1],
			drawToPos[strokeCount][0],drawToPos[strokeCount][1], Math.PI*2,true)
	}
	ctx.stroke();
	strokeCount +=1;
}

function add(letterIndex, chosenLetter) {
	if (letterIndex !== null) {
		letterIndex.forEach(function(index) {
			index += 1
			amountCorrect +=1
			$(".letter:nth-of-type("+index+")").html(chosenLetter);
		});
	}
	winCheck();

}

function winCheck() {
	if (word.length === amountCorrect) {
		$("#winner").removeClass("hidden");
		console.log("win")
	} else {
		loseCheck();
	}
}

function loseCheck() {
	if (lives === 0) {
		$("#loser").removeClass("hidden");
		console.log("lose");
	}
}

function blink($letterButton) {
	if ($letterButton.hasClass("disabled")) {
			$("body").addClass("blink").delay(500).queue(function(){
				$(this).removeClass("blink").dequeue();
			});
		}

}

function startGame(){
	var randomResult = randomPick()
	word = Object.keys(randomResult).join("");
	buildHtml(word.length);
	hint = randomResult[word];
}



$(document).ready(function(){

	startGame();

	$("#playAgain").on("click", function(){
		startGame();
	});

	$("#hintButton").on("click", function(){
		displayHint()
	});


	$(".letterButton").on("click", function (){
		$(this).addClass("disabled");
		var letterClicked = $(this).html();
		compare(letterClicked, word);
	});

	window.addEventListener("keydown", function(event){
		var letterPressed = String.fromCharCode(event.keyCode);
		var $letterButton = $("button:contains('"+letterPressed+"')")
		blink($letterButton);
		$letterButton.addClass("disabled");
		compare(letterPressed, word);
	})


});
