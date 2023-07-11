const userTab = document.querySelector("[data-userWeather]")
const searchTab = document.querySelector("[data-searchWeather]")
const userContainer = document.querySelector(".weather-container")
const grantAccessContainer = document.querySelector(".grant-location-container")
const searchForm = document.querySelector('[data-searchForm]')
const loadingScreen = document.querySelector(".loading-container")
const userInfoContainer = document.querySelector(".user-info-container")
const notFound = document.querySelector(".error-found");

let oldTab = userTab;
const API_KEY = "e87cf4699bd49604a1a202b5d8e58acd";
oldTab.classList.add('current-tab');

getfromSessionStorage();


function switchTab(clickedTab){
    if(clickedTab != oldTab){  //change in tab
        oldTab.classList.remove('current-tab');
        oldTab=clickedTab;
        oldTab.classList.add('current-tab');

        if(!searchForm.classList.contains("active")){
            // notFound.classList.remove('active');
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add('active');
        }
        else{
            // m pehle search wale tab pe tha ab your weather tab ko visible karna h
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            // notFound.classList.remove('active');

            getfromSessionStorage(); //check local storage first for cordinates if we have saved them there

        }
    }
}

userTab.addEventListener('click' ,()=>{
    switchTab(userTab)
});
searchTab.addEventListener('click' ,()=>{
    switchTab(searchTab)
});

function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinate");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);  // json string to json obj
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat,longi} = coordinates;
    grantAccessContainer.classList.remove("active");
    //make loader visible:
    loadingScreen.classList.add('active');

    //API CALL:
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&appid=${API_KEY}`)
        const data = await response.json();
        // notFound.classList.remove("active")
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }

    catch(e){
        // HW

        alert(e);
        // userInfoContainer.classList.remove("active");
        // notFound.classList.add('active');
        // loadingScreen.classList.remove("active");

    }
}


function renderWeatherInfo(weatherInfo){
    //fetch all the elements
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryFlag]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    // fetch values from weatherInfo obj and put it in UI
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}

// when clicked on grant access button do 2 things : find your own location using geolocation and then store it in session storage

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        alert("No geolocation support");
    }
}
function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        longi:position.coords.longitude,
    }

    sessionStorage.setItem('user-coordinate',JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener('click',getLocation);

const searchInput=document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName = searchInput.value;
    if(cityName==="")return;
    else{
        fetchSeachWeatherInfo(cityName);
    }
})

async function fetchSeachWeatherInfo(city)
{
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        const data = await res.json();
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(e){
        //
    }
}