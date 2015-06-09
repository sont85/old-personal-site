function assertEqual(result, answer) {
   console.log(result === answer? true: false)
}



function BracketMatcher(str) {
  var leftBracket = str.match(/[(]/g)
  var rightBracket = str.match(/[)]/g)
  console.log(leftBracket,rightBracket)
}

assertEqual(BracketMatcher("(coder)(byte))"))
