import axios from "axios"; 
const ENV_KEY = '7785b798e488b79f67405e3926377fe4'
export const getWeather = (country) => axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${ENV_KEY}`);
