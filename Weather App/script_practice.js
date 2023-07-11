const API_KEY = "e87cf4699bd49604a1a202b5d8e58acd";

async function fetchWeatherDetails(){
    try{
        let city = 'goa'
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        console.log(data);

        renderWeatherInfo(data);
    }
    catch(e){

    }
}

function renderWeatherInfo(data){
    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main?.temp.toFixed(2)} degree Celcius`

    document.body.appendChild(newPara);
}


function getUserLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        console.log("No geolocation support");
    }
}

function showPosition(position){
    let lat = position.coords.latitude;
    let longi = position.coords.longitude;

    console.log(lat);
    console.log(longi);
}