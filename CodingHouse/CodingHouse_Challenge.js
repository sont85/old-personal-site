function superCounter(str) {
  words = str.split(" ");
  wordsCount = words.length;
  characterCount = str.length;
  spaceCount = wordsCount - 1
  totalWordsLength = 0;
  for (var i = 0; i<words.length; i++) {
 	totalWordsLength += words[i].length;
  }
  
  averageWordLength = totalWordsLength / wordsCount;
  return {wordsCount : wordsCount, characterCount : characterCount, spaceCount : spaceCount, averageWordLength : averageWordLength}
}

function swapCase(str) {
  var swapSentence = "";
  for (var i = 0; i<str.length; i++) {
     swapSentence += (str[i] === str[i].toUpperCase())?  str[i].toLowerCase(): str[i].toUpperCase();
  return swapSentence
}

function palindromicMap(str) {
  words = str.split(" ");
  map = [];
  for (var i=0; i<words.length; i++) {
    if (words[i] === words[i].split("").reverse().join("")) {
      map.push(true);
    } else {
      map.push(false);
    }
  }
  return map;
}

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



function wordsReverser(str) {
  return str.split(/\b/).map(function (word) {
    if (/\w/.test(word)) {
      return word.split("").reverse().join("");
    } else {
        return word
    }
  }).join("");
}

function age(year, month, day) {
  var date = new Date();
  var yearDiff = year - date.getFullYear()
    var monthDiff = month - date.getMonth();
    var dayDiff = day - date.getDate();
    
    if (yearDiff != 0 && monthDiff != 0) {
      return Math.abs(yearDiff) + " years, " + Math.abs(monthDiff) + " months, " + dayDiff + " days";
    } else if (monthDiff != 0) {
      return Math.abs(dayDiff) + " days";
    } 
}
age(2017, 11, 17)


function charCode(ascii) {
  return ascii.map(function(e){ return String.fromCharCode(e);}).join();
}




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
