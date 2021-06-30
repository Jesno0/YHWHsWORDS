<template>
    <el-collapse accordion>
        <Communication name="1" :bookId="bookId" :chapterId="chapterId" title="个人提问/分享" :list="myQues" @aksSubmit="updateList"/>
        <Communication name="2" :bookId="bookId" :chapterId="chapterId" title="群内提问/分享" :list="groupQues" @aksSubmit="updateList"/>
        <Communication name="3" :bookId="bookId" :chapterId="chapterId" title="公开提问/分享" :list="pubQues" @aksSubmit="updateList"/>
    </el-collapse>
</template>

<script>
import {ApiUserQuestion} from '@/js/Api'
import Communication from './Communication'

export default {
  name: 'CommunicationPane',
  components: {
      Communication
  },
  props: {
    bookId: {
        type: Number
    },
    chapterId: {
        type: Number
    }
  },
  watch: {
    bookId() {
        this.updateList();
    },
    chapterId() {
        this.updateList();
    }
  },
  data () {
    return {
        myQues: [],
        groupQues: [],
        pubQues: []
    }
  },
  async mounted () {
      this.updateList();
  },
  methods: {
    async updateList () {
      const {myQues,groupQues,pubQues} = await ApiUserQuestion(this.bookId,this.chapterId);
      this.myQues = myQues;
      this.groupQues = groupQues;
      this.pubQues = pubQues;
    }
  }
}
</script>

<style scoped>
</style>