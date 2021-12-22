import "./mainweather.scss";

function MainWeather({
  min,
  max,
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
  hours,
  minutes,
  seconds,
  far,
  setFar,
  iconPhrase,
  windSpeed,
}) {
  const celsiusConversion = (f) => {
    return Math.round((f - 32) * (5 / 9));
  };
  const averageTemp = (min, max) => {
    return Math.round((min + max) / 2);
  };

  return (
    // <div className="weather">
    <>
      <div className="wrapper-top-weather">
        <div className="weather-left">
          <p className="day-top">Today: {dayOfWeek}</p>
          {/* <p className="time-top">
            {hours} : {minutes} PM
          </p> */}
          <p className="tempAvg">
            {far
              ? averageTemp(min, max) + " °F"
              : averageTemp(celsiusConversion(min), celsiusConversion(max)) +
                " °C"}
          </p>
          <img
            className="weather-icon-top"
            src={`https://developer.accuweather.com/sites/default/files/${weatherKey}-s.png`}
            alt=""
          />
          <p className="icon-des">{iconPhrase}</p>
        </div>
        <div className="weather-right">
          <table-coll>
            {" "}
            <p className="cell">
              Min: {far ? min + " °F" : celsiusConversion(min) + " °C"}
            </p>
          </table-coll>
          <p className="cell">
            Rain: {rain} {rainUnit}
          </p>
          <div className="table-row">
            <p className="cell">
              Max: {far ? max + " °F" : celsiusConversion(max) + " °C"}
            </p>
            <p className="cell">
              Snow: {snow} {snowUnit}
            </p>
          </div>
          <p className="cell">
            Feels Like:{" "}
            {far
              ? averageTemp(realFeelMin, realFeelMax) + " °F"
              : celsiusConversion(averageTemp(realFeelMin, realFeelMax)) +
                " °C"}
          </p>
          <p className="cell">
            Wind: {windSpeed} {windUnit}
          </p>
        </div>
      </div>
    </>
  );
}

export default MainWeather;
