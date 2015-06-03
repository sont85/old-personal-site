//challenge 4
function superCounter(str) {
  words = str.split(" ");
  wordsCount = words.length;
  characterCount = str.length;
  spaceCount = 0
  for (var j = 0; j<str.length; j++) {
      if (/\s/.test(str[j])) {
        spaceCount +=1
      }
  }
  count = 0;
  for (var i = 0; i<words.length; i++) {
 	count += words[i].length;
  }
  
  averageWordLength = count / wordsCount;
  return {wordsCount : wordsCount, characterCount : characterCount, spaceCount : spaceCount, averageWordLength : averageWordLength}
}


//challenge 5
function swapCase(str) {
  var swapSentence = "";
  for (var i = 0; i<str.length; i++) {
    if (str[i] == str[i].toUpperCase()) {
      swapSentence += str[i].toLowerCase();
    } else {
      swapSentence += str[i].toUpperCase();
    }
  }
  return swapSentence
}

//challenge 9
function palindromicMap(str) {
  words = str.split(" ");
  map = [];
  for (var i=0; i<words.length; i++) {
    if (words[i] == words[i].split("").reverse().join("")) {
      map.push(true);
    } else {
      map.push(false);
    }
  }
  return map;
}

//challenge 10
function wordsReverser(str) {
  return str.split(/\b/).map(function (word) {
    if (/\w/.test(word)) {
      return word.split("").reverse().join("");
    } else {
        return word
    }
  }).join("");
}

//challenge 11
function arrayAnalyzer(num1,num2,num3,num4,num5,num6,num7) {
  numbersArray = [num1,num2,num3,num4,num5,num6,num7].sort(function(a,b){return a-b});
  oddCount = 0;
  negativeCount = 0;
  total = 0
  for (var i =0; i<numbersArray.length; i++) {
    //negative count
    if (numbersArray[i] < 0) {
      negativeCount += 1
      //odd count
      if ((numbersArray[i] * -1) % 2 == 1) {
        oddCount +=1;
      }
    } else if (numbersArray[i] % 2 == 1) {
      oddCount +=1
    }
    total += numbersArray[i]
  }
  //average
  average = (total / numbersArray.length).toFixed(2);
  
  //median
  half = Math.floor(numbersArray.length / 2)
  if (numbersArray.length % 2 == 1) {
    median = numbersArray[half]
  } else {
    median = (numbersArray[half - 1] + numbersArray[half]) / 2;
  }
  return { odds: oddCount, negatives: negativeCount, avg: average, median: median }
}


//challenge 12
function age(year, month, day) {
  var date = new Date();
  var yearDiff = year - date.getFullYear()
    var monthDiff = month - date.getMonth();
    var dayDiff = day - date.getDate();
    
    if (yearDiff != 0) {
    return yearDiff + " years, " + monthDiff + " months, " + dayDiff + " days";
    } else if (monthDiff != 0) {
        return monthDiff + " months, " + dayDiff + " days";
    } else {
        return dayDiff + " days";
    }
}


//challenge 14
function wordSelector(str) {
  var words = str.split(" ");
  var highest = 0;
  var answer = []
  words.forEach(function (word) {
    for ( var i = 0; i<word.length; i++) {
    var count = 0;
      for (var j=i; j<word.length; j++) {
        if (word[i] == word[j]) {
          count += 1;
        }
      }
      if (count > highest) {
        highest = count
        answer = [word];
      } else if (count == highest) {
        answer.push(word);
      }
    }
  });
  return answer
}

//challenge 15
function charCode(ascii) {
  var result = ""
  for (var i= 0;i<ascii.length; i++) {
      result += String.fromCharCode(ascii[i]);
  }
  return result;
 }
var ascii =[73, 32, 115, 112, 101, 97, 107, 32, 105, 110, 32, 110, 117, 109, 98, 101, 114, 115]

charCode(ascii);
