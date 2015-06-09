function assertEqual(result, answer) {
  console.log(result === answer? true: false)
}

function TripleDouble(num1, num2) {
  var answer =  num1.toString().split("").some(function (item, index, array) {
    var isTriple = item === array[index + 1] && item === array[index + 2]

    console.log(isTriple)
    if (isTriple) {
      num2 = num2.toString().split("")
    for (var i =0; i<num2.length; i++) {
      var firstNumber = num2.indexOf(array[index])
      var isDouble = num2[firstNumber + 1] === item && num2[firstNumber] ===item 
    	if (isDouble) {
	return true
	}
    }
  }
});
  return answer? 1: 0;
  
}


assertEqual(TripleDouble(451999277, 41177722899), 1)
