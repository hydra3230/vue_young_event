import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 两个参数，
 * 1.名字，唯一性
 * 2.函数，函数内部定义token的所有状态
 * 
 * 返回值：函数
 */
export const useTokenStore = defineStore('myToken',()=>{
    
    const token = ref('');

    const setToken = (newToken)=>{
        token.value = newToken;
    }

    const removeToken = () =>{
        token.value = '';
    }

    return{
        token, setToken, removeToken
    }
},
{
    persist: true//持久化token
}
);