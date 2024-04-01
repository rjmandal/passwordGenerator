const inputSlider = document.querySelector("[data-length-Slider]");
const displayLengthNumber = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector(".display");
const copyBtn = document.querySelector(".data-copy");
const copyMsg = document.querySelector(".data-copyMsg");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const allChecksBox = document.querySelectorAll("input[type=checkbox]");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");

const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

let password = "";
let passwordLength = 8;
let checkCount = 0;

// set strength color to grey 
setIndicator("#ccc");
// set password length
handleSlider();

function handleSlider() {
    inputSlider.value = passwordLength;
    displayLengthNumber.innerText = passwordLength;
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}
function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
    const randomIndex = getRndInteger(0, symbols.length);
    return symbols[randomIndex];
}

function calcuLatePasswordStrength() {

    // let strength = 0;
    // if (upperCaseCheck.checked) {
    //     strength++;
    // }
    // if (lowerCaseCheck.checked) {
    //     strength++;
    // }
    // if (numberCheck.checked) {
    //     strength++;
    // }
    // if (symbolCheck.checked) {
    //     strength++;
    // }
    // // return strength;
    // if (strength === 4 && passwordLength >= 8) {
    //     setIndicator("green");
    // } else if (strength === 2 && passwordLength >= 6) {
    //     setIndicator("orange");
    // } else {
    //     setIndicator("red");
    // }
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (upperCaseCheck.checked) hasUpper = true;
    if (lowerCaseCheck.checked) hasLower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied!";
    } catch (err) {
        copyMsg.innerText = "Failed to copy!";
    }
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);

// ******************************************************************************
    // The choice between them depends on the specific requirements and structure of your code. If you already 
    // have the password value stored in a variable (password in this case), the uncommented code may be more 
    // appropriate. If the password is displayed in an input field (passwordDisplay), then the commented code may 
    // be more suitable

    // const {clipboard} = navigator;
    // await clipboard.writeText(password);
    // copyMsg.classList.add("active");
    // setTimeout(()=>{
    //     copyMsg.classList.remove("active");
    // },2000);
 // ******************************************************************************
}
// *********************************shuffle password*********************************************
function shufflePassword(password){
    // fisher-yates shuffle
    for(let i = password.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [password[i],password[j]] = [password[j],password[i]];
    }
    let shuffledPassword = "";
    password.forEach((char)=>shufflePassword+=char);
    return shuffledPassword;
}
function handleCheckBoxChange(){
    checkCount = 0;
    allChecksBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })
}

if(passwordLength < checkCount){
    passwordLength = checkCount; 
    handleSlider();
}

allChecksBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange)
})

inputSlider.addEventListener("input",(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})
copyBtn.addEventListener("click",()=>{
    if(passwordDisplay.value){
        copyToClipboard();
    }
})
generateBtn.addEventListener('click',()=>{
// none of the checks are selected
    if(checkCount === 0){
        return;
    }
    if(passwordLength < checkCount){
        passwordLength = checkCount; 
        handleSlider();
    }
    // let's start the password

    // remove old password
    password = "";
    
    // let's put the stuff based on checkboxes

    // if(upperCaseCheck.checked){
    //     password+=generateUpperCase();
    // }
    // if(lowerCaseCheck.checked){
    //     password+=generateLowerCase();
    // }
    // if(numberCheck.checked){
    //     password+=generateRandomNumber();
    // }
    // if(symbolCheck.checked){
    //     password+=generateSymbol();
    // }

    let funcArr = [];

    if(upperCaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowerCaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numberCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolCheck.checked){
        funcArr.push(generateSymbol);
    }
   
    // ******************************************************************************
    // compulsory addition
    for(let i=0; i<funcArr.length; i++){
        password+=funcArr[i]();
    }
    // ******************************************************************************
    // let's add the rest of the password
    for(let i = 0; i<passwordLength-funcArr.length; i++){
        const randomIndex = getRndInteger(0,funcArr.length);
        password+=funcArr[randomIndex]();
    }

    let passwordArr = Array.from(password);
    password=shufflePassword(passwordArr);
    passwordDisplay.value = password;
    calcuLatePasswordStrength();
})