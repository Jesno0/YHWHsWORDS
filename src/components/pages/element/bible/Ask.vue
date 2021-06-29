<template>
  <el-dialog :visible.sync="visible" :show-close="false" :before-close="handleCancel">
    <el-input v-model="question" type="textarea"></el-input>
    <el-button type="primary" @click.stop="handleSubmit">提交</el-button>
  </el-dialog>
</template>

<script>
import {ApiUserAsk} from '@/js/Api'

export default {
  name: 'Auth',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    index: {
      type: String,
      default: "1"
    }
  },
  watch: {
  },
  data () {
    return {
        question: ""
    }
  },
  async mounted () {
    
  },
  methods: {
    handleCancel () {
      this.$emit('update:visible', false);
    },
    async handleSubmit () {
        await ApiUserAsk(this.bookId,this.chapterId,this.question,parseInt(this.index));
        this.$emit('submit');
        this.$emit('update:visible', false);
    }
  }
}
</script>

<style scoped>
.el-dialog__wrapper /deep/ .el-dialog {
  border-radius: 20px;
  width: 80%;
}

.el-dialog__wrapper /deep/ .el-dialog__body {
  padding: 0px;
  border-radius: 20px;
}
</style>
