<template>
  <el-card class="box-card" shadow="hover">
    <center>
      <h1>华通宾馆</h1>
    </center>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" hide-required-asterisk>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="login-button" :loading="subLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 登录API
      loginAPI: '/api/v1/guest-login',
      // 加载动画
      subLoading: false,
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在3 到 16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          this.toLogin()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toLogin () {
      // 登录加载动画
      this.subLoading = true
      let self = this
      this.$axios.post(self.loginAPI, {
        mid: self.ruleForm.name,
        password: self.ruleForm.pass
      })
        .then(function (response) {
          let status = response.data.status
          if (status === 0) {
            self.$message.success('登陆成功,即将跳转至详情页')
            self.$store.commit('addRoles', {
              roles: 1
            })
            sessionStorage.setItem('hotel_roles', '1')
            sessionStorage.setItem('hotel_names', response.data.data.mname)
            self.$store.state.names = response.data.data.mname
            self.$router.push({ path: '/guest', query: {} })
          } else {
            self.subLoading = false
            self.$message.error(response.data.msg)
          }
        })
        .catch(function (err) {
          self.subLoading = false
          console.log(err)
          self.$message.warning('登陆失败,请检查您的网络连接')
        })
    }
  }
}
</script>

<style scoped>
  .login-button{
    width: 80%;
  }
  .box-card {
    padding: 30px;
    margin: 0px auto;
    margin-top: 200px;
    width: 480px;
  }

</style>
