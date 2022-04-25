import axios from 'axios';

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export default api;
