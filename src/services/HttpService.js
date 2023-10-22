import axios from "axios";
import Constant from "../util/constant";

const http = axios.create({
  baseURL: Constant.API_BASE_URL,
  headers: { "Content-type": "application/json" }
});

// const token = localStorage.getItem('token');
// if (token) {
//   // console.log("has token, setting to default header...")
//   http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

const requestInterceptor = (config, token) => {
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete config.headers['Authorization'];
  }
  return config;
};

// when use refresh browser, the interceptor still works
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  return requestInterceptor(config, token);
}, (error) => {
  return Promise.reject(error);
});

http.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    window.location = '/logout';
  }
  return Promise.reject(error);
});

const setAuthorizationHeader = (token) => {
  // if (token) {
  //   http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  // } else {
  //   delete http.defaults.headers.common['Authorization'];
  // }
  http.interceptors.request.use((config) => {
    return requestInterceptor(config, token);
  }, (error) => {
    return Promise.reject(error);
  });
};

export { setAuthorizationHeader };

export default http;