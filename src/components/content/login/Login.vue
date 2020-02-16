<template>
  <div id="login">
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
        <div class="tel" v-show="reg_method">
          <el-form-item prop="tel">
            <el-input v-model="ruleForm.tel" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </div>

        <div class="email" v-show="!reg_method">
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </div>

        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%;">登录</el-button>
          <p class="link" @click="changEmail" style="float: left" v-show="reg_method">邮箱登录</p>
          <p class="link" @click="changTel" style="float: left" v-show="!reg_method">手机登录</p>
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
    name: "Login",
    components:{
      TabControl,
    },
    data() {

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
          pass: "",
          checkPass: "",
          tel: "",
          email: "",
        },
        rules: {
          pass: [{validator: validatePass, trigger: 'change'}],
          checkPass: [{validator: validatePass2, trigger: 'change'}],
          tel: [{validator: checkTel, trigger: 'change'}],
          email: [{validator: checkemail, trigger: 'change'}],
        },
        reg_method: true, //登录方式控制
      }
    },
    methods: {
      // <!--提交登录-->
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            setTimeout(() => {
              alert('登录成功')
            }, 400);
          } else {
            console.log("error submit!!");
            return false;
          }
        })
      },

      // <!--切换邮箱登录-->
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

  .demo-ruleForm{
    margin: 0 auto;
    position: absolute;
    top: 30%; left: 0; bottom: 0; right: 0;
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
</style>
