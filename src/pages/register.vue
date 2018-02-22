<template>
    <div class="login__wrap">
        <div class="ms-title">商家注册</div>
        <div class="ms-login">
            <el-form :model="ruleForm" @keyup.native.enter="submitForm('ruleForm')" :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item prop="phone" label="手机号码">
                    <el-input type="tel" v-model="ruleForm.phone" placeholder="手机号码"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="checkPassword" label="确认密码">
                    <el-input type="password" placeholder="确认密码" v-model="ruleForm.checkPassword"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="verification" label="验证码">
                    <el-input class="input__verification" type="text" placeholder="验证码" v-model="ruleForm.verification"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    <el-button class="btn__code-send" :type="type" @click="sendSms">{{ sendCodeTip }}</el-button>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {sendSms, register} from 'src/api'
    export default {
        data: function () {
            let _this = this

            return {
                type: 'primary',
                sendCodeTip: '获取验证码',
                ruleForm: {
                    phone: '',
                    password: '',
                    verification: '',
                    checkPassword: ''
                },
                rules: {
                    phone: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, value, callback) => {
                                console.log(rule, value)
                                if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
                                    callback(new Error('手机号码不对'))
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    password: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, value, callback) =>{
                                if (value === '') {
                                    callback(new Error('请输入密码'));
                                }else if(value.length < 6){
                                    callback(new Error('密码长度至少6位'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    checkPassword: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, value, callback) => {
                                if (value === '') {
                                    callback(new Error('请再次输入密码'));
                                } else if (value !== this.ruleForm.password) {
                                    callback(new Error('两次输入密码不一致!'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    ],
                    verification: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.sending = false
        },
        methods: {
            sendSms() {
                if (this.sending) {
                    return
                }
                if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.ruleForm.phone))){
                    this.$notify({
                        title: '手机号码错误',
                        message: '请正确填写手机号'
                    });
                    return
                }
                this.sending = true
                let _this = this

                function _countDown() {
                    if (_this.sendCodeTip > 0) {
                        setTimeout(function () {
                            _this.sendCodeTip--
                            _countDown(_this.sendCodeTip)
                        }, 1000)
                    } else {
                        _this.sendCodeTip = '重新发送'
                        _this.type = 'primary'
                        _this.sending = false
                    }
                }

                sendSms({
                    account: this.ruleForm.phone,
                    type: 1
                }).then(function (res) {
                    if(res.data.code === 1){
                        _this.sendCodeTip = 60
                        _this.type = 'info'
                        _countDown()
                    }else{
                        _this.sending = false
                        _this.$notify.error({
                            title: '错误',
                            message: res.data.msg
                        });
                    }
                })
            },
            submitForm(formName) {
                const _this = this;
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('ms_username', _this.ruleForm.phone);
                        register({
                            account: _this.ruleForm.phone,
                            password: md5(md5(_this.ruleForm.password)),
                            code: _this.ruleForm.verification
                        }).then(function (res) {
                            if(res.data.code === window.config.STATE_OK){
                                _this.$router.push('/home');
                            }else{
                                _this.$notify.error({
                                    title: '错误',
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

<style scoped>
    .btn__code-send {
        width: 102px;
        text-align: center;
    }

    .input__verification {
        width: 100px;
    }

    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;

    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }
</style>
