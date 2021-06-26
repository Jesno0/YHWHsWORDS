<template>
  <el-form :model="form" :rules="rules" ref="form" label-width="110px">
    <el-form-item label="头像" prop="avatar">
        <el-upload :action="handleUploadAvatar" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="handleBeforeUploadAvatar">
            <img v-if="imageUrl" :src="form.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>
    <el-form-item label="登录名" prop="loginName">
        <el-input v-model="form.loginName" placeholder="请输入登录账号"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="nicName">
        <el-input v-model="form.nicName" placeholder="请输入昵称"></el-input>
    </el-form-item>
    <el-form-item label="打卡群组" prop="punchInGroup">
        <el-select v-model="form.punchInGroup" placeholder="请选择群组">
          <el-option label="群组一" value="1"></el-option>
          <el-option label="群组二" value="2"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="邮箱可用于找回密码"></el-input>
    </el-form-item>
    <el-form-item label="电话号码" prop="phone">
        <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="原密码" prop="phone">
        <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="phone">
        <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="phone">
        <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('form')">修改</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {ApiCheckPassword,ApiEditProfile} from '../../js/Api'

export default {
  name: 'Profile',
  data() {
    return {
      form: {
          avatar: "",
          loginName: "",
          nicName: "",
          email: "",
          phone: "",
          punchInGroup: "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
      },
      rules: {
          loginName: [
            { required: true, message: '登录名为必须', trigger: 'blur' },
            { min: 2, max: 20, message: '登录名在2-20个字符之间', trigger: 'blur' }
          ],
          nicName: [
            { required: true, message: '昵称为必须', trigger: 'blur' },
            { min: 2, max: 20, message: '昵称在2-20个字符之间', trigger: 'blur' }
          ],
          email: [
            {pattern: /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/, message: '请输入正确的邮箱', trigger: 'blur'}
          ],
          phone: [
            {pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur'}
          ],
          oldPassword: [
            {pattern: /^[a-zA-Z]\w{5,17}$/, message: '密码要以字母开头至少6位的字符', trigger: 'blur'}
          ],
          newPassword: [
            {pattern: /^[a-zA-Z]\w{5,17}$/, message: '密码要以字母开头至少6位的字符', trigger: 'blur'}
          ]
        }   
    }
  },
  async mounted () {
    //TODO: 1. 填入用户数据 2. 打卡的群组
  },
  methods: {
      async submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
            if (!valid) return false;
            const {oldPassword, newPassword, confirmPassword} = this.form;
            if(oldPassword) {
                const isCheck = await ApiCheckPassword(this.form.oldPassword);
                if(!isCheck) return this.$toast("原登录密码不正确");
            }
            if(newPassword || confirmPassword) {
                if(!oldPassword) return this.$toast("请输入原登录密码");
                if(newPassword !== confirmPassword) return this.$toast("两次密码不正确");
            }

            await ApiEditProfile(this.form);
            this.$toast("修改成功！");
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleUploadAvatar(e) {
          console.log(e);
      },
      handleAvatarSuccess(e) {

      }
  }
}
</script>

<style scoped>
.el-form {
  margin-right: 10px;
}
.el-form-item {
  margin-bottom: 5px;
}
.el-form-item /deep/ .el-input,
.el-form-item /deep/ .el-form-item__content {
  font-size: 18px;
}
.el-form-item /deep/ .el-form-item__label {
  font-size: 18px;
}
</style>
<style>
.el-select-dropdown /deep/ .el-select-dropdown__item {
  font-size: 18px;
}
</style>
