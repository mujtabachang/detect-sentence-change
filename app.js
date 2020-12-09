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

    // ****************** WORD IN PROGRESS ************************

    // Split the string
    var mySentenceValueSplitted = mySentenceValue.split(" ")

    // Output HTML
    var myOutputHTML = "Empty";

    // Init Word object with empty properties
    var myWord = new Object()
    myWord.value = ""
    myWord.index = -1
    myWord.newWord = false
    myWord.delWord = false
    myWord.shifted = false

    // Array of Words
    var myWords = []

    // ****************** WORD IN PROGRESS ************************
    myOutputHTML = "WIP: Check console log now!"

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

    console.log("new words:", newWords)
    console.log("new words indices:", newWordsIndices)
    console.log("deleted words:", delWords)
    console.log("deleted words indices:", delWordsIndices)
    console.log("shifted words:", shiftedWords)
    console.log("shifted words indices", shiftedWordsIndices)

    var algoReturn = new Object()
    algoReturn.newWords = newWords
    algoReturn.delWords = delWords
    algoReturn.shiftedWords = shiftedWords
    algoReturn.shiftedWordsIndices = shiftedWordsIndices
    algoReturn.newWordsIndices = newWordsIndices
    algoReturn.delWordsIndices = delWordsIndices
    return algoReturn
}
