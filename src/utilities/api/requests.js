import axios from 'axios';
import { auth } from '../auth';

const makeBaseRequest = () => {
  return axios.create({
    baseURL: 'https://api.if-eth.com/',
    headers: {'Authorization': `Bearer ${auth.getAccessToken()}`}
  });
};

const fetchWithAuth = (path) => {
  const baseRequest = makeBaseRequest();
  return baseRequest.get(path).then(response => (response.data));
};

const createWithAuth = (path, data) => {
  const baseRequest = makeBaseRequest();
  return baseRequest.post(path, data).then(response => (response.data));
};

export { fetchWithAuth, createWithAuth };
