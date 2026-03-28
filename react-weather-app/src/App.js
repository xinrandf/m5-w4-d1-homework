import { useState, useEffect } from 'react';
import './App.css';
import countries from 'i18n-iso-countries';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTemperatureLow,
  faTemperatureHigh,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('Irvine, USA');
  const [state, setState] = useState('Irvine, USA');

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

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
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather App</h2>
      </header>

      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="col-auto">
            <label htmlFor="location-name" className="col-form-label">
              Enter Location :
            </label>
          </div>

          <div className="col-auto">
            <input
              type="text"
              id="location-name"
              className="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>

          <div className="col-auto">
            <button
              className="btn btn-primary mt-2"
              onClick={submitHandler}
            >
              Search
            </button>
          </div>
        </div>

        <div className="card mt-3 mx-auto">
          {apiData.main ? (
            <div className="card-body text-center">
              <h3>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {state}
              </h3>
              <p>
                <FontAwesomeIcon icon={faTemperatureLow} /> Low:{' '}
                {kelvinToFarenheit(apiData.main.temp_min)} °F
              </p>
              <p>
                <FontAwesomeIcon icon={faTemperatureHigh} /> High:{' '}
                {kelvinToFarenheit(apiData.main.temp_max)} °F
              </p>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>

      <footer className="footer">
        &copy; React Weather App
      </footer>
    </div>
  );
}

export default App;