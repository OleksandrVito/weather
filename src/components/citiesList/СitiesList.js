const CitiesList = (props) => {
  const getCurrentName = (item) => {
    if (item.local_names) {
      if (item.local_names.uk) {
        if (item.state) {
          return `${item.local_names.uk}, ${item.country}, ${item.state}`;
        } else {
          return `${item.local_names.uk}, ${item.country}`;
        }
      }
    } else {
      if (item.state) {
        return `${item.name}, ${item.country},${item.state}`;
      } else {
        return `${item.name}, ${item.country}`;
      }
    }
  };

  if (props.list.length > 0) {
    let options = props.list.map((item, i) => {
      return (
        <option
          key={i}
          value={
            /[а-я]/i.test(document.querySelector("input").value)
              ? getCurrentName(item)
              : item.state
              ? `${item.name}, ${item.country}, ${item.state}`
              : `${item.name}, ${item.country}`
          }
          data-lat={item.lat}
          data-lon={item.lon}
          data-city={
            /[а-я]/i.test(document.querySelector("input").value)
              ? item.local_names
                ? item.local_names.uk
                : item.name
              : item.name
          }
        ></option>
      );
    });
    return options;
  }
};

export default CitiesList;
