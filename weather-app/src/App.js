import React, { useState } from "react";
import Wheater from "./wheaterresult";
import "./App.css";

function App() {
  const APP_KEY = `8fdbd683cfc54820a77180932220909`;
  let cityinput = "";

  const [wheaterdata, setweatherdata] = useState([]);

  const citytext = () => {
    document.querySelector("input").addEventListener("input", (e) => {
      e.preventDefault();
      cityinput = e.target.value;
      console.log(cityinput);
    });
  };

  const getdata = async (value) => {
    const data = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${value}&days=3`
    );
    const result = await data.json();
    setweatherdata(result.forecast.forecastday);
    console.log(result.forecast.forecastday);
  };
  return (
    <div>
      <div className="search">
        <input type="text" placeholder="Search a city..." onChange={citytext} />
        <button onClick={() => getdata(cityinput)}>Search</button>
      </div>
      <div>
        {wheaterdata.map((item) => (
          <Wheater
            key={item.date}
            date={item.date}
            mintemp={item.day.mintemp_c}
            maxtemp={item.day.mintemp_c}
            condition={item.day.condition.text}
            icon={item.day.condition.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
