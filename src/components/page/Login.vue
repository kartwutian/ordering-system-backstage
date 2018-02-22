<template>
    <div class="login__wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
                <el-form-item prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <div class="tips">
                    <div class="tips__register"  @click="toRegister"><a href="javascript:;">注册</a></div>
                    <div class="tips__password"><a href="javascript:;">忘记密码</a></div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { login } from 'src/api'
    export default {
        data: function(){
            return {
                ruleForm: {
                    phone: '',
                    password: ''
                },
                rules: {
                    phone: [
                        {
                            required: true,
                            validator: this.phoneValidator,
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            validator: this.passwordValidator,
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            phoneValidator: (rule, value, callback) => {
                if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
                    callback(new Error('手机号码不对'))
                } else {
                    callback();
                }
            },
            passwordValidator: (rule, value, callback) =>{
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else if(value.length < 6){
                    callback(new Error('密码长度至少6位'));
                } else {
                    callback();
                }
            },
            toRegister() {
                this.$router.push('/register')
            },
            submitForm(formName) {
                const _this = this;
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('ms_username',_this.ruleForm.phone);
                        login({
                            account: this.ruleForm.phone,
                            password: md5(md5(this.ruleForm.password))
                        }).then(function (res) {
                            if(res.data.code === 1){
                                _this.$router.push('/home');
                            }else{
                                _this.$notify.error({
                                    title: '登陆错误',
                                    message: res.data.msg
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="less">

</style>
