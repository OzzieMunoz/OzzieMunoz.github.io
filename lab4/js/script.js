// Event Listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("change", checkPassword);
document.querySelector("#password").addEventListener("click", suggestPassword);
document.querySelector("#password").addEventListener("change", checkPasswordRetype);
document.querySelector("#passwordRetype").addEventListener("change", checkPasswordRetype);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
});

let userValid = false;
let pwValid = false;
let pwRtpValid = false;

displayStates();

// Functions
async function displayCity() {
    // alert(document.querySelector("#zip").value)

    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    if (!data) {
        document.querySelector("#city").textContent = "";
        document.querySelector("#latitude").textContent = "";
        document.querySelector("#longitude").textContent = "";
        document.querySelector("#zipError").textContent = " Zip code not found";
        document.querySelector("#zipError").style.color = "red";
        return;
    }

    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").textContent = data.latitude + "°, ";
    document.querySelector("#longitude").textContent = data.longitude + "°";
    document.querySelector("#zipError").textContent = "";
}
async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = `<option>County</option>`;

    for (let i=0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`
    }
}
async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    for (let i of data) {
        let optionElement = document.createElement("option");
        optionElement.textContent = i.state;
        optionElement.value = i.usps;

        document.querySelector("#state").append(optionElement);
    }
}
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");

    if (username.length < 3) {
        usernameError.innerHTML = `<br>Username must be at least 3 characters`;
        usernameError.style.color = "red";
        userValid = false;
    } 
    else {
        if (data.available) {
            usernameError.innerHTML = "  ✅";
            userValid = true;
        } else {
            usernameError.innerHTML = " ❌";
            userValid = false;
        }
    }
}
async function suggestPassword(){
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    let response = await fetch(url);
    let data = await response.json();
    
    document.querySelector("#suggestedPwd").textContent = " " + data.password;
}
function checkPassword() {
    let password = document.querySelector("#password").value;
    let passwordError = document.querySelector("#passwordError");

    if (password.length >= 6) {
        passwordError.textContent = " ✅";
        pwValid = true;
    } 
    else {
        passwordError.textContent = " ❌";
        passwordError.innerHTML = `<br>Password must be at least 6 characters`;
        passwordError.style.color = "red";
        pwValid = false;
    }
}
function checkPasswordRetype() {
    let password = document.querySelector("#password").value;
    let passwordRetype = document.querySelector("#passwordRetype").value;
    let passwordError = document.querySelector("#passwordRetypeError");
    if (password !== passwordRetype) {
        passwordError.textContent = " ❌";
        pwRtpValid = false;
    } else {
        passwordError.textContent = " ✅";
        pwRtpValid = true;
    }
}
function validateForm(e) {
    if (!userValid || !pwValid || !pwRtpValid) {
        document.querySelector("#errMsg").textContent = "Invalid Username or Password";
        document.querySelector("#errMsg").style.color = "red";
        e.preventDefault();
    }
}
