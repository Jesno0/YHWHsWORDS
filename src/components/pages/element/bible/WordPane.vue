<template>
    <div>
        <Word class="word" :list="wordList" :bookId="bookId" :chapterId="chapterId"/>
        <div class="footer">
            <el-button type="primary" icon="el-icon-arrow-left" circle :disabled="!isPreviousShow" @click="handlePrevious"></el-button>
            <span v-if="isPunchIn">
                <h3>已打卡</h3>
                <span>{{punchInTime}}</span>
            </span>
            <el-button v-else type="text" class="punch-in" @click="handlePunchIn">打卡</el-button>
            <el-button type="primary" icon="el-icon-arrow-right" circle :disabled="!isNextShow" @click="handleNext"></el-button>
        </div>
        <Auth :visible.sync="isAuthShow"/>
    </div>
</template>

<script>
import Word from './Word'
import Auth from '../../../common/Auth'
import {ApiUserPunchIn,ApiCheckLogin,ApiBibleWord} from '@/js/Api'

export default {
  name: 'WordPane',
  components: {
      Word,
      Auth
  },
  props: {
    bookId: {
        type: Number
    },
    chapterId: {
        type: Number
    },
    chapterCount: {
        type: Number
    }
  },
  watch: {
    chapterId() {
        this.updateArrow();
        this.updateWordList();
    },
    chapterCount() {
        this.updateArrow();
        this.updateWordList();
    }
  },
  data () {
    return {
      isPreviousShow: false,
      isNextShow: true,
      isAuthShow: false,
      isPunchIn: false,
      wordList: [],
      punchInTime: ""
    }
  },
  async mounted () {
      this.updateArrow(this.chapterId);
      this.updateWordList();
  },
  methods: {
    updateArrow () {
        this.isPreviousShow = this.chapterId > 1;
        this.isNextShow = this.chapterId < this.chapterCount;
    },
    async updateWordList () {
        if(!this.bookId || !this.chapterId) return;
        const {userInfo,list:_list} = await ApiBibleWord(this.bookId, this.chapterId);

        this.wordList = _list;
        this.isPunchIn = Boolean(userInfo);
        this.punchInTime = userInfo ? userInfo.maxTime : "";
    },
    handlePrevious () {
        this.$emit("chapterChange",this.chapterId-2);
    },
    handleNext () {
        this.$emit("chapterChange",this.chapterId);
    },
    async handlePunchIn () {
        if(!(await ApiCheckLogin())) {
            this.$message.error("请先登录");
            this.isAuthShow = true;
        } else {
            await ApiUserPunchIn(this.bookId,this.chapterId);
            this.$message.success("打卡成功！");
            this.isPunchIn = true;
        }
    }
  }
}
</script>

<style scoped>
.punch-in {
    color: darkorange;
    font-size: 25px;
    font-weight: 600;
    margin: 0 30px;
}
.el-button--primary {
    border: none;
    margin: 0;
}
.footer {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.footer span {
    display: flex;
    flex-direction: column;
    align-items: center;
}
h3 {
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>