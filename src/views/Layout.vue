<script setup>
    import { Management, Promotion, UserFilled, User, Crop, EditPen, SwitchButton, CaretBottom } from "@element-plus/icons-vue";
    import avatar from "@/assets/default_male.png";
</script>

<template>
    <el-container class="layout-container">
        <!--左侧菜单-->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff" router>
                <el-menu-item index="/article/manage">
                    <el-icon>
                        <Promotion/>
                    </el-icon>
                    <span>Management</span>
                </el-menu-item>
                <el-menu-item index="/article/category">
                    <el-icon>
                        <Management/>
                    </el-icon>
                    <span>Category</span>
                </el-menu-item>
                <el-sub-menu>
                    <template #title>
                        <el-icon>
                            <UserFilled/>
                        </el-icon>
                        <span>Personal</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User/>
                        </el-icon>
                        <span>Basic Info</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Crop/>
                        </el-icon>
                        <span>Change Avatar</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetpassword">
                        <el-icon>
                            <EditPen/>
                        </el-icon>
                        <span>Change Password</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!--右侧主区域-->
        <el-container>
            <!--头部区域-->
            <el-header>
                <div>PEGA Team: <strong>Zhang Yang</strong></div>
                <el-dropdown placement="bottom-end">
                    <span class="el-dropdown__box">
                        <el-avatar :src="avatar"/>
                        <el-icon>
                            <CaretBottom/>
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="profile" :icon="User">Basic Info</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">Change Avatar</el-dropdown-item>
                            <el-dropdown-item command="password" :icon="EditPen">Change Password</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">Log Out</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <el-main>
                <div style="width: auto; height: auto; border: 1px solid red;">
                    <router-view></router-view>
                </div>
            </el-main>
            <el-footer>PEGA Project Management System ©2024 Created by ZhangYang</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
    .layout-container{
        height: 100vh;
        width: 100vw;
        .el-aside{
            background-color: #232323;
            
            &__logo{
                height: 120px;
                background: url('@/assets/PMS Logo.png') no-repeat center / 120px auto;
            }

            .el-menu{
                border-right: none;
            }
        }

        .el-header{
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .el-dropdown__box{
                display: flex;
                align-items: center;
                .el-icon{
                    color: #999;
                    margin-left: 10px;
                }
                &:active,
                &:focus{
                    outline: none;
                }
            }
        }

        .el-footer{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #666;
        }
    }
</style>