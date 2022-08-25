import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import store from '../store';

const request: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000
});

request.interceptors.request.use((config: AxiosRequestConfig) => {
  const TOKEN = store.getState().token

  console.log(TOKEN)
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
