// Code goes here

function BracketMatcher(str) {
    var leftBracket = str.match(/[(]/g)
    var rightBracket = str.match(/[)]/g)
    if (!leftBracket && !rightBracket) {
        return 1
    } else if (!leftBracket || !rightBracket) {
        return 0
    } else {
        return leftBracket.length === rightBracket.length ? 1 : 0;
    }
}
BracketMatcher(readline());


function TripleDouble(num1, num2) {

    var answer = num1.toString().split("").some(function(item, index, array) {
        var isTriple = item === array[index + 1] && item === array[index + 2]

        if (isTriple) {
            num2 = num2.toString().split("")
            for (var i = 0; i < num2.length; i++) {
                var firstNumber = num2.indexOf(array[index])
                var isDouble = num2[firstNumber + 1] === item && num2[firstNumber] === item
                if (isDouble) {
                    return true
                }
            }
        }
    });
    return answer ? 1 : 0;
}
TripleDouble(readline());
