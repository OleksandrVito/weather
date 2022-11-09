const getCitiesList = async (inputValue) => {
  const options = {
    method: "GET",
    headers: {},
  };

  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=10&lang=ua&appid=e9d5d0d4ac10e640808a8508992fd4ae`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));
  return await response;
};

export default getCitiesList;
