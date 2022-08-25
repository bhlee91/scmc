import axios from "axios";
import store from "src/store";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000
});

request.interceptors.request.use(config => {
  const TOKEN = store.getState().token
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
