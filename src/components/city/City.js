import "./city.css";

const City = (props) => {
  return (
    <div className={`city ${props.bgGradient}`}>
      <h2>{props.city}</h2>
      <p>
        {props.day} {props.time}
      </p>
      <div className="weather-icon">
        <img
          src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
          alt=""
        />
      </div>
      <p>
        {props.description} {props.temp}°C
      </p>
    </div>
  );
};

export default City;