function assertEqual(result, answer) {
   console.log(result === answer? true: false)
}

function BracketMatcher(str) {
  var leftBracket = str.match(/[(]/g)
  var rightBracket = str.match(/[)]/g)
  if (!leftBracket && !rightBracket) {
    return 1
  } else if (!leftBracket || !rightBracket) {
    return 0
  } else {
	return leftBracket.length === rightBracket.length? 1: 0;
  }
}

assertEqual(BracketMatcher("(coder)(byte))"))
