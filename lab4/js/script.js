// alert("it's working");

// Event Listener
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#userName").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("click", displayPassword);

displayStates();
displayCounty();
checkUsername();

let usps = "";


// Functions
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            // console.log(data); 
            document.querySelector("#city").textContent = data.city;
            document.querySelector("#lat").textContent = data.latitude;
            document.querySelector("#long").textContent = data.longitude;
        } catch (parseError) {
            console.log("JSON Parsing error " + parseError);
        }
    } catch(error) {
        console.log("Network error" + error);
    } 
    
    // alert("Displaying city");
}
async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            console.log(data); 

            for (let i of data) {
                let optionElement = document.createElement("option");
                optionElement.textContent = i.state;
                optionElement.value = i.usps;


                document.querySelector("#state").append(optionElement);
            }
        } catch (parseError) {
            console.log("JSON Parsing error " + parseError);
        }
    } catch(error) {
        console.log("Network error" + error)
    } 
}
async function displayCounty(i) {
        // let optionElement = document.createElement("option");    
        // optionElement.value = document[0].usps;
    let url = "https://csumb.space/api/countyListAPI.php?state=ca";
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            console.log(data); 

            for (let i of data) {
                let optionElement = document.createElement("option");
                optionElement.textContent = i.county;
                optionElement.value = i.county;

                document.querySelector("#county").append(optionElement);
            }
        } catch (parseError) {
            console.log("JSON Parsing error " + parseError);
        }
    } catch(error) {
        console.log("Network error" + error)
    } 
}


async function displayPassword(){
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    let response = await fetch(url);
    let data = await response.json();
    
    document.querySelector("#suggest").textContent = data.password;
}
async function checkUsername() {
    let userName = document.querySelector("#userName").value;
    
    let url = "https://csumb.space/api/usernamesAPI.php?username=" + userName;
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            console.log(data);

            document.querySelector("#user").textContent = userName + " ";    
            if (data.available == true && userName != "") {
                document.querySelector("#user").textContent = userName + " is available";
                document.querySelector("#user").style.color = "green";
            } else if (data.available == false && userName != "") {
                document.querySelector("#user").textContent = userName + " is not available";
                document.querySelector("#user").style.color = "red";
            } else {
                document.querySelector("#user").textContent = "";
            }
        } catch (parseError) {
            console.log("JSON Parsing error " + parseError);
        }
    } catch(error) {
        console.log("Network error" + error);
    } 
    
    // alert("Displaying city");
}
