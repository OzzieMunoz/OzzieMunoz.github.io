//Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

//Global variables
var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ3Choices();

//Functions
function isFormValid() {
    let isValid = true;
    if(document.querySelector("#q1").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
    }
    return isValid;
}
function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML  = "<img src='img/checkmark.png' alt='checkmark'>";
    score += 20;
}
function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML  = "<img src='img/xmark.png' alt='xmark'>";
}
function displayQ3Choices() {
    let q3ChoicesArray = ["Blue", "Blue, no yellow!", "A Møøse once bit my sister", "Hot pink"];
    q3ChoicesArray = _.shuffle(q3ChoicesArray);

    for (let i=0; i< q3ChoicesArray.length; i++){
        let optId = `q3_${i}`;
        document.querySelector("#q3Choices").innerHTML +=
            ` <input type="radio" name="q3" id="${optId}" value="${q3ChoicesArray[i]}"> <label for="${optId}"> ${q3ChoicesArray[i]}</label>`;
    }
}
function gradeQuiz() {
    console.log("Grading quiz..")
    document.querySelector("#validationFdbk").innerHTML = ""; 
    if (!isFormValid()) {
        return;
    }

    score = 0;

    let q1Response = document.querySelector("#q1").value;
    if (q1Response != "") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    let q2Response = document.querySelector("#q2").value;
    if (q2Response == "To seek the holy grail") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    let q3ResponseElem = document.querySelector('input[name="q3"]:checked');
    let q3Response = "";
    if (q3ResponseElem) {
        q3Response = q3ResponseElem.value;
    }
    if (q3Response == "Blue") {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    if (document.querySelector("#Assur").checked &&
        document.querySelector("#Harran").checked &&
        !document.querySelector('[id="I don\'t know that"]').checked &&
        document.querySelector("#Nineveh").checked) {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    let q5Response = document.querySelector("#q5").value;
    if (q5Response == "African or European?") {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
    if (score < 80) {
        document.querySelector("#totalScore").className = "text-danger";
        document.querySelector("#congratsMsg").innerHTML = "";
    } else {
        document.querySelector("#totalScore").className = "text-success";
        document.querySelector("#congratsMsg").innerHTML = "Congratulations!";
    }

    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);
}
