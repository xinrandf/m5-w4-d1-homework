import { useState, useEffect } from 'react';
import './App.css';
import countries from 'i18n-iso-countries';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureLow, faTemperatureHigh, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('Irvine, USA');
  const [state, setState] = useState('Irvine, USA');

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  // handlers
  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return ((k - 273.15) * 1.8 + 32).toFixed(0);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>

      <input
        type="text"
        value={getState}
        onChange={inputHandler}
        placeholder="Enter location"
      />

      <button onClick={submitHandler}>Search</button>

      <div>
        <h2>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {state}
        </h2>

        {apiData.main ? (
          <>
            <p>
              <FontAwesomeIcon icon={faTemperatureLow} /> Low:{" "}
              {kelvinToFarenheit(apiData.main.temp_min)} °F
            </p>
            <p>
              <FontAwesomeIcon icon={faTemperatureHigh} /> High:{" "}
              {kelvinToFarenheit(apiData.main.temp_max)} °F
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;