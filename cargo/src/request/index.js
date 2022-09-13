import axios from "axios";
import store from "src/store";
import { persistor } from "src/index"; 

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000
});

request.interceptors.request.use(config => {
  const TOKEN = store.getState().token;

  config.headers = {
    "Authorization": `Bearer ${TOKEN.accessToken}`
  }

  return config;
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.request.status === 403) {
    persistor.purge()
    .then(() => {
      window.location.href = "/LogIn"
      alert("로그인 시간이 만료되었습니다.")
    })
  }
  return error;
})

export default request
