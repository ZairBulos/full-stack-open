import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = () => {
  return axios.get(baseUrl).then(res => res.data);
};

export const create = (object) => {
  return axios.post(baseUrl, object).then(res => res.data);
};

export const update = (object) => {
  return axios.put(`${baseUrl}/${object.id}`, object)
    .then(res => res.data);
};