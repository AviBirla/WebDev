const containerEl = document.querySelector(".container");
const btnEl = document.querySelector(".btn");
const popupEl = document.querySelector(".popup-container");
const closeEl = document.querySelector(".close-icon");

btnEl.addEventListener("click",()=>{
    containerEl.classList.add('active');
    popupEl.classList.remove('active');
})

closeEl.addEventListener("click",()=>{
    containerEl.classList.remove('active');
    popupEl.classList.add('active');
})