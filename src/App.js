import "./App.css";
import City from "./components/city/City";
import InputSearch from "./components/inputSearch/InputSearch";
import getWeather from "./service/getWeather";
import getHoursWeatherList from "./service/getHoursWeatherList";
import getCyrrentTime from "./service/getCurrentTime";
import { useEffect } from "react";
import { useState } from "react";
import HoursWeather from "./components/hoursWeather/HoursWeather";

function App() {
  const [city, setCity] = useState(
    localStorage.getItem("city") ? localStorage.getItem("city") : "Київ"
  );
  const [hour, setHour] = useState();
  const [day, setDay] = useState();
  const [time, setTime] = useState();
  const [temp, setTemp] = useState();
  const [icon, setIcon] = useState();
  const [coordinates, setCoordinates] = useState(
    localStorage.getItem("lat")
      ? [localStorage.getItem("lat"), localStorage.getItem("lon")]
      : ["50.45", "30.5241"]
  );
  const [description, setDescription] = useState();
  const [lang, setLang] = useState(
    localStorage.getItem("lang") ? localStorage.getItem("lang") : "ua"
  );

  const checkCity = (options, value) => {
    let arr = [...options];
    let city;
    arr.find((option) => {
      if (option.value === value) {
        city = option.dataset.city;
        setCity(city);
        localStorage.setItem("city", city);
      }
    });
  };

  const [hoursWeatherList, setHoursWeatherList] = useState();
  const [timezone, setTimezone] = useState();

  useEffect(() => {
    getWeather(coordinates, lang).then((response) => {
      // console.log("response", response);
      setIcon(response.weather[0].icon);
      setDescription(response.weather[0].description);
      setTemp(Math.round(response.main.temp));
      checkCity(
        document.querySelectorAll("option"),
        document.querySelector("input").value
      );
      setHour(getCyrrentTime(response.timezone, lang).currenHour);
      setDay(getCyrrentTime(response.timezone, lang).currenDay);
      setTime(getCyrrentTime(response.timezone, lang).currentTime);
      setTimezone(response.timezone);
    });

    getHoursWeatherList(coordinates, lang).then((response) => {
      setHoursWeatherList(response.list);
      // console.log(response);
    });
  }, [coordinates]);

  let bgGradient;

  if (hour < 3) {
    bgGradient = "night-2";
  } else if (hour < 6) {
    bgGradient = "dawn";
  } else if (hour < 9) {
    bgGradient = "morning";
  } else if (hour < 12) {
    bgGradient = "afternoon-1";
  } else if (hour < 15) {
    bgGradient = "afternoon-2";
  } else if (hour < 18) {
    bgGradient = "evening-1";
  } else if (hour < 21) {
    bgGradient = "evening-2";
  } else if (hour < 24) {
    bgGradient = "night-1";
  }

  return (
    <div className={`App ${bgGradient}`}>
      <InputSearch
        setCoordinates={setCoordinates}
        setCity={setCity}
        setLang={setLang}
        lang={lang}
      ></InputSearch>
      <City
        city={city}
        temp={temp}
        description={description}
        day={day}
        time={time}
        icon={icon}
      >
        {" "}
      </City>
      <HoursWeather list={hoursWeatherList} timezone={timezone}></HoursWeather>
    </div>
  );
}

export default App;
