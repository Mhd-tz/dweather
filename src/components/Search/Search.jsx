import React, { useState } from "react";
import "./search.scss";
import "font-awesome/css/font-awesome.min.css";
import { apiKey } from "../../api/constants";

function Search({ onCityFound, far, setFar }) {
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("°C");

  // change temp sign to F when clicked
  const changeTemp = () => {
    if (temp === "°C") {
      setTemp("°F");
      setFar(true);
    } else {
      setTemp("°C");
      setFar(false);
    }
  };

  // get weather data from API by city name from accuweather
  const getWeather = async (e, city) => {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => res.find((r) => r.Country.ID))
      .then((res) => {
        if (res) {
          onCityFound({
            name: res.LocalizedName,
            key: res.Key,
            state: res.Country.ID,
          });
          setCity("");
        } else {
          alert("City not found");
        }
      });
  };

  const getLocation = async (e, zip) => {
    const URL = `https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${zip}"`;

    fetch(URL)
      .then((res) => res.json())
      .then((res) => res.find((r) => r.Country.ID))
      .then((res) => {
        // set if the zip code is valid
        if (res) {
          onCityFound({
            name: res.LocalizedName,
            key: res.Key,
            state: res.Country.ID,
          });
          setZipCode("");
        } else if (zip === "") {
          alert("Please enter a Zip Code or City!");
        }
      });
  };

  return (
    // make a search bar with search icon button
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Zip Code or City Name"
          value={zipCode && city}
          onChange={(e) =>
            setZipCode(e.target.value) || setCity(e.target.value)
          }
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              //if the user is searching by zip code then call getLocation
              getLocation(e, zipCode);
              getWeather(e, city);
            }
          }}
        />
        <button className="search-button">
          <i
            className="fa fa-search"
            onClick={(e) => getLocation(e, zipCode) && getWeather(e, city)}
          ></i>
          <i className="fa fa-thermometer-half" onClick={() => changeTemp()}>
            <span className="temp-unit"> {temp}</span>
          </i>
        </button>
      </div>
    </div>
  );
}

export default Search;
