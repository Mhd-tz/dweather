import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import MainWeather from "./components/Weather/MainWeather";
import WeatherComponent from "./components/Weather/WeatherComponent";
import About from "./components/About/About";
import "./app.scss";
import "font-awesome/css/font-awesome.min.css";
import { apiKey } from "./api/constants";

function App() {
  const [locationKey, setLocationKey] = useState("");
  const [weatherInfo, setWeatherInfo] = useState();
  const [location, setLocation] = useState("");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activeSearch, setActiveSearch] = useState(true);
  const [moreWeather, setMoreWeather] = useState(false);
  const [far, setFar] = useState(false);

  const padNum = (num) => {
    const numStr = num + "";
    const stringlength = numStr.length;
    if (stringlength === 1) {
      return "0" + numStr;
    } else {
      return numStr;
    }
  };

  useEffect(() => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (locationKey) {
      fetch(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&details=true`
      )
        .then((res) => res.json())
        .then((res) =>
          setWeatherInfo(
            res.DailyForecasts.map((df) => {
              return {
                min: df.Temperature.Minimum.Value,
                max: df.Temperature.Maximum.Value,
                hours: new Date(df.Date).getHours(),
                minutes: new Date(df.Date).getMinutes(),
                seconds: new Date(df.Date).getSeconds(),
                rain: df.Day.Rain.Value,
                rainUnit: df.Day.Rain.Unit,
                snow: df.Day.Snow.Value,
                snowUnit: df.Day.Snow.Unit,
                realFeelMin: df.RealFeelTemperature.Minimum.Value,
                realFeelMax: df.RealFeelTemperature.Maximum.Value,
                windSpeed: df.Day.Wind.Speed.Value,
                windUnit: df.Day.Wind.Speed.Unit,
                weatherType: df.Day.IconPhrase,
                weatherKey: padNum(df.Day.Icon),
                dayOfWeek: daysOfWeek[new Date(df.Date).getDay()],
                iconDescription: df.Day.IconPhrase,
              };
            })
          )
        );
    }
  }, [locationKey]);

  useEffect(() => {
    console.log(weatherInfo);
  }, [weatherInfo]);

  return (
    <div className="App">
      <div>
        <Navbar
          aboutOpen={aboutOpen}
          setAboutOpen={setAboutOpen}
          isActive={activeSearch}
          setActive={setActiveSearch}
        />
      </div>
      <div>
        <Search
          onCityFound={(cityInfo) => {
            setLocationKey(cityInfo.key);
            setLocation(cityInfo.name + ", " + cityInfo.state);
          }}
          far={far}
          setFar={setFar}
        />
      </div>
      <div>
        <About
          aboutOpen={aboutOpen}
          setAboutOpen={setAboutOpen}
          isActive={activeSearch}
          setActive={setActiveSearch}
        />
      </div>
      {!!weatherInfo &&
        weatherInfo.map((i, index) => (
          <div className="top-weather">
            <h1>{location}</h1>
            {index === 0 && (
              <MainWeather
                min={i.min}
                max={i.max}
                hours={i.hours}
                minutes={i.minutes}
                seconds={i.seconds}
                wind={i.wind}
                windUnit={i.windUnit}
                rain={i.rain}
                rainUnit={i.rainUnit}
                snow={i.snow}
                realFeelMax={i.realFeelMax}
                realFeelMin={i.realFeelMin}
                snowUnit={i.snowUnit}
                windSpeed={i.windSpeed}
                winUnit={i.windUnit}
                weatherType={i.weatherType}
                weatherKey={i.weatherKey}
                dayOfWeek={i.dayOfWeek}
                far={far}
                setFar={setFar}
                iconPhrase={i.iconDescription}
              />
            )}
          </div>
        ))}
      <div className="weather">
        {!!weatherInfo &&
          weatherInfo.map((i, index) => (
            <div
              className="bottom-weather"
              onClick={() => {
                setMoreWeather(!moreWeather);
              }}
            >
              <div className="container">
                {index !== 0 && (
                  <WeatherComponent
                    min={i.min}
                    max={i.max}
                    time={i.time}
                    wind={i.wind}
                    rain={i.rain}
                    snow={i.snow}
                    weatherType={i.weatherType}
                    weatherKey={i.weatherKey}
                    dayOfWeek={i.dayOfWeek}
                    far={far}
                    setFar={setFar}
                    iconPhrase={i.iconDescription}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
