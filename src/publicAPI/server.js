import axios from "axios"
import qs from "qs"

const Axios = axios.create({
    baseURL: "/",
    timeout: 10000,
    responseType: "json",
    withCredentials: true, //是否允许携带cookie
});

// POST传参序列化（添加请求拦截器）
Axios.interceptors.request.use(
    // 自定义config配置
    config => {
        // 在发送请求之前做的
        if (
            config.method === "post" ||
            config.method === "put" ||
            config.method === "delete"
        ) {
            if (!config.withoutQS) {
                // 要用qs进行序列化
                config.data = qs.stringify(config.data);
            }
        }
        return config;
    },
    
    // 定制error
    error => {
        alert('出错了，请查看console.log')
        console.log('错误：' + error)
        console.log('错误类型：' + error.data.error.message)
        return Promise.reject(error.data.error.message);
    }
);

// 返回状态判断（添加响应拦截器）
Axios.interceptors.response.use(
    res => {
        return res;
    },
    error =>{
        return Promise.reject();
    }
);

export default {
    install: function(Vue, Option) {
        Object.defineProperty(Vue.prototype, "$axios", { value: Axios });
    }
};