import axios from 'axios'

// axios.defaults.baseURL = 'http://192.168.0.109:8082';
// axios.defaults.baseURL = process.env.API;//'/api'
// axios.defaults.baseURL = 'http://api.klgj.top';//'/api'
axios.defaults.baseURL = 'http://47.105.185.81:8899';//'/api'

// axios.defaults.baseURL ="http://www.geechori.com:8899";
axios.defaults.headers.post["Content-type"] = "application/x-www-form-urlencoded;charset=UTF-8"

// response.setHeader("Access-Control-Allow-Origin", "*");
axios.interceptors.request.use(function (config) {

    config.params = {
        ...config.params,
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
}
)

export default axios;
