import React, { useState } from 'react';
import "./Main.css";

function Main() {
    const[weather,setWeather]=useState(null)
    const [city , setCity]=useState('')
    const API_KEY="8006eae4045cd6790b307b586727dc6a";

    const getWeather = async() =>{
       if(!city) return ;
       try {
        const res = await fetch (
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`           
               );
              const data = await res.json();
               if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found");
      }
        
       } catch (error) {
        console.log("Error fetching weather data",error);
        
       }
    }
  return (
    <div className="Main bg-[url('/weather.avif')] w-full h-screen">
      <h1 className='text-2xl m-2 '><b>🌤️ Weather App</b></h1>
             <div className='flex justify-center items-center '>
               <input type="text" value={city}  onChange={(e)=>setCity(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  ps-10 p-2.5  m-4 " placeholder="enter your city here...." required />
             </div>

      <button onClick={getWeather}>Search</button>

      <div className=' displaymain flex justify-center items-center' >
        {
            weather && (
                <div className='display-div m-4 p-3 '>
                    <h2><b>City:</b>{weather.name}</h2>
                    <p><b>Temperature:</b> {weather.main.temp} °C</p>
                    <p><b>Condition:</b> {weather.weather[0].description}</p>
                    <p><b>Humidity:</b> {weather.main.humidity}%</p>
                    <p><b>Wind:</b> {weather.wind.speed} m/s</p>
                </div>
            )
        }
      </div>
      
    </div>
  )
}

export default Main
