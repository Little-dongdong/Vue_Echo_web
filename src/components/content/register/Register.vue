<template>
  <div id="register">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <tab-control :titles="['登录', '注册']" class="tab-control" @tabClick="tabClick"></tab-control>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0"
        class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <div class="tel" v-show="reg_method">
          <el-form-item prop="tel">
            <el-input v-model="ruleForm.tel" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="telcode" class="code">
            <el-input v-model="ruleForm.telcode" placeholder="短信验证码"></el-input>
            <el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>
          </el-form-item>
        </div>

        <div class="email" v-show="!reg_method">
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="telcode" class="code">
            <el-input v-model="ruleForm.telcode" placeholder="邮箱验证码"></el-input>
            <el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>
          </el-form-item>
        </div>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%;">注册</el-button>
          <p class="link" @click="changEmail" style="float: left" v-show="reg_method">邮箱注册</p>
          <p class="link" @click="changTel" style="float: left" v-show="!reg_method">手机注册</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  //禁止滚动
  document.getElementsByTagName("body")[0].style = "overflow: hidden;";

  import TabControl from "@/components/common/tabControl/TabControl";


  export default {
    name: "Register",
    components:{
      TabControl,
    },
    data() {
      // <!--验证用户名是否合法-->
      let checkUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else if (!this.checkUsername(value)) {
          callback(new Error('手机号码不合法'))
        } else {
          callback()
        }
      }

      // <!--验证手机号是否合法-->
      let checkTel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else if (!this.checkMobile(value)) {
          callback(new Error('手机号码不合法'))
        } else {
          callback()
        }
      }
      //  <!--验证码是否为空-->
      let checktelcode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机验证码'))
        } else {
          callback()
        }
      }
      // <!--验证邮箱是否合法-->
      let checkemail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'))
        } else if (!this.checkEmail(value)) {
          callback(new Error('邮箱不合法'))
        } else {
          callback()
        }
      }
      //  <!--验证码是否为空-->
      let checkemailcode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱验证码'))
        } else {
          callback()
        }
      }
      // <!--验证密码-->
      let validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"))
        } else {
          if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("checkPass");
          }
          callback()
        }
      }
      // <!--二次验证密码-->
      let validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: "",
          pass: "",
          checkPass: "",
          tel: "",
          telcode: "",
          email: "",
          emailcode: "",
        },
        rules: {
          username: [{validator: checkUser, trigger: 'change'}],
          pass: [{validator: validatePass, trigger: 'change'}],
          checkPass: [{validator: validatePass2, trigger: 'change'}],
          tel: [{validator: checkTel, trigger: 'change'}],
          telcode: [{validator: checktelcode, trigger: 'change'}],
          email: [{validator: checkemail, trigger: 'change'}],
          emailcode: [{validator: checkemailcode, trigger: 'change'}],
        },
        buttonText: '发送验证码',
        isDisabled: false, // 是否禁止点击发送验证码按钮
        flag: true,
        reg_method: true, //注册方式控制
      }
    },
    methods: {
      // <!--发送验证码-->
      sendCode() {
        let tel = this.ruleForm.tel
        if (this.checkMobile(tel)) {
          console.log(tel)
          let time = 60
          this.buttonText = '已发送'
          this.isDisabled = true
          if (this.flag) {
            this.flag = false;
            let timer = setInterval(() => {
              time--;
              this.buttonText = time + ' 秒'
              if (time === 0) {
                clearInterval(timer);
                this.buttonText = '重新获取'
                this.isDisabled = false
                this.flag = true;
              }
            }, 1000)
          }
        }
      },
      // <!--提交注册-->
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            setTimeout(() => {
              alert('注册成功')
            }, 400);
          } else {
            console.log("error submit!!");
            return false;
          }
        })
      },

      // <!--切换邮箱注册-->
      changEmail() {
        this.reg_method = false
      },

      changTel() {
        this.reg_method = true
      },

      // <!--注册登录切换-->
      tabClick(index) {
        if (index == 0){
          this.$router.push({
            path: "/login"
          });
        } else {
          this.$router.push({
            path: "/register"
          })
        }

      },

      // 验证用户名
      checkUsername(str) {
        let re = /^([u4e00-u9fa5·s]{1,20}|[a-zA-Z.s]{1,20})$ /
        if (re.test(str)) {
          return true;
        } else {
          return false;
        }
      },

      // 验证手机号
      checkMobile(str) {
        let re = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
        if (re.test(str)) {
          return true;
        } else {
          return false;
        }
      },

      // 验证邮箱
      checkEmail(str) {
        let re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (re.test(str)) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
</script>

<style scoped>
  .tab-control{

  }


  .box-card {
    width: 400px;
    margin: auto;
    position: absolute;
    top: 15%;
    left: 0;
    bottom: 15%;
    right: 0;
    border-radius: 10px; /*圆角*/
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .title {
    font-size: 26px;
    line-height: 50px;
    font-weight: bold;
    margin: 10px;
    text-align: center;
  }

  .el-form-item {
    margin: 0 10% 5% 10%;
    width: 80%;
  }

  .link {
    margin-top: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #1ab2ff;
    cursor: pointer;
    float: right;
  }

  .link:hover {
    color: #2c2fd6;
  }

  .code >>> .el-form-item__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .code button {
    margin-left: 20px;
    width: 140px;
    text-align: center;
  }
</style>
