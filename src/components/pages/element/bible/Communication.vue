<template>
<div>
    <el-collapse-item :name="name">
        <template slot="title">
            <h3>{{title}}</h3>
            <el-button icon="el-icon-plus" type="primary" circle @click.stop="handleShowAsk()"></el-button>
        </template>
        <el-collapse accordion>
            <el-collapse-item v-for="(item,i) in list" :key="i" :title="String(i+1)+'. ['+item.nickName+'] '+item.question">
                <span>{{item.question}}</span>
            </el-collapse-item>
        </el-collapse>
    </el-collapse-item>
    <Ask :visible.sync="isShowAsk" :index="name" @submit="handleAskSubmit"/>
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
</style>