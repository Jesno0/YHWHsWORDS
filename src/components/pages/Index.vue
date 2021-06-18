<template>
  <div>
    Index
    <!-- <el-collapse-transition>
        <div v-show="show3">
          <div class="transition-box">el-collapse-transition</div>
          <div class="transition-box">el-collapse-transition</div>
        </div>
      </el-collapse-transition> -->
  </div>
</template>

<script>
import {ApiBannar} from '../../js/Api'

export default {
  name: 'Index',
  data () {
    return {
      msg: 'Index'
    }
  },
  async mounted () {
    const bannarData = await ApiBannar();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
