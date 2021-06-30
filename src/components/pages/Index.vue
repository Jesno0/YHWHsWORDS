<template>
  <el-container>
    <el-main>
      <Bannar class="banner"/>
    </el-main>
    <el-footer>
      <el-divider/>
      <p>版本归个人所有</p>
    </el-footer>
  </el-container>
</template>

<script>
import Bannar from './element/Bannar'

export default {
  name: 'Index',
  components: {
    Bannar
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.el-container {
  height: calc(92vh);
}
.el-main {
  margin: 20px 0px;
  height: 100%;
}
.el-footer {
  font-size: 13px;
  color: #909399;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.el-footer .el-divider {
  margin: 0;
}
</style>
