const getCyrrentTime = (timezone, lang) => {
  let currentTime;
  let currenDay;
  let currenHour;
  const dayOfWeek = new Date().getUTCDay();
  const hours = new Date().getUTCHours() + timezone / 60 / 60;
  const minutes = new Date().getMinutes();

  //функція для добавлення нулів
  const getZero = (num) => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  let daysArr;
  lang === "en"
    ? (daysArr = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ])
    : (daysArr = [
        "Неділя",
        "Понеділок",
        "Вівторок",
        "Середа",
        "Четвер",
        "П'ятниця",
        "Субота",
      ]);

  if (hours >= 24) {
    currentTime = `${getZero(hours - 24)}:${getZero(minutes)}`;
    dayOfWeek + 1 < 7
      ? (currenDay = daysArr[dayOfWeek + 1])
      : (currenDay = daysArr[0]);
    currenHour = getZero(hours - 24);
  } else if (hours < 0) {
    currentTime = `${getZero(hours + 24)}:${getZero(minutes)}`;
    dayOfWeek - 1 < 0
      ? (currenDay = daysArr[6])
      : (currenDay = daysArr[dayOfWeek - 1]);
    currenHour = getZero(hours + 24);
  } else {
    currentTime = `${getZero(hours)}:${getZero(minutes)}`;
    currenDay = daysArr[dayOfWeek];
    currenHour = getZero(hours);
  }

  return { currentTime, currenDay, currenHour };
};

export default getCyrrentTime;
