<template>
  <el-radio-group :ref="$ref" v-model="currentName">
      <el-radio-button v-for="item in list" :key="item.id" :label="item.name" @click.native="handleSelect"></el-radio-button>
  </el-radio-group>
</template>

<script>
export default {
  name: 'TabRadio',
  props: {
      $ref: {
          type: String
      },
      list: {
          type: Array
      },
      index: {
          type: Number,
          default: 0
      }
  },
  data () {
    return {
        currentName: ""
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
        this.currentName = this.list[this.index].name;
    },
    handleSelect (e) {
        //使用 @click.native.prevent 会使当前的没有选中
        if (e.target.localName !== 'input') return;
        const _index = this.list.findIndex(x=>x.name==e.target.defaultValue);
        this.$emit('select',{$ref: this.$ref, index: _index});
    }
  }
}
</script>

<style scoped>
.el-radio-button /deep/ .el-radio-button__inner {
    font-size: 18px;
    border-left: 1px solid #DCDFE6;
}
</style>
