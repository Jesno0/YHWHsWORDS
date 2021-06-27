<template>
  <ResourceList :list="list"/>
</template>

<script>
import ResourceList from './element/ResourceList'
import {ApiSoftwareList} from '@/js/Api'

export default {
  name: 'Software',
  components: {
    ResourceList
  },
  data () {
    return {
      list: []
    }
  },
  async mounted() {
    this.list = await ApiSoftwareList();
  }
}
</script>

<style scoped>

</style>
