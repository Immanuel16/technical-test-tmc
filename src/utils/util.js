import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const convertDate = (date, format = dateFormat.display) =>
  dayjs(date).format(format);

const convertDateToTimezone = (date) => {
  dayjs.extend(utc);
  return dayjs(convertDate(date, dateFormat.input)).utc(true).format();
};

const dateFormat = {
  display: "DD/MM/YYYY",
  input: "YYYY-MM-DD HH:mm",
  value: "YYYY-MM-DD",
};

const updateStorage = (name, value) =>
  JSON.stringify(localStorage.setItem(name, value));
const getStorage = (name) => JSON.parse(localStorage.getItem(name));

export {
  convertDate,
  convertDateToTimezone,
  dateFormat,
  getStorage,
  updateStorage,
};
