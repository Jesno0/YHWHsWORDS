<template>
  <ResourceList :list="list"/>
</template>

<script>
import ResourceList from './element/ResourceList'
import {ApiReferenceList} from '@/js/Api'

export default {
  name: 'Reference',
  components: {
    ResourceList
  },
  data () {
    return {
      list: []
    }
  },
  async mounted() {
    this.list = await ApiReferenceList();
  }
}
</script>

<style scoped>

</style>
