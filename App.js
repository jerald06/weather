
import React, { useState } from "react";
import Search from "./components/Search";
const api={
  key:"6348bec849f0637f7182f9b79a5e9e27",
  base:"https://api.openweathermap.org/data/2.5/"
}
function App() {
  const handleOnSearchChange = ( searchData ) =>
  {
    console.log( searchData );
  }
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({});
  const search=evt=>{
    if(evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setWeather(result);
        setQuery('');
        console.log(weather);
      });
    }
  }
    const dateBuilder=(d)=>{
      let months=["January","Febryary","March","April","June","July","August","September","October","November","December"];
      let days=["Sunday","Monday","Tuesday","Wedenday","Thursday","Friday","Saturday"];
      let day=days[d.getDay()];
      let date=d.getDate();
      let month=months[d.getMonth()];
      let year=d.getFullYear();
      return `${day} ${date} ${month} ${year}`
    }
  return (
    <div className="app">
      <main>
        <div >
          <div className="citytextbox"
          onChange={e=>setQuery(e.target.value)}
          value={query}
          onKeyPress={search}>
      <Search onSearchChange={ handleOnSearchChange } />
    </div>
        </div>
        {(typeof weather.main !="undefined")?(
          <div>
        <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°c</div>
          <div className="weather">sunny</div>
          </div>
        </div>
        ):('')}
      </main>
    </div>
  );
}
export default App;
