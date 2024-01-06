//定制请求的实例

//导入axios
import axios from "axios";
import { ElMessage } from "element-plus";
import { userTokenStore } from "@/stores/token.js";
import { routerTool } from "@/router/index.js";
//定义变量，记录前缀
//const baseURL = 'http://localhost:8080';
//跨域
const baseURL = '/api';
const axiosInstance = axios.create({baseURL})

//添加响应拦截器
axiosInstance.interceptors.response.use(
    result=>{
        if(result.data.code===0){
            return result.data;
        }
        //alert(result.data.msg?result.data.msg:'Backend server erro.')
        ElMessage.error(result.data.msg?result.data.msg:'Backend server erro.')
        return Promise.reject(result.data);//确保异步的状态开源转换成失败的状态
    },
    err=>{
        if(err.response.status===401){
            ElMessage.error('Please login first...');
            routerTool.push('/login');
        }else{
            //alert('Backend server error...');
            ElMessage.error('Backend server error...')
            return Promise.reject(err);//确保异步的状态开源转换成失败的状态
        }
        
        
    }
)

axiosInstance.interceptors.request.use(
    (config)=>{
        let tokenStore = userTokenStore();
        if(tokenStore.token){
            config.headers.Authorization=tokenStore.token;
        }
        return config;
    },
    (err)=>{
        return Promise.reject(err);
    }
)

export default axiosInstance;//导出供使用