$(document).ready(function() {
	var $$ = {
		numberOfTowers: 3,
		largestNumber: null,
		layerNumber: null,
		container1: $("#container1"),
		container2: $("#container2"),
		container3: $("#container3"),
		createLayer: function(i) {
								return $("<div>", { text: i , class: 'towers', id:'tower'+i,style: "background-color: rgb("+parseInt(i*10)+","+parseInt(i*30)+","+parseInt(i*30)+")", width: i*6.65 + "%"});
							},
		resetGame: function() {
								$$.numberOfTowers = null;
								$$.layerNumber = null;
								$("#winText").text("");
							},
		buildTower: function() {
									var i = 1;
									var arrayTower = [];
									while (i <= $$.numberOfTowers) {
										var tower = $$.createLayer(i);
										arrayTower.push(tower);
										i++;
									}
									$(".towers").remove()
									$$.container1.append(arrayTower);
								},
			removeLayer: function(towerContainer) {
									var firstChild = towerContainer.find(':first-child').detach();
									$$.layerNumber = firstChild.text();
								},
			addLayer: function(towerContainer) {
									var tower = $$.createLayer($$.layerNumber);
									towerContainer.prepend(tower);
									$$.layerNumber = null;
								},
			winCheck: function() {
									if ($$.container3.children().length === $$.numberOfTowers) {
										$("#winText").text("Congratulation you solved a game "+$$.numberOfTowers+ "towers!!")
								}
			}
	};
	$("#towerInput").change(function() {
		$$.resetGame();
		$$.numberOfTowers = $(this).val();
		$$.buildTower();
	});
	$$.container1.click(function() {
		$$.largestNumber = $$.container1.find(":first-child").text() || Number.MAX_VALUE;
		if (!$$.layerNumber) {
			$$.removeLayer($(this));
		} else if ($$.layerNumber < $$.largestNumber) {
			$$.addLayer($(this));
		}
	});
	$$.container2.click(function() {
		$$.largestNumber = $$.container2.find(":first-child").text() || Number.MAX_VALUE;
		if (!$$.layerNumber) {
			$$.removeLayer($(this));
		} else if ($$.layerNumber < $$.largestNumber) {
			$$.addLayer($(this));
		}
	});
	$$.container3.click(function() {
		$$.largestNumber = $$.container3.find(":first-child").text() || Number.MAX_VALUE;
		if (!$$.layerNumber) {
			$$.removeLayer($(this));
		} else if ($$.layerNumber < $$.largestNumber) {
			$$.addLayer($(this));
			$$.winCheck();
		}
	});
});
