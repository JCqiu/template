import axios from "axios"
import { message } from 'ant-design-vue'
import { useRouter } from "vue-router";
import { getHeaders } from '../utils/util'
import config from '../config'
const router = useRouter();

const instance = axios.create({
    timeout: 50000 /* 设置请求超时 */,
    baseURL: config.url
});

instance.interceptors.request.use(
    config => {
        config.headers = { ...config.headers, ...getHeaders() }
        return config
    },
    error => Promise.reject(error)
);
// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        const status = response.data.code || response.status;
        const text = response.data.message || response.data.msg || response.data.error_description || '参数请求错误';
        const show = response.config.message || false
        if (status === 401) localStorage.removeItem('saber-token') //store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }));
        if (status !== 200) {
            message.error(text)
            return Promise.reject(new Error(text))
        }
        if (show) message.success(response.data.msg || '操作成功')
        return Promise.resolve(response.data.data);
    },
    error => {
        const text = error.response.data.message || error.response.data.msg || error.response.statusText || '服务器异常';
        if (error.response.status === 400) {
            message.error('参数请求错误')
            return Promise.reject(new Error(error.response.statusText))
        }
        if (error.response.status === 500) {
            message.error(text)
        }
        return Promise.reject(error)
    }
);

export default instance;
