import axios from "axios";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
});
// request interceptor
service.interceptors.request.use(
  config => {
    //  doSomething
    return config;
  },
  error => {
    // do something with request error
    return Promise.reject(error);
  }
);
// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data && response.data.errno === 0) {
      return Promise.resolve(response);
    } else {
      //  处理 由后端抛出的错误
      return Promise.reject(response);
    }
  },
  async error => {
    //  由网络或者服务器抛出的错误
    return Promise.reject(error);
  }
);

export default service;
