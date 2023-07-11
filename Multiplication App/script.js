const num1 = Math.ceil((Math.random())*10);
const num2 = Math.ceil((Math.random())*10);

const question = document.getElementById("question");
question.innerText =`What is ${num1} multiply by ${num2} ?`;

const ans = num1*num2;

const inputE1 = document.getElementById("input");

const formEl = document.getElementById("form");

const scoreE1 = document.getElementById("score");

let score = JSON.parse(localStorage.getItem("score"));

if(!score)score = 0;

scoreE1.innerText = `score: ${score}`



formEl.addEventListener("submit",()=>{
    const userans = +inputE1.value;
        // console.log(userans,typeof(userans));
    if(userans===ans){
        score++;
        updateLocaleStorage();
        console.log(score);
    }
    else {
        score--;
        console.log(score);
        updateLocaleStorage();
    }
})

function updateLocaleStorage(){
    localStorage.setItem("score",JSON.stringify(score));
}

