<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/frame/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  margin-top: 10px;
  width: 100%;
  padding-left: 5px;
}
</style>
