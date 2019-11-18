<template>
  <el-container>
    <el-header>
      <div class="header-logo" style="line-height: 40px"><img src="../assets/logo.jpg" width="58" alt=""/></div>
      <div class="header-state">
        <span v-if="name !== ''">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link header-state-text">
                {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="c">退出登录</el-dropdown-item>
              </el-dropdown-menu>
              </span>
            </el-dropdown>
        </span>
        <span v-else>您还未登录,请登录</span>
      </div>
    </el-header>
  </el-container>
</template>

<script>
export default {
  name: 'HeaderBar',
  data () {
    return {
      name: this.$store.state.names
    }
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'a':
          alert('个人中心待做')
          break
        case 'b':
          alert('修改密码待做')
          break
        case 'c':
          console.log('退出登录')
          this.logOut()
          break
      }
    },
    logOut () {
      sessionStorage.clear()
      this.$store.commit('addRoles', {
        roles: ''
      })
      this.$store.commit('addNames', '')
      this.$message.success('退出登录成功')
      this.$router.push({ path: '/login', query: {} })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.names
    }
  },
  watch: {
    isLogin: function (val) {
      console.log(val)
      this.name = val
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    border-bottom: 1px solid #dcdfe6;
    text-align: center;
    line-height: 60px;
  }
  .header-logo{
    float: left;
    margin-left: 2%;
  }
  .header-state-text{
    color: #409EFF;
  }
  .header-state{
    float: right;
    margin-right: 3%;
  }
</style>
