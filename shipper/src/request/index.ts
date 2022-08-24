import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const request: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000
});

request.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log(config)
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error)
})

request.interceptors.response.use((res: AxiosResponse) => {
  return res;
}, (error: AxiosError) => {
  return error;
})

export default request
