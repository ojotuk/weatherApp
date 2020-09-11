
let toggler = document.getElementById('toggler');
//let nav = document.getElementById('nav-container')
const navSearch = document.getElementById('nav-search');


//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}


toggler.addEventListener('click', (e)=>{
    let nav = document.getElementById('nav-container')
    nav.classList.toggle('mobile')
})

navSearch.addEventListener('keypress', async (e)=>{
    const apiKey = '2e30202f6541eade598ccd15433f6769';
   // const URI = `https://api.openweathermap.org/data/2.5/forecast?q=${navSearch.value}&appid=${apiKey}`

   // console.log(e.key)
    if(e.key==='Enter'){
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${navSearch.value}&appid=${apiKey}` //search by city;
        const data = await fetch(URL);
        const result = await data.json();
       // console.log(result)
        //forecast
        const URI = `https://api.openweathermap.org/data/2.5/forecast?q=${navSearch.value}&appid=${apiKey}`
        const forecast = await fetch(URI);
        const forecastResult = await forecast.json();
        const weatherParams = {current:result, forecast:forecastResult};

        if(result.cod===200){
            localStorage.setItem('weather-params', JSON.stringify(weatherParams))
            window.location.assign('/pages/search.html')

        }

        
    }
})

