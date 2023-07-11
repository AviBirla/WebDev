const inputSlider = document.querySelector("[data-lengthSlider]");  // data-lengthSlider is custom attribute
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
console.log(allCheckBox)
const symbols = '~`!@#$%^&*()_-+={[}]\|:;"<,>.?/';


let password = "";
let passwdlen = 10;
let checkCount = 0;
// set strength color to gray initially
setIndicator("#ccc")

// functions : copy , slider ,generate passwd ,set indicator color function ,getrandom function,calc strength

handleslider();

function handleslider(){  // set passwd len
    inputSlider.value = passwdlen;
    lengthDisplay.innerText = passwdlen;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;

    //shadow
}

function getRandInteger(min,max){                   // math.random() will give random no. between 0(inc.) and 1(exc.)
    return Math.floor(Math.random() * (max-min))+min;
}

function generateRandomNumber(){
    return getRandInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRandInteger(65,91));
}

function generateSymbol(){
    const randNum = getRandInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasNum = false;
    let hasUpper = false;
    let hasLower = false;
    let hasSym = false;

    if(uppercaseCheck.checked)hasUpper = true;
    if(lowercaseCheck.checked)hasLower = true;
    if(numberCheck.checked)hasNum = true;
    if(symbolsCheck.checked)hasSym = true;

    if(hasUpper && hasLower && (hasNum||hasSym) && passwdlen>=8)setIndicator("#0f0");
    else if((hasLower|| hasUpper)&& (hasNum||hasSym)&& passwdlen>=6)setIndicator("#ff0");
    else setIndicator("#f00");

}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = 'copied';
    }

    catch(e){
        copyMsg.innerText = 'failed to copy';
    }

    copyMsg.classList.add('active');  // to make copy wala span visible

    setTimeout(() => {
       copyMsg.classList.remove('active'); 
    }, 2000);
}

function shufflePasswd(arrayOfPasswd){
    // FISHER YATES METHOD:::

    for(let i=arrayOfPasswd.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp  = arrayOfPasswd[i];
        arrayOfPasswd[i] = arrayOfPasswd[j];
        arrayOfPasswd[j]= temp;
    }
    let str = '';
    arrayOfPasswd.forEach((el)=>(str+=el));
    return str;


}



function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)checkCount++;
    })

    if(passwdlen<checkCount){
        passwdlen = checkCount;
        handleslider();
    }
}

allCheckBox.forEach( (checkbox)=>{
    checkbox.addEventListener('change' , handleCheckBoxChange);
});

inputSlider.addEventListener('input',(e)=>{
    passwdlen = e.target.value;
    handleslider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)copyContent();
})

generateBtn.addEventListener('click',()=>{
    // none of the checkbox are selected

    if(checkCount<=0)return;

    if(passwdlen<checkCount){
        passwdlen = checkCount;
        handleslider();
    }

    // find new passwd;
    console.log('start...')
    //remove old passwd:
    password="";

    // put the stuff mentioned by checkboxes
    // if(uppercaseCheck.checked){
    //     password+=generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password+=generateLowerCase();
    // }
    // if(numberCheck.checked){
    //     password+=generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password+=generateSymbol();
    // }

    let funcArr = [];
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase)
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase)
    }
    if(numberCheck.checked){
        funcArr.push(generateRandomNumber)
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol)
    }

    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    console.log('compulsory addn done...')

    // remaining addn:

    for(i=0;i<passwdlen-funcArr.length;i++){
        let randomIndex = getRandInteger(0,funcArr.length);
        password+=funcArr[randomIndex]();
    }

    console.log('remaining addn done...')

    // shuffle the passwd

    password = shufflePasswd(Array.from(password));
    console.log('shuffle done...')

    passwordDisplay.value = password;
    console.log('UI addn done...')

    // calc strength
    calcStrength();


})




