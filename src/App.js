import React, { useState } from 'react'

const api = {
  key: "69040eb25863cf94c5816ce1cabd8ff9",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const search = (evt) =>{
    if(evt.key === "Enter"){
      setLoading(true)
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          setLoading(false)
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
                  "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App')
      : 'App'}>
      <main>
          <div className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyPress={search}
            />
          </div>
        {loading ? <div class="loader"></div> : 
        (
          <div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className='date'>
              {dateBuilder(new Date())}
            </div>
            </div>
            <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.main.temp)}&deg;c
            </div>
            <div className='weather'>
              {weather.weather[0].main}
            </div>
          </div>
          </div>
        ):('')}
          </div>
        )}
        
      </main>
    </div>
  );
}

export default App;
