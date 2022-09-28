import axios from "axios";

const HOST_NAME = window.location.hostname

let API_BASE_URL = ""

if (HOST_NAME === "localhost" || HOST_NAME === "127.0.0.1") {
  API_BASE_URL = process.env.REACT_APP_BASE_URL_LOCAL
} else if (HOST_NAME === "192.168.0.113") {
  API_BASE_URL = process.env.REACT_APP_BASE_URL_DEV
}

const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
);

export default request;
