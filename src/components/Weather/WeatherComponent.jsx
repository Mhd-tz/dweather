import "./weather.scss";

function WeatherComponent({
  min,
  max,
  wind,
  windUnit,
  rain,
  rainUnit,
  snow,
  snowUnit,
  weatherType,
  weatherKey,
  dayOfWeek,
  realFeelMin,
  realFeelMax,
  sunSet,
  hours,
  minutes,
  seconds,
  far,
  setFar,
  iconPhrase,
}) {
  const celsiusConversion = (f) => {
    return Math.round((f - 32) * (5 / 9));
  };
  return (
    // <div className="weather">
    <>
      <p className="day"> {dayOfWeek}</p>
      <img
        className="weather-icon-bottom"
        src={`https://developer.accuweather.com/sites/default/files/${weatherKey}-s.png`}
        alt=""
      />
      <p className="iP">{iconPhrase}</p>
      <p className="temp">
        <div className="minimum">
          Min: {far ? min + " °F" : celsiusConversion(min) + " °C"}
        </div>
        <div className="maximum">
          Max: {far ? max + " °F" : celsiusConversion(max) + " °C"}
        </div>
      </p>
    </>
    // </div>
  );
}

export default WeatherComponent;
