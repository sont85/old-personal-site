//challenge 1
var argsSum = function () {
    var total = 0
  for (var i=0;i<arguments.length; i++) {
      total += arguments[i] 
  }
  console.log(total)
}
argsSum(1,3,4,5,6,6)

//challenge 2
var splitSum = function (str1, str2) {
    str1 = str1.match(/\d/g)
    if (str1) {
        str1 = str1.reduce(function (prev, current) {
       return parseInt(prev) + parseInt(current)
        });
    }
    str2 = str2.match(/\d/g)
    if (str2) {
        str2 = str2.reduce(function (prev, current) {
        return parseInt(prev) + parseInt(current)
        });
    }
    console.log(str1 + str2)
    
    
}

splitSum("3:4:5:1", ":")

//challenge 3
var createArray = function(num1, num2) {
    total = []
    for (i = num1; i <= num2; i++) {
        total.push(i)
    }
    console.log(total)
    
}

createArray(4,9)

//challenge 4
var isTodayAWeekend = function () {
    var date = new Date();
    var day = date.getUTCDay()
    return (day === 0 || day === 7)? true: false;
}

result = isTodayAWeekend();
console.log(result);



//challenge 5
var array = [];
var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
array = [4,28,6, 16, 26, 12]

result = array.map(function(e) { return key[e/2]; }).join('');
console.log(result); // CODING


