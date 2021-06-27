<template>
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column v-for="header in headers" :key="header.key" :prop="header.key" :label="header.name"></el-table-column>
      <!-- <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column> -->
    </el-table>
</template>

<script>
export default {
  name: 'ResourceList',
  props: {
      headers: {
          type: Array,
          default: function () { 
            return [{
              key: "name",
              name: "名称"
            },{
                key: "cover",
                name: "封面"
            },{
                key:"description",
                name: '描述'
            },{
                key: "path",
                name: "地址"
            }]
          }
      },
      list: {
          type: Array
      }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
