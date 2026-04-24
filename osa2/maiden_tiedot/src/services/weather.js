import axios from "axios";

const getWeather = async (latlng) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
  const result = await axios.get(url);
  console.log("getWeather:", result.data);
  return result.data;
};

export default { getWeather };
