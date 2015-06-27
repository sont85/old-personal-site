var playerHand = [];
var dealerHand = [];
var roundOver = false;

var playerPoint = 0;
var dealerPoint = 0;
var playerScore = 0;
var dealerScore = 0;
var drawScore = 0;
var deck = [];


function newDeck() {
	deck = [[2, "Heart"],[2, "Diamond"],[2, "Clover"],[2, "Spade"],
		[3, "Heart"],[3, "Diamond"],[3, "Clover"],[3, "Spade"],
		[4, "Heart"],[4, "Diamond"],[4, "Clover"],[4, "Spade"],
		[5, "Heart"],[5, "Diamond"],[5, "Clover"],[5, "Spade"],
		[6, "Heart"],[6, "Diamond"],[6, "Clover"],[6, "Spade"],
		[7, "Heart"],[7, "Diamond"],[7, "Clover"],[7, "Spade"],
		[8, "Heart"],[8, "Diamond"],[8, "Clover"],[8, "Spade"],
		[9, "Heart"],[9, "Diamond"],[9, "Clover"],[9, "Spade"],
		[10, "Heart"],[10, "Diamond"],[10, "Clover"],[10, "Spade"],
		["Jack", "Heart"],["Jack", "Diamond"],["Jack", "Clover"],["Jack", "Spade"],
		["Queen", "Heart"],["Queen", "Diamond"],["Queen", "Clover"],["Queen", "Spade"],
		["King", "Heart"],["King", "Diamond"],["King", "Clover"],["King", "Spade"],
		["Ace", "Heart"],["Ace", "Diamond"],["Ace", "Clover"],["Ace", "Spade"]];
}

function clearScore(){
	playerScore = 0;
	dealerScore = 0;
	drawScore = 0;
	$("#playerScore").text("0");
	$("#dealerScore").text("0");
	$("#drawScore").text("0");

}



function reset() {
	playerHand = [];
	dealerHand = [];
	playerPoint = 0;
	dealerPoint = 0;
	$("#playerHand").text("");
	$("#dealerHand").text("");
	$("#outcome").text("");
	$("#playerPoint").text("");
	$("#dealerPoint").text("");
	$("#blackjack").addClass("hidden");
	$("#bust").addClass("hidden");
}


function drawingCard(drawer) {
	var randomNumber = Math.floor(Math.random() * deck.length);

	//adding hidden to first dealer card
	var card;
	if (drawer === "dealer" && dealerHand.length < 1) {
		card = "<div class='card hidden'>"+deck[randomNumber][0]+" "+ deck[randomNumber][1]+"</div>";
	} else {
		card = "<div class='card'>"+deck[randomNumber][0]+" "+ deck[randomNumber][1]+"</div>";
	}

	//pushing card to player or dealer hand
	if (drawer === "player") {
		playerHand.push(deck[randomNumber]);
		$("#playerHand").append(card);
	} else if(drawer === "dealer") {
		dealerHand.push(deck[randomNumber]);
		$("#dealerHand").append(card);
	}
	deck.splice(randomNumber, 1);

	if (drawer === "player") {
		playerPoint = calculatePoints(playerHand);
		if (playerPoint > 21) {
			$("#bust").removeClass("hidden");
			$("#hitButton").addClass("disabled");
		}
	}
}


function calculatePoints(hand) {
	var points = 0;
	var aceCount = 0;
	for (var i = 0; i<hand.length; i++) {
		if (hand[i][0] === "Ace") {
			points += 10;
			aceCount +=1;
		} else if (hand[i][0] === "King" || hand[i][0] === "Queen" || hand[i][0] === "Jack") {
			points += 10;
		} else if (hand[i][0] > 1) {
			points += hand[i][0];
		}

	}
	while (aceCount > 0) {
		if (points <= 20) {
			points +=1;
			aceCount -=1;
		} else if (points >=22) {
			points -=9;
			aceCount -=1;
		} else {
			aceCount -=1;
		}
	}
	return points;
}

function blackJackCheck (hand) {
	if ((hand[0][0] === "Ace") && (hand[1][0] === "Ace" || hand[1][0] === "King" || hand[1][0] === "Queen" || hand[1][0] === "Jack" || hand[1][0] === 10)) {
		return true;
	} else if ((hand[1][0] === "Ace") && (hand[0][0] === "Ace" || hand[0][0] === "King" || hand[0][0] === "Queen" || hand[0][0] === "Jack" || hand[0][0] === 10)) {
		return true;
	} else {
		return false;
	}
}

function checkDealerHand() {
	dealerPoint = calculatePoints(dealerHand);
	while (dealerPoint < 17)  {
		drawingCard("dealer");
		dealerPoint = calculatePoints(dealerHand);
	}
}
function winCheck() {
	var dealerBust = (dealerPoint > 21)? true : false;
	var playerBust = (playerPoint > 21)? true : false;

	if ((dealerBust && playerBust) || (dealerPoint === playerPoint)) {
		winner("draw");
	} else if (dealerBust) {
		winner("player");
	} else if (playerBust) {
		winner("dealer");
	} else if (playerPoint > dealerPoint) {
		winner("player");
	} else {
		winner("dealer");
	}
	$("#playerPoint").text(playerPoint);
	$("#dealerPoint").text(dealerPoint);
}

function winner(theWinner) {
	if (theWinner === "player") { //update scoreboard
		playerScore +=1;
		$("#playerScore").text(playerScore);
		$("#outcome").text("Player Won");
	} else if (theWinner === "dealer") {
		dealerScore +=1;
		$("#dealerScore").text(dealerScore);
		$("#outcome").text("Player Lost");
	} else {
		drawScore +=1;
		$("#drawScore").text(drawScore);
		$("#outcome").text("Draw");
	}
}


function startGame() {
	reset();
	drawingCard("dealer");
	drawingCard("player");
	drawingCard("dealer");
	drawingCard("player");
	if (blackJackCheck(playerHand) === true) { //check if player won blackjack
		$("#hitButton").addClass("disabled");
		$("#blackjack").removeClass("hidden");
	}
}


$(document).ready(function() {
	"use strict";
	newDeck();
	startGame();
	$("#clearScoreButton").click(function (){
		clearScore();
		startGame();

	});

	$("#hitButton").click(function () {
		if (roundOver) { //hit button start new round if round is over
			roundOver = false;
			startGame();
		} else {
			drawingCard("player");
		}

	});

	$("#passButton").click(function () {
		$("#hitButton").removeClass("disabled");
		$(".card.hidden").removeClass("hidden");
		var playerBlackJack = blackJackCheck(playerHand);
		var dealerBlackJack = blackJackCheck(dealerHand);

		//check for dealer black jack
		if (roundOver === false) {
			if (playerBlackJack && dealerBlackJack) {
				winner("draw");
			} else if (playerBlackJack) {
				winner("player");
			} else if (dealerBlackJack) {
				winner("dealer");
			} else {
				checkDealerHand();
				winCheck();
			}
		}
		roundOver = true;
		
		//replenish deck under 11 cards
		if (deck.length < 11) {
			alert("deck replenished");
			newDeck();
		}
	});
});
