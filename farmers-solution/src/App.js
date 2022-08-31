import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState({})
  const [getlocation, setGetLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${getlocation}&units=metric&appid=eacf37967a7e8aadc0c904494f4f488c`

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", 
                  "May","June", "July", "August", "September",
                  "October", "Novmber", "December"
                  ];
    let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  
  const searchLocation = (event) =>{
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setGetLocation('')
    }
  }

  return (
    <div className="App">
    <div className='search-box'>
      <input type="text" 
        value={getlocation}
        onChange = {event => setGetLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Search...."
      />
    </div>
      <div className="weather-container">
        <div className='top'>
          <div className="location">
            <h1>{data.name}</h1>
            <h2>{dateBuilder(new Date())}</h2>
          </div>
          <div className="temp">
           {data.main ? <h2>{data.main.temp.toFixed()}°c</h2> :null}
          </div>
          <div className="description">
          {data.weather ?  <h2>{data.weather[0].main}</h2> : null} 
          </div>
        </div>
        
        {data.name != undefined &&
          <div className="bottom">
            <div className="feels">
              <p>Feels like</p>
              {data.main ? <h2>{data.main.feels_like.toFixed()}°c</h2> :null}
            </div>

            <div className="humidity">
            <p>Humidity</p>
            </div>
            {data.main ? <h2>{data.main.humidity}%</h2> :null}
            
            <div className="wind">
            <p>Wind Speed</p>
            {data.wind ? <h2>{data.wind.speed.toFixed()}MPH</h2> :null}
            </div>
          </div>
        }
  
      </div>
    </div>
  );
}
export default App;
