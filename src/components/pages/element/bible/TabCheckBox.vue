<template>
  <el-checkbox-group :min="1" :ref="$ref" v-model="currentName" @change="handleChange">
      <el-checkbox-button v-for="item in list" :key="item.id" :label="item.name" @click.native="handleSelect(item.name)"></el-checkbox-button>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'TabCheckBox',
  props: {
      $ref: {
          type: String
      },
      list: {
          type: Array
      },
      index: {
          type: Array
      }
  },
  data () {
    return {
        currentName: []
    }
  },
  watch: {
    list (oldV, newV) {
        this.updateList();
    },
    index (oldV, newV) {
        this.updateList();
    }
  },
  async mounted () {
    this.updateList();
  },
  methods: {
    async updateList () {
        if(!this.list.length) return;
        this.currentName = this.index.map(x=>{
          return this.list[x].name;
        });
    },
    handleChange() {
      const _index = this.currentName.map(_name=>{
        return this.list.findIndex(x=>x.name==_name);
      });
      this.$emit('change',{$ref: this.$ref, index: _index});
    },
    handleSelect(_name) {
      if(this.currentName.length == 1 && this.currentName[0] == _name) {
        this.$message.warning("至少选中一个");
      }
    }
  }
}
</script>

<style scoped>
.el-checkbox-button /deep/ .el-checkbox-button__inner {
    font-size: 18px;
    border-left: 1px solid #DCDFE6;
}
.el-checkbox-button.is-disabled /deep/ .el-checkbox-button__inner{
  background: #409eff;
  border-color: #409EFF;
  color: #FFF;
}
</style>
