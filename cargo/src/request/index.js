import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000
});

request.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  return response;
}, error => {
  return error;
})

export default request
