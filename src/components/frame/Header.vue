<template>
  <el-header id="header">
      <Logo/>
      <MenuHorizontal v-if="!isMenuVertical"/>
      <MenuVertical v-if="isMenuVertical"/>
  </el-header>
</template>

<script>
import Logo from './Logo.vue'
import MenuHorizontal from './MenuHorizontal.vue'
import MenuVertical from './MenuVertical.vue'

export default {
  name: 'Header',
  components: {
    Logo,
    MenuHorizontal,
    MenuVertical
  },
  data () {
    return {
      isMenuVertical: document.body.clientWidth < 600
    }
  },
  mounted () {
    const _this = this
    window.onresize = () => {
      _this.isMenuVertical = document.body.clientWidth < 600
    }
  }
}
</script>

<style scoped>
#header {
    width: 100%;
    height: 40px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0;
}
</style>
