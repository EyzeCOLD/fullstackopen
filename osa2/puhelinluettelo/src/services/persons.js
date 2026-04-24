import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  console.log("getAll");
  return axios.get(baseUrl).then((response) => response.data);
};

const create = async (newObject) => {
  console.log("create: newObject:", newObject);
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const update = async (id, newObject) => {
  console.log("update: id:", id, "newObject:", newObject);
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const deletePerson = async (id) => {
  console.log("deletePerson: id:", id);
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, deletePerson };
