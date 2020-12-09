var refSentenceValue;
var mySentenceValue;
var output;
$(document).ready(function () {
    main()
});

function main() {
    console.log("Initializtion")

}

function buttonClick() {
    console.log("Button clicked!")

    // Get element values
    refSentenceElement = $("#refSentence").val()
    mySentenceValue = $("#mySentence").val()

    output = $("#output")

    output.html(refSentenceElement)

}

