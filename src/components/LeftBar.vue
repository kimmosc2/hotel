<template>
  <el-menu
    default-active="2"
    router
    class="el-menu-vertical-demo left-body"
    @open="handleOpen"
    @close="handleClose">
    <el-menu-item index="/home">
      <i class="el-icon-discover"></i>
      <span slot="title" index="/">概览</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-office-building"></i>
        <span>订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/guest"><i class="el-icon-table-lamp"></i>开退房管理</el-menu-item>
        <el-menu-item index="/histories"><i class="el-icon-time"></i>历史记录查询</el-menu-item>
<!--        <el-menu-item index="/sysinfo">系统状态</el-menu-item>-->
<!--        <el-menu-item index="/history" disabled>收入统计汇总</el-menu-item>-->
<!--        <el-menu-item index="/guestroom">房间信息管理</el-menu-item>-->
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: 'LeftBar',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .left-body{
    width: 17%;
    height: 800px;
    float: left;
  }
</style>
