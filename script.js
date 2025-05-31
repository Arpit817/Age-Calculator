let currDate = document.getElementById("currDate");
let dateOfBirth = document.querySelector("#DOB");
const CalcAge = document.getElementById("CalcAge");
const displayAge = document.getElementById("displayAge");
const Age = document.getElementById("age");
const resetBtn = document.getElementById("resetBtn");

var today = new Date();
currDate.innerText = `Today's Date: ${today.toLocaleDateString('en-US')}`;

displayAge.style.visibility = "hidden";

CalcAge.addEventListener("click", () => {
    if (!dateOfBirth.value) {
        alert("Please enter a valid date of birth.");
        return;
    }

    var birthDate = new Date(dateOfBirth.value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    displayAge.style.visibility = "visible";
    Age.innerText = `You are ${age} years old.`;
});

dateOfBirth.addEventListener("input", () => {
    displayAge.style.visibility = "hidden";
});

resetBtn.addEventListener("click", () => {
    dateOfBirth.value = "";
    displayAge.style.visibility = "hidden";
});
