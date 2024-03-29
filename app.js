const url ="https://api.openweathermap.org/data/2.5/"
const key ="67d5e8df4a0ccc48e6b5edeca0ecdbdb"



const search = document.getElementById("search")
search.addEventListener("keypress",(e)=>{
    if (e.key==="Enter"){
        getResult(search.value)
        
        search.value=""
    }
    
})

function getResult(cityName){
    let query=`${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
    fetch(query)
    .then((res) => res.json())
    .then((weather) => displayResult(weather))
    
}

//! nem göstergesi yap
function displayResult(weather){
    let wrapper = document.querySelector(".wrapper")
    
    let desc = weather.weather[0].description
    let cityName = weather.name
    let temp = Math.floor(weather.main.temp)
    let icon=weather.weather[0].icon
    

    wrapper.innerHTML=`
    <div class="img">
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png"   alt="">
    </div>
    <div class="city-temp-desc">
        <p id="city">${cityName}</p>
        <span id="temp">${temp} °C</span>
        <span id="desc">${desc}</span>
    </div>
    `
    let minMaxFeel = document.getElementById("min-max-feel")
    let lowTemp = Math.floor(weather.main.temp_min)
    let maxTemp = Math.floor(weather.main.temp_max)
    let feelTemp = Math.floor(weather.main.feels_like)

    minMaxFeel.innerHTML=`
        <span id="min">
            <i class="fa-solid fa-temperature-low"></i>
                ${lowTemp}°C
        </span>
        <span id="max">
            <i class="fa-solid fa-temperature-high"></i>
            ${maxTemp}°C
        </span>
        <span id="feel">
            <i class="fa-solid fa-feather"></i>
            ${feelTemp}°C
        </span>
    `
}



document.addEventListener("click",(e)=>{
    
    if (e.target.type==="search" && e.target.value!=""){

        getResult(e.target.value)
        e.target.value=""
    }
})

