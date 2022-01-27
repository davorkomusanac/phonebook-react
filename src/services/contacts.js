import axios from "axios";
const baseUrl = "/api/contacts";

const getAllContacts = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createContact = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((reponse) => reponse.data);
};

const removeContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const updateContact = (personToBeUpdated) => {
  const request = axios.put(
    `${baseUrl}/${personToBeUpdated.id}`,
    personToBeUpdated
  );
  return request.then((response) => response.data);
};

const phoneService = {
  getAllContacts,
  createContact,
  removeContact,
  updateContact,
};

export default phoneService;
