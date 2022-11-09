import { useState } from "react";
import CitiesList from "../citiesList/СitiesList";
import getCitiesList from "../../service/getCitiesList";
import "./inputSearch.css";

const InputSearch = (props) => {
  const [list, setList] = useState([]);
  const [colorButton, setColorButton] = useState("#cdd5c1");
  const [colorBorder, setColorBorder] = useState("#cdd5c1");

  const checkCity = (options, value) => {
    let arr = [...options];
    let lat;
    let lon;

    arr.find((option) => {
      if (option.value === value) {
        lat = option.dataset.lat;
        lon = option.dataset.lon;
        localStorage.setItem("lat", lat);
        localStorage.setItem("lon", lon);
      }
    });
    return [lat, lon];
  };

  const check = (options, value) => {
    let arr = [...options];
    let check = false;

    arr.find((option) => {
      if (option.value === value) {
        return (check = true);
      }
    });
    return check;
  };

  return (
    <form>
      <input
        style={{ borderColor: colorBorder }}
        type="search"
        placeholder="...search city here"
        list="cities"
        onChange={(event) => {
          getCitiesList(event.target.value).then((response) => {
            setList(response);
            // console.log("new response", response);
          });
          if (check(document.querySelectorAll("option"), event.target.value)) {
            setColorBorder("#0d770dcc");
            setColorButton("#0d770dcc");
          } else {
            setColorBorder("#cdd5c1");
            setColorButton("#cdd5c1");
          }
        }}
      />
      <button
        style={{ color: colorButton }}
        onClick={(event) => {
          event.preventDefault();
          if (
            check(
              document.querySelectorAll("option"),
              document.querySelector("input").value
            )
          ) {
            setColorBorder("#0d770dcc");
            setColorButton("#0d770dcc");
            props.setCoordinates(
              checkCity(
                document.querySelectorAll("option"),
                document.querySelector("input").value
              )
            );
          } else {
            setColorBorder("#c43b3b");
            setColorButton("#cdd5c1");
          }

          if (/[а-я]/i.test(document.querySelector("input").value)) {
            props.setLang("ua");
            localStorage.setItem("lang", "ua");
          } else {
            props.setLang("en");
            localStorage.setItem("lang", "en");
          }
        }}
      >
        &#10004;
      </button>
      <datalist id="cities">
        <CitiesList list={list} />
      </datalist>
    </form>
  );
};

export default InputSearch;
