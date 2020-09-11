const searchBtn = document.getElementById('search-action');
const searchVal = document.getElementById('city-input');
const selectForecast = document.getElementById('selectForecast');
const forecastDisplay = document.getElementById('forecast-display');
const toggleDisplay = document.getElementById('display-toggler');

// const apiKey = '2e30202f6541eade598ccd15433f6769';
const date = new Date

const dataContainer = document.getElementById('search-result-container')
const forecastContainer = document.getElementById('search-result-container-forecast')

const dateConvert = (dt)=>{
    const date = new Date(dt * 1000);
 return date.toString()

}
const windDirection = (deg)=>{
    const compass = deg/45;
    if (compass < 2) return `NE`;
    if (compass > 2 && compass < 4) return `SE`;
    if (compass >4 && compass <6) return `SW`;
    if(compass > 6 && compass < 8) return `NW`;
}

selectForecast.addEventListener('change', (e)=>{
    let value =e.target.value
   forecastDisplay.innerHTML=`<p>Loading...</p>`
    const {current, forecast} = JSON.parse(localStorage.getItem('weather-params'));
    //console.log(forecast)
    const forecastDetails = forecast.list.find(forecast=>forecast.dt===Number(value));
  //  console.log(forecastDetails, value)
    getForecast(value,forecastDetails, forecast.city.name, forecast.city.country)

})
const getForecast = (forecast,details, city, countryName)=>{
   // console.log(details)
   
    const {weather:[{main, description, icon}]
            , name,dt,dt_txt,
            main:{temp, feels_like,temp_min, temp_max,pressure,humidity}
            ,sys:{country,sunrise,sunset},
            visibility,wind:{speed,deg}} = details;
            const time=dateConvert(dt)
    forecastDisplay.innerHTML = `
            
            <div class='temp-div'>
            <h5>
            <svg width="14" height="14" viewBox="0 0 24 24"><title>ic_location_on_24px</title>
            <g fill="#cb1a1a">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
            </g>
            </svg>${city} ${countryName}</h5>
            <p class='date-info'>${dateConvert(dt)}</p>
                <div class='temp'>
                <img src='/asset/img/conditions/${icon}.png'/>
                    <p class='temp-info'>${(Number(temp)-273).toFixed(1)} <sup>o</sup>C</p>
                </div>
                <p class='min-max'>min: ${(Number(temp_min)-273).toFixed(1)} <sup>o</sup>C ,
                max:${(Number(temp_max)-273).toFixed(1)} <sup>o</sup>C</p>
            </div>
            <div>
                <h5>Feels like ${(Number(feels_like)-273).toFixed(1)} <sup>o</sup>C,
                ${main}, ${description} </h5>
            </div>
            <div class='wind-info'>
                <span><img src='/asset/img/wind.png' height='15px' width='15px'/><p> ${(Number(speed)*3.6).toFixed(1)} Km/hr </p>${windDirection(deg)}</span>
                <span><img src='/asset/img/pressure.png' height='15px' width='15px'/><p> ${pressure} Pa</p></span>
                <span><img src='/asset/img/humidity.png' height='15px' width='15px'/><p> ${humidity} %</p></span>
            </div>       
    `
}


const update = ()=>{
        
        const {current, forecast} = JSON.parse(localStorage.getItem('weather-params'));
        const {weather:[{main, description, icon}]
            , name,dt,
            main:{temp, feels_like,temp_min, temp_max,pressure,humidity}
            ,sys:{country,sunrise,sunset},
            visibility,wind:{speed,deg}} = current;

         //   const time=dateConvert(dt)
         //   console.log(time)
        dataContainer.innerHTML=`
                                <h5>
                                <svg width="14" height="14" viewBox="0 0 24 24"><title>ic_location_on_24px</title>
                                <g fill="#cb1a1a">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                                </g>
                                </svg> ${name}, ${country}</h5>
                                
                                <p class='date-info'>${date.toLocaleString()}</p>
                                <div class='temp-div'>
                                    <div class='temp'>
                                    <img src='/asset/img/conditions/${icon}.png'/>
                                        <p class='temp-info'>${(Number(temp)-273).toFixed(1)} <sup>o</sup>C</p>
                                    </div>
                                    <p class='min-max'>min: ${(Number(temp_min)-273).toFixed(1)} <sup>o</sup>C ,
                                     max:${(Number(temp_max)-273).toFixed(1)} <sup>o</sup>C</p>
                                </div>
                                <div>
                                    <h5>Feels like ${(Number(feels_like)-273).toFixed(1)} <sup>o</sup>C,
                                    ${main}, ${description} </h5>
                                </div>
                                <div class='wind-info'>
                                    <span><img src='/asset/img/wind.png' height='15px' width='15px'/><p>${(Number(speed)*3.6).toFixed(1)} Km/hr </p>${windDirection(deg)}</span>
                                    <span><img src='/asset/img/pressure.png' height='15px' width='15px'/><p>${pressure} Pa </p></span>
                                    <span><img src='/asset/img/humidity.png' height='15px' width='15px'/><p>${humidity} %</p></span>
                                </div>
                            ` 
        selectForecast.innerHTML = 
            `               ${
                                    forecast.list.map(forecast=>{
                                        const {weather:[{main, description, icon}]
                                        , name,dt,
                                        main:{temp, feels_like,temp_min, temp_max,pressure,humidity}
                                        ,sys:{country,sunrise,sunset},
                                        visibility,wind:{speed,deg}} = forecast;
                                        return (
                                            `<option value=${forecast.dt}>${forecast.dt_txt}</option>`
                                        )
                                    })
                                }
                            ` 
        localStorage.setItem('forecast', JSON.stringify(forecast.list[0].dt))
        const forecastMan = JSON.parse(localStorage.getItem('forecast'))
        const forecastDetails = forecast.list.find(forecast=>forecast.dt===forecastMan);
        getForecast(forecast.list[0].dt, forecastDetails,forecast.city.name, forecast.city.country)
       // console.log(forecastDetails.dt_txt)

    
}
if(localStorage.getItem('weather-params')){
    const {current, forecast} = JSON.parse(localStorage.getItem('weather-params'));
    current.cod===404 ? console.log('not found') :    update()
}
if(!localStorage.getItem('weather-params')){
    dataContainer.innerHTML=`<p>No query...</p>`;
    forecastDisplay.innerHTML=`<p>No query...</p>`;
}


searchBtn.addEventListener('click', async()=>{
   // console.log(searchVal.value)
    const apiKey = '2e30202f6541eade598ccd15433f6769';

    dataContainer.innerHTML=`<p>Loading...</p>`;
    forecastDisplay.innerHTML=`<p>Loading...</p>`;




    // city.innerHTML='';
    // feelsLike.innerHTML, temperature.innerHTML = ''
    //current
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal.value}&appid=${apiKey}` //search by city;
    const data = await fetch(URL);
    const result = await data.json();

    //forecast
    const URI = `https://api.openweathermap.org/data/2.5/forecast?q=${searchVal.value}&appid=${apiKey}`
    const forecast = await fetch(URI);
    const forecastResult = await forecast.json();
    const weatherParams = {current:result, forecast:forecastResult}


  //  console.log(result, forecastResult)
    if(result.cod===200){
        localStorage.setItem('weather-params', JSON.stringify(weatherParams))
       update()
    
        
    }
    
    if(result.cod!==200){
        dataContainer.innerHTML='City not found';
        forecastDisplay.innerHTML='City not found';
        selectForecast.innerHTML=''


        return
    }
    
})

searchVal.addEventListener('keypress', async (e)=>{
    const apiKey = '2e30202f6541eade598ccd15433f6769';

    //console.log(e.key)
    if(e.key==='Enter'){
      //  console.log(searchVal.value)
        const apiKey = '2e30202f6541eade598ccd15433f6769';
    
        dataContainer.innerHTML=`<p>Loading...</p>`;
        forecastDisplay.innerHTML=`<p>Loading...</p>`

        // city.innerHTML='';
        // feelsLike.innerHTML, temperature.innerHTML = ''
        //current
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal.value}&appid=${apiKey}` //search by city;
        const data = await fetch(URL);
        if(!data){
            dataContainer.innerHTML='Offline';
            forecastDisplay.innerHTML='Offline';
            selectForecast.innerHTML=''
        }
        const result = await data.json();
    
        //forecast
        const URI = `https://api.openweathermap.org/data/2.5/forecast?q=${searchVal.value}&appid=${apiKey}`
        const forecast = await fetch(URI);
        const forecastResult = await forecast.json();
        const weatherParams = {current:result, forecast:forecastResult}
    
    
      //  console.log(result, forecastResult)
        if(result.cod===200){
            localStorage.setItem('weather-params', JSON.stringify(weatherParams))
           update()
            return;
        }
        
        if(result.cod!==200){
            dataContainer.innerHTML='City not found';
            forecastDisplay.innerHTML='City not found';
            selectForecast.innerHTML=''
            return
        }
        console.log('err 1')
    }
})
