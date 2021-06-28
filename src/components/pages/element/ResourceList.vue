<template>
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column v-for="header in headers" :key="header.key" :label="header.name" :width="header.width || 'auto'">
        <template slot-scope="scope">
          <img v-if="header.show_type == 'image'" :src="scope.row.cover">
          <a v-else-if="header.show_type == 'href'" :href="scope.row.path" target="_blank">{{scope.row.pathName || scope.row.path}}</a>
          <span v-else>{{scope.row[header.key]}}</span>
        </template>
      </el-table-column>
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
                name: "封面",
                width: 90,
                show_type: "image"
            },{
                key:"description",
                name: '描述'
            },{
                key: "path",
                name: "地址",
                show_type: "href"
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
.el-table {
  font-size: 18px;
  margin: 10px 5px 0 5px;
}
.el-table /deep/ thead {
  color: burlywood;
}
.el-table /deep/ th,
.el-table /deep/ td {
  text-align: center;
}
.el-table /deep/ td {
  padding: 5px 0;
}
.el-table /deep/ td .cell {
  padding: 0;
}
img {
  border: none;
  width: 80px;
  height: 80px;
}
a {
  text-decoration: underline;
  color:cadetblue;
  font-size: 18px;
}
</style>
