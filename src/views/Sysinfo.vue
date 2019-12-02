<template>
  <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
</template>

<script>
export default {
  name: 'sysinfo',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.drawLine()
  }
}
</script>

<style scoped>

</style>
