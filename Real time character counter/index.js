const counterE1 = document.getElementById("total-counter");
const remainingE1 =document.getElementById("remaining-counter");

const textareaE1 = document.getElementById("textarea");

textareaE1.addEventListener("keydown",()=>{
    // console.log('pressed');
    updateCounter();
})

updateCounter();

function updateCounter(){
    counterE1.innerText = textareaE1.value.length;
    remainingE1.innerText = textareaE1.getAttribute("maxLength") - textareaE1.value.length;
}