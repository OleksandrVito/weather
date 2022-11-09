import "./hoursWeather.css";

const HoursWeather = (props) => {
  const hours = new Date().getUTCHours() + props.timezone / 60 / 60;

  let list;
  if (props.list) {
    let currentList = [];
    let bgGradient;

    if (hours < 3) {
      bgGradient = "night-2";
    } else if (hours < 6) {
      bgGradient = "dawn";
    } else if (hours < 9) {
      bgGradient = "morning";
    } else if (hours < 12) {
      bgGradient = "afternoon-1";
    } else if (hours < 15) {
      bgGradient = "afternoon-2";
    } else if (hours < 18) {
      bgGradient = "evening-1";
    } else if (hours < 21) {
      bgGradient = "evening-2";
    } else if (hours < 24) {
      bgGradient = "night-1";
    }
    for (let i = 0; i <= 2; i++) {
      currentList.push(props.list[i]);
    }

    const getCurrentTime = (hours) => {
      let currentTime;
      const getZero = (num) => {
        if (num >= 0 && num < 10) {
          return `0${num}`;
        } else {
          return num;
        }
      };

      if (hours >= 24) {
        currentTime = `${getZero(hours - 24)}:00`;
      } else if (hours < 0) {
        currentTime = `${getZero(hours + 24)}:00`;
      } else {
        currentTime = `${getZero(hours)}:00`;
      }

      return currentTime;
    };

    list = currentList.map((item, i) => {
      return (
        <div
          key={i}
          className={`hour-weather-item ${bgGradient}`}
          style={{ background: "inherit" }}
        >
          {getCurrentTime(
            new Date(item.dt * 1000).getUTCHours() + props.timezone / 60 / 60
          )}
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            alt="icon weather"
          />
          <p className="temp">{Math.round(item.main.temp)}°C</p>
        </div>
      );
    });
  }
  return <div className={"hours-weather-block"}>{list}</div>;
};

export default HoursWeather;
