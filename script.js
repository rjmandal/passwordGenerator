const inputSlider = document.querySelector("[data-length-Slider]");
const displayLengthNumber = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector(".display");
const copyBtn = document.querySelector(".data-copy");
const copyMsg = document.querySelector(".data-copyMsg");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const allChecksBox = document.querySelector("input[type=checkbox]");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelectorAll(".generateButton");

let password = "";
let passwordLength = 15;
let checkCount = 1;

// set strength color to grey 

// set password length
handleSlider();

function handleSlider() {
    inputSlider.value = passwordLength;
    displayLengthNumber.innerText = passwordLength;
}
