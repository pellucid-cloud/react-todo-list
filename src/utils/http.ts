import axios from 'axios';
import {message} from "antd";

export const baseURL = DotEnv.APP_SERVER_URL + DotEnv.APP_BASE_API;
export const REQUEST_SUFFIX = DotEnv.REQUEST_SUFFIX

const $http = axios.create({
  baseURL,
  timeout: DotEnv.REQUEST_TIMEOUT
})

$http.interceptors.request.use(config => {
  config.url += `.${REQUEST_SUFFIX}`
  return config
}, (error) => {
  return Promise.reject(error);
})

$http.interceptors.response.use(response => {
  if(response.data.code != 0){
    return Promise.reject(response.data)
  }
  return Promise.resolve(response.data);
}, function (error) {
  return Promise.reject(error);
});
export default $http;
