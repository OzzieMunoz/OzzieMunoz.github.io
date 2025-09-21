document.querySelector("#quizBtn").addEventListener("click",gradeQuiz);

let correctAns = false;

displayQ3Options();


function displayQ3Options() {

    let q3Options = ["font-color", "fontColor", "color", "textColor"];
    q3Options = _.shuffle(q3Options);

    for (let i of q3Options) {

        let inputElement = document.createElement("input");
        inputElement.type = "radio";
        inputElement.name = "q3";
        inputElement.value = i;
        console.log(inputElement);

        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        labelElement.prepend(inputElement);

        document.querySelector("#q3Options").append(labelElement);
        
    }


}

function gradeQuiz(){

    let userAnswer1 = document.querySelector("#q1").value;

    if(userAnswer1 == "42") {
        document.querySelector("#msgBox1").textContent = "Right!";
        
    }
    else{
        document.querySelector("#msgBox1").textContent = "Wrong!";
    }

    let userAnswer2 = document.querySelector("#q2Input").value;

    if(userAnswer2 == "Color"){
        document.querySelector("#msgBox2").textContent = "Right!";
    }
    else{
        document.querySelector("#msgBox2").textContent = "Wrong";
    }

    let userAnswer3 = document.querySelector("#q3").value;

    if(userAnswer3 == "color") {
        document.querySelector("#msgBox3").textContent = "Right!";
    }
    else{
        document.querySelector("#msgBox3").textContent = "Wrong!";
    }

    let userAnswer4 = document.querySelector("#q4").value;

    if(userAnswer4 == "color") {
        document.querySelector("#msgBox4").textContent = "Right!";
    }
    else{
        document.querySelector("#msgBox4").textContent = "Wrong!";
    }

//    // if(document.querySelector(""))

//     //alert(userAnswer1);

//     if (userAnswer5 == "color") {

//         alert("Right!")

//     } else {

//         alert("Wrong!")
//     }

}

function changeTextColor(userAnswer) {

    let color;

    if(correctAns) {
        color = "green"
    } else {
        color = "red"
    }

   // if(correctAns)



}