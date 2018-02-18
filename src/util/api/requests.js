import axios from 'axios';
import Auth from '../auth';

const makeBaseRequest = () =>
  axios.create({
    baseURL: 'https://api.if-eth.com/',
    headers: {
      'Authorization': `Bearer ${Auth.getIdToken()}`
    }
  });

const fetchWithAuth = (path) => {
  return makeBaseRequest().get(path)
    .then(response => response.data);
};

const createWithAuth = (path, data) => {
  return makeBaseRequest()
    .post(path, data)
    .then(response => response.data);
};

export { fetchWithAuth, createWithAuth };
