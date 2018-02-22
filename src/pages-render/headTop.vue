<template>
    <div class="header_container">

        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <template v-if="breadcrumb.length">
                <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{item}}</el-breadcrumb-item>
            </template>
        </el-breadcrumb>
        <el-dropdown @command="handleCommand" menu-align='start' trigger="click">
            <div class="account">{{ username }}<i class="el-icon-arrow-down el-icon--right"></i></div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">首页</el-dropdown-item>
                <el-dropdown-item command="singout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import { logout } from 'src/api'
    import {mapActions, mapState} from 'vuex'

    export default {
        data(){
            return {
                account: 'admin'
            }
        },
        created(){

        },
        computed: {
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.account;
            },
            breadcrumb() {
                return this.$store.getters.breadcrumb
            }
        },
        methods: {
            handleCommand(command) {
                if (command == 'home') {
                    this.$router.push('/home');
                } else if (command == 'singout') {
                    logout({}).then(function (res) {
                        localStorage.removeItem('ms_username')
                        this.$message({
                            type: 'success',
                            message: '退出成功'
                        });
                        this.$router.push('/login');
                    })

                }
            }
        }
    }
</script>

<style lang="less">
    @import '../common/less/mixin.less';

    .header_container {
        position: absolute;
        top: 0;
        left: 250px;
        right: 0;
        background-color: #EFF2F7;
        height: 60px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .account{
        .wh(120px, 60px);
        line-height: 60px;
    }
    .avator{
        .wh(36px, 36px);
        border-radius: 50%;
        margin-right: 37px;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
