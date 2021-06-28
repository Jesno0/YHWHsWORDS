<template>
  <el-dialog :visible.sync="visible" :show-close="false" :before-close="handleCancel">
    <el-tabs v-model="currentCatalogueName" type="border-card">
      <el-tab-pane label="登录" name="1">
        <el-form :model="form">
          <el-form-item label="账号">
              <el-input placeholder="请输入账号" v-model="form.account"/>
          </el-form-item>
          <el-form-item label="密码">
              <el-input placeholder="请输入密码" v-model="form.password" show-password/>
          </el-form-item>
        </el-form>
        <div class="footer">
            <el-button type="primary" @click="handleLogin">登 录</el-button>
            <el-button @click="handleCancel">取 消</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="注册" name="2">
        <el-form :model="form">
          <el-form-item label="账号">
              <el-input placeholder="请输入账号" v-model="form.account"/>
          </el-form-item>
          <el-form-item label="密码">
              <el-input placeholder="请输入密码" v-model="form.password" show-password/>
          </el-form-item>
          <el-form-item label="确认密码">
              <el-input placeholder="请输入密码" v-model="form.passwordConfirm" show-password/>
          </el-form-item>
        </el-form>
        <div class="footer">
            <el-button type="primary" @click="handleRegister">注 册</el-button>
            <el-button @click="handleCancel">取 消</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="3">
        <el-form :model="form">
          <el-form-item label="账号">
              <el-input placeholder="请输入账号" v-model="form.account"/>
          </el-form-item>
          <el-form-item label="邮箱">
              <el-input placeholder="用于接收重置密码的邮箱" v-model="form.email"/>
          </el-form-item>
        </el-form>
        <div class="footer">
            <el-button type="primary" @click="handleResetPassword">发 送</el-button>
            <el-button @click="handleCancel">返 回</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import {ApiLogin,ApiRegister,ApiResetPassword,ApiCheckLogin} from '@/js/Api'

export default {
  name: 'Auth',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    index: {
      type: String,
      default: "1"
    }
  },
  watch: {
    index(newV) {
      this.currentCatalogueName = newV;
    }
  },
  data () {
    return {
      currentCatalogueName: "1",
      form: {
        account: "",
        password: "",
        passwordConfirm: "",
        email: ""
      }
    }
  },
  async mounted () {
    const isLogin = await ApiCheckLogin();
    if(!isLogin) this.currentCatalogueName = "1";
    else this.currentCatalogueName = "3";
  },
  methods: {
    handleCancel () {
      this.$emit('update:visible', false);
    },
    async handleLogin () {
      const {account,password} = this.form;
      if(!password || !account) return this.$message.error('请输入账号和密码');
      const user = await ApiLogin(account,password);
      // this.$session.set("user",user);
      // console.log(this.$session.get("user"));

      this.$emit('login');
      this.$emit('update:visible', false);
    },
    async handleRegister () {
      
      const {account,password,passwordConfirm} = this.form;
      if(!account || !password || (password != passwordConfirm)) return this.$message.error('请输入账号和相同密码');
      await ApiRegister(account,password);
      this.form.password = "";
      this.form.passwordConfirm = "";
      await this.$message.success("注册成功,请登录");
      this.currentCatalogueName = "1";
    },
    async handleResetPassword () {
      const {account,email} = this.form;
      if(!account || !email) return this.$message.error('请输入账号和邮箱');
      await ApiResetPassword(account,email);
    }
  }
}
</script>

<style scoped>
.el-dialog__wrapper /deep/ .el-dialog {
  border-radius: 20px;
  width: 80%;
}
.el-dialog__wrapper /deep/ .el-dialog__header,
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding: 0px;
  border-radius: 20px;
}
.el-dialog__wrapper /deep/ .el-tabs,
.el-dialog__wrapper /deep/ .el-tabs__nav-scroll,
.el-dialog__wrapper /deep/ .el-tabs__header {
  border-radius: 20px;
}
.el-dialog__wrapper /deep/ .el-tabs__header .el-tabs__item {
  font-size: 18px;
}
.el-dialog__wrapper /deep/ .el-tabs__content {
  padding: 20px;
}
.el-dialog__wrapper /deep/ .el-tabs__content .el-form-item {
  margin-bottom: 0;
}
.el-dialog__wrapper /deep/ .el-tabs__content .el-form-item__label{
  font-size: 18px;
}
.el-dialog__wrapper /deep/ .el-tabs__content .el-input{
  font-size: 18px;
}
.footer {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.footer .el-button {
  font-size: 18px;
}
</style>
