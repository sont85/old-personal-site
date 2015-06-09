function assertEqual(result, answer) {
   console.log(result === answer? true: false)
}



function PermutationStep(num) { 
  num = num.toString().split("")
  console.log(num)
  var higherNumber = 0 
  for (var i = num.length -1; 1 >= 0; i--) {
    if (num[i] > higherNumber){
    	console.log(num[i])
      return true
    }
  }
}
console.log(PermutationStep(11121))
