import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import ErrorBox from '../ErrorBox/ErrorBox';
import Loader from '../Loader/Loader';
import { useState } from 'react';

const WeatherBox = () => {
  const [weatherData, setWeatherData] = useState({});
  const [pending, setPending] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const handleCityChange = city => {
    setWeatherData({});
    setHasErrors(false);
    setPending(true);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    .then( res => {
      if(res.status === 200) {
        return res.json()
        .then(data => {
          setPending(false);
          setWeatherData(
            {
              ...weatherData,
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            }
          )
        });
      } else {
        setPending(false);
        setHasErrors(true);
      }
    });
  };

  return (
    <section>
      <PickCity action={handleCityChange} />
      { weatherData.city && !pending && !hasErrors && <WeatherSummary 
        city={weatherData.city} 
        temp={weatherData.temp} 
        icon={weatherData.icon} 
        description={weatherData.description} /> }
      { !hasErrors && pending && <Loader /> }
      { hasErrors && <ErrorBox /> }
    </section>
  )
};

export default WeatherBox;