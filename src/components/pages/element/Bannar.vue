<template>
<div id="bannar">
  <el-carousel trigger="click" height="200px">
    <el-carousel-item v-for="item in list" :key="item.title">
      <h1>{{ item.title }}</h1>
      <p>{{ item.content }}</p>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
import {ApiBannar} from '../../../js/Api'

export default {
  name: 'Bannar',
  data () {
    return {
      list: []
    }
  },
  async mounted () {
    this.list = await ApiBannar();
  }
}
</script>

<style scoped>
#bannar {
  background-color: blanchedalmond;
  padding: 0 20px;
}
h1 {
  color: #bb8033;
}
p {
  color: #716f6c;
  font-size: 18px;
}
</style>
