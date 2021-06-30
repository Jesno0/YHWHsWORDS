<template>
  <el-dialog :title="title+'提问/分享'" :visible.sync="visible" :show-close="false" :before-close="handleCancel">
    <el-input v-model="question" type="textarea"></el-input>
    <div>
      <el-button type="primary" @click.stop="handleSubmit">提交</el-button>
      <el-button @click.stop="handleCancel">取消</el-button>
    </div>
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
    },
    bookId: {
        type: Number
    },
    chapterId: {
        type: Number
    }
  },
  watch: {
  },
  data () {
    return {
      title: "",
      question: ""
    }
  },
  async mounted () {
    switch(parseInt(this.index)) {
      case 1:
        this.title = "个人";
        break;
      case 2:
        this.title = "群内";
        break;
      case 3:
        this.title = "公共";
        break;
    }
  },
  methods: {
    handleCancel () {
      this.$emit('update:visible', false);
    },
    async handleSubmit () {
        await ApiUserAsk(this.bookId,this.chapterId,this.question,parseInt(this.index)-1);
        this.question = "";
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
  font-size: 18px;
}
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding: 0 20px 10px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.el-dialog__wrapper /deep/ .el-textarea__inner {
  min-height: 200px !important;
  font-size: 18px;
}
.el-button {
  font-size: 18px;
  margin-top: 10px;
}
</style>
