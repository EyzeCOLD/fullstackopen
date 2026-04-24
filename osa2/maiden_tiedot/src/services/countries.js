import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = async () => {
  const result = await axios.get(baseUrl + "/all");
  return result.data;
};

export default { getAll };
