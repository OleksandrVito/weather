const getWeather = async (coordinates, lang) => {
  const options = {
    method: "GET",
    headers: {},
  };

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&lang=${lang}&appid=e9d5d0d4ac10e640808a8508992fd4ae`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));
  return await response;
};

export default getWeather;
