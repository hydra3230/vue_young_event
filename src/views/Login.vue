<script setup>
import { User, Lock } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { ElMessage } from "element-plus";
//控制注册和登录表单的显示
const isRegister = ref(false)

//定义数据模型
const registerData = ref({
    username:'',
    password:'',
    rePassword:''
})

//定义密码校验函数
const checkRepassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Pls check your password!'));
        } else if (value !== registerData.value.password) {
          callback(new Error('Pls ensure re-password = password!'));
        } else {
          callback();
        }
      }

//定义校验规则
const rules={
    username:[{
        required:true, message: 'Pls input valid username!', trigger: 'blur'
    },
    {
        min:5, max:16, message: 'Pls input valid username!', trigger: 'blur'
    }
    ],
    password:[{
        required:true, message: 'Pls input valid password!', trigger: 'blur'
    },
    {
        min:5, max:16, message: 'Pls input valid password!', trigger: 'blur'
    }],
    rePassword:[
        {validator: checkRepassword, trigger:'blur'}
    ]
}

import { useRouter } from "vue-router";
const router = useRouter()

import {userRegisterService, userLoginService} from "@/api/user.js";
import { useTokenStore } from "@/stores/token.js";
const register = async()=>{

    let result = await userRegisterService(registerData.value);
    // if(result.code === 0){
    //     alert(result.msg?result.msg:'Regist success!');
    // }else{
    //     alert('Regist failed.')
    // }
    //alert(result.msg?result.msg:'Regist success!');
    ElMessage.success(result.msg?result.msg:'Regist success!');
    router.push('/login');
}

const login = async() =>{
    let result = await userLoginService(registerData.value);
    // if(result.code === 0){
    //     alert(result.msg?result.msg:'Login success!');
    // }else{
    //     alert('Login failed.')
    // }
    //alert(result.msg?result.msg:'Login success!');
    ElMessage.success(result.msg?result.msg:'Login success!');
    //存token
    useTokenStore.setToken(result.data);
    router.push('/');
}

//清空绑定数据
const clearRegisterData=()=>{
    registerData.value={
        username:'',
        password:'',
        rePassword:''
    }
}

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
        <!--注册表单-->
        <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
            <el-form-item>
                <h1 style="color: #fff;">Register</h1>
            </el-form-item>
            <el-form-item prop="username">
                <el-input :prefix-icon="User" placeholder="Pls input user name." v-model="registerData.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input :prefix-icon="Lock" placeholder="Pls input user pwd." v-model="registerData.password" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="rePassword">
                <el-input :prefix-icon="Lock" placeholder="Pls input user pwd again." v-model="registerData.rePassword" type="password"></el-input>
            </el-form-item>
            <!--注册按钮-->
            <el-form-item>
                <el-button class="button" type="primary" auto-insert-space @click="register">Register</el-button>
            </el-form-item>
            <el-form-item class="flex">
                <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData()">...Back</el-link>
            </el-form-item>
        </el-form>
        <!--//登录表单-->
        <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
            <el-form-item>
                <h1 style="color: #fff;">Login</h1>
            </el-form-item>
            <el-form-item prop="username">
                <el-input :prefix-icon="User" placeholder="Pls input user name." v-model="registerData.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input name="password" :prefix-icon="Lock" type="password" placeholder="Pls input user pwd." v-model="registerData.password"></el-input>
            </el-form-item>
            <el-form-item class="flex">
                <div class="flex">
                    <el-checkbox>Remember me</el-checkbox>
                    <br>
                    <el-link type="primary" :underline="false">Forget password?</el-link>
                </div>
            </el-form-item>
            <!--登录按钮-->
            <el-form-item>
                <el-button class="button" type="primary" auto-insert-space @click="login">Login</el-button>
            </el-form-item>
            <el-form-item class="flex">
                <el-link type="info" :underline="false" @click="isRegister = true;clearRegisterData()">Register...</el-link>
            </el-form-item>
        </el-form>
    </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
//样式
.login-page{
    height: 100vh;
    width: 100vh;
    background-color: #fff;
    background: url('@/assets/background.png') repeat left center / cover;
    border-radius: 0 20px 20 px 0;
    

    .form{
        display: flex;
        flex-direction:column;
        justify-content: center;
        user-select:none;
        float: right;

        .title{
            margin:0 auto;
        }

        .button{
            width:100%;
        }

        .flex{
            width:100%;
            display: flex;
            justify-content: space-between;
        }

    }
}
</style>
