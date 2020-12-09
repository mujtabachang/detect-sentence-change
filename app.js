var refSentenceValue;
var mySentenceValue;
var output;
var algoReturn
$(document).ready(function () {
    main()
});

function main() {
    console.log("Initializtion")
}

function buttonClick() {

    // Get element values
    refSentenceElement = $("#refSentence").val()
    mySentenceValue = $("#mySentence").val()
    output = $("#output")

    // Get results from the algorithm
    algoReturn = sentenceChangeAlgo(refSentenceElement, mySentenceValue)

    // Split the string
    var mySentenceValueSplitted = mySentenceValue.split(" ")

    // Output HTML
    var myOutputHTML = "Empty";

    // Array of Words
    var myWords = []

    myOutputHTML = ""

    // Add HTML support for new, shifted and normal words
    for (let i = 0; i < mySentenceValueSplitted.length; i++) {
        // Init Word object with empty properties
        var myWord = new Object()
        myWord.value = ""
        myWord.html = ""
        myWord.newWord = false
        myWord.delWord = false
        myWord.shifted = false

        var currentWord = mySentenceValueSplitted[i]
        myWord.value = currentWord
        if (algoReturn.newWords.includes(currentWord)) {
            myWord.html = "<span class='new'>" + currentWord + "</span>"
            myWord.newWord = true
        }

        else if (algoReturn.shiftedWords.includes(currentWord)) {
            myWord.html = "<span class='shifted'>" + currentWord + "</span>"
            myWord.shifted = true
        }
        else {
            myWord.html = "<span class='normal'>" + currentWord + "</span>"
        }
        myWords.push(myWord)
    }

    // Add deleted words in the final string
    // Loop through the deleted words
    for (let i = 0; i < algoReturn.delWordsIndices.length; i++) {
        var myWord = new Object()
        myWord.value = algoReturn.delWords[i]
        myWord.html = "<span class='del'>" + algoReturn.delWords[i] + "</span>"
        myWord.delWord = true
        myWords.splice(algoReturn.delWordsIndices[i], 0, myWord)

    }

    myWords.map((item) => {
        myOutputHTML += item.html + " "
    })
    output.html(myOutputHTML)

}

function sentenceChangeAlgo(string1, string2) {
    // Tokenization based on space only
    var string1Splitted = string1.split(" ")
    var string2Splitted = string2.split(" ")

    // Variables to save settings
    var newWords = []
    var newWordsIndices = []

    var delWords = []
    var delWordsIndices = []

    var shiftedWords = []
    var shiftedWordsIndices = []

    // Check for new words
    // Loop through the first string
    for (let i = 0; i < string2Splitted.length; i++) {
        var currentWord = string2Splitted[i]
        var isFound = false
        // Loop through the second string
        for (let j = 0; j < string1Splitted.length; j++) {
            // Word found
            if (currentWord == string1Splitted[j]) {
                isFound = true
                break
            }
        }
        // Word not found
        if (isFound == false) newWords.push(currentWord)
    }

    // Check for deleted words 
    // Loop through the first string
    for (let i = 0; i < string1Splitted.length; i++) {
        var currentWord = string1Splitted[i]
        var isFound = false
        // Loop through the second string
        for (let j = 0; j < string2Splitted.length; j++) {
            // Word found
            if (currentWord == string2Splitted[j]) {
                isFound = true
                break
            }
        }
        // Word not found
        if (isFound == false) delWords.push(currentWord)
    }


    // Check for shifted words
    // Loop through the first string
    for (let i = 0; i < string1Splitted.length; i++) {
        var currentWord = string1Splitted[i]


        // Loop through the second string
        for (let j = 0; j < string2Splitted.length; j++) {
            // Word found
            if (currentWord == string2Splitted[j]) {
                if (i != j) {
                    shiftedWords.push(currentWord)
                    shiftedWordsIndices.push(j)
                }
                break
            }
        }

    }

    // Detect new words indices
    for (let i = 0; i < newWords.length; i++) {
        // Loop through the second string
        for (let j = 0; j < string2Splitted.length; j++) {
            // Word found
            if (newWords[i] == string2Splitted[j]) {
                newWordsIndices.push(j)
                break
            }
        }
    }

    // Detect deleted words indices 
    for (let i = 0; i < delWords.length; i++) {
        // Loop through the second string
        for (let j = 0; j < string1Splitted.length; j++) {
            // Word found
            if (delWords[i] == string1Splitted[j]) {
                delWordsIndices.push(j)
                break
            }
        }
    }

    // console.log("new words:", newWords)
    // console.log("new words indices:", newWordsIndices)
    // console.log("deleted words:", delWords)
    // console.log("deleted words indices:", delWordsIndices)
    // console.log("shifted words:", shiftedWords)
    // console.log("shifted words indices", shiftedWordsIndices)

    var algoReturn = new Object()
    algoReturn.newWords = newWords
    algoReturn.delWords = delWords
    algoReturn.shiftedWords = shiftedWords
    algoReturn.shiftedWordsIndices = shiftedWordsIndices
    algoReturn.newWordsIndices = newWordsIndices
    algoReturn.delWordsIndices = delWordsIndices
    return algoReturn
}
