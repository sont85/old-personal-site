$(document).ready(function () {
	var data = {
		names : ["jason", "jack", "joe", "jake", "john"],
		age: [21, 22, 43, 18, 19],
		location: ["Dallas", "New York", "San Francisco", "San Jose", "Boston"],
		position: ["programmer", "consultant", "doctor", "teacher", "accountant"]
	}

	var keyArray=[]

	var cloneHeadingTemplate = function() {
		var headingRow = $("<tr></tr>")
		for (key in data) {
			var heading = $("<th class='sort'></th>")
			heading.text(key)
			keyArray.push(key)
			headingRow.append(heading)
		}
		$("table").append(headingRow)
	}
	

	var cloneDataTemplate = function(currentItemIndex) {
		var dataRow = $("<tr class='data'></tr>");
		for (var i=0; i<keyArray.length; i++) {
			var dataBox = $("<td></td>");
			var currentItem = data[keyArray[i]];
			dataBox.text(currentItem[currentItemIndex]);
			dataRow.append(dataBox);
			debugger
		}
		$("table").append(dataRow);
	}

	var buildTable = function() {
		cloneHeadingTemplate()
		for (var j=0; j<5; j++) {
			cloneDataTemplate(j)
		}
	}
	buildTable()

	$("table").on("click", ".sort", function(event) {
		event.preventDefault();
		var currentHeading = $(this).text()
		console.log(currentHeading)
		$("table tbody").remove()
		data[currentHeading].sort()
		keyArray = []
		buildTable()
	});




})

