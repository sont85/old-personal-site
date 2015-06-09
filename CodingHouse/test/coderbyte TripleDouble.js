function assertEqual(result, answer) {
  console.log(result === answer? true: false)
}

function TripleDouble(num1, num2) {
  var answer =  num1.toString().split("").some(function (item, index, array) {
    var isTriple = item === array[index + 1] && item === array[index + 2]

    console.log(isTriple)

});
  return answer? 1: 0;
  
}


assertEqual(TripleDouble(451999277, 41177722899), 1)
