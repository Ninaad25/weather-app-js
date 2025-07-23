document.addEventListener('DOMContentLoaded', ()=>{
   const cityInput = document.getElementById("city-input");
   const getWeatherBtn = document.getElementById("get-weather-btn");
   const weatherInfo = document.getElementById("weather-info");
   const cityNameDisplay = document.getElementById("city-name");
   const temperatureDisplay = document.getElementById("temperature");
   const descriptionDisplay = document.getElementById("description");
   const errorMessage = document.getElementById("error-message");

    const API_KEY = "fa383fcd80b12696d8bfdd9626c5e844"; //environment variable

// `async` function is used to handle the promise returned by the fetch API

    getWeatherBtn.addEventListener('click', async() =>{
      const city = cityInput.value.trim(); // trim() removes leading and trailing spaces
      if (!city) return; // to prevent empty input

      // it may throw an error
      //server or database is always in another continent
      try {
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData); // await is used to wait for the promise to resolve
      } catch (error) {
        showError();
      }
      cityInput.value = ""; // clear input field after clicking the button
    })

    async function fetchWeatherData(city){
        //get data
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url); //await is used to wait for the promise to resolve
        console.log(typeof response); 
        console.log("RESPONSE", response);

        if(!response.ok){
            throw new Error("City not found"); // if response is not ok, throw an error
        }
        const data = await response.json(); // convert the response to json
        return data;
        
    }

    function displayWeatherData(data){
        //display data
        console.log(data);
        const {name, main, weather} = data
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

        //unlocking display
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }
    
    function showError(){
        weatherInfo.classList.remove('hidden'); //to hide the weather info
        errorMessage.classList.add('hidden'); //to show the error message
    }

})