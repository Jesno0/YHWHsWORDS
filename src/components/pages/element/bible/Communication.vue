<template>
<div class="main">
    <el-collapse-item :name="name">
        <template class="mainTitle" slot="title">
            <h3>{{title}}({{list.length}})</h3>
            <el-button icon="el-icon-plus" type="primary" circle @click.stop="handleShowAsk()"></el-button>
        </template>
        <el-collapse accordion>
            <el-collapse-item v-for="(item,i) in list" :key="i">
                <span slot="title" class="subTitle">
                    {{i+1}}.[{{item.nickName}}] {{item.question}}
                </span>
                <span>{{item.question}}</span>
            </el-collapse-item>
        </el-collapse>
    </el-collapse-item>
    <Ask :visible.sync="isShowAsk" :index="name" :bookId="bookId" :chapterId="chapterId" @submit="handleAskSubmit"/>
</div>
</template>

<script>
import {ApiUserQuestion} from '@/js/Api'
import Ask from './Ask'

export default {
  name: 'Communication',
  components: {
      Ask
  },
  props: {
    bookId: {
        type: Number
    },
    chapterId: {
        type: Number
    },
    name: {
        type: String
    },
    title: {
        type: String,
        default: "提问/分享"
    },
    list: {
        type: Array
    }
  },
  data () {
    return {
        isShowAsk: false
    }
  },
  async mounted () {
  },
  methods: {
    async handleShowAsk (e) {
        this.isShowAsk = true;
    },
    handleAskSubmit() {
        this.$emit('aksSubmit');
    }
  }
}
</script>

<style scoped>
.el-collapse-item /deep/ .el-collapse-item__header.is-active {
    background-color:beige;
}
.el-collapse-item /deep/ .el-collapse-item__header {
    font-size: 18px;
}
.el-collapse-item /deep/ .el-collapse-item__header span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.el-collapse-item /deep/ .el-collapse-item__content {
    font-size: 18px;
    padding-bottom: 5px;
    word-break: break-all;
}
.el-button {
    margin-left: 10px;
    background-color: #47d07e;
    border: none;
    padding: 3px;
}
</style>