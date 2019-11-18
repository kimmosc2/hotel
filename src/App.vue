<template>
  <div id="app">
    <header-bar></header-bar>
    <left-bar v-show="isLogin"></left-bar>
    <router-view></router-view>

  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar'
import LeftBar from './components/LeftBar'
export default {
  name: 'app',
  components: {
    LeftBar,
    HeaderBar
    // HelloWorld
  },
  computed: {
    isLogin () {
      return this.$store.state.names
    }
  },
  watch: {
    isLogin: function (val) {
      this.name = val
    }
  }
}
</script>

<style>
  body,html{
    margin: 0;
    padding: 0;
    min-width: 1100px;
  }

</style>
