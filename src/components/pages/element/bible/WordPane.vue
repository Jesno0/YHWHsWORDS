<template>
    <div>
        <Word class="word" :bookId="bookId" :chapterId="chapterId_v"/>
        <div class="footer">
            <el-button type="primary" icon="el-icon-arrow-left" circle :disabled="!isPreviousShow" @click="handlePrevious"></el-button>
            <span v-if="isPunchIn">
                <h3>已打卡</h3>
                <span>2021年6月30日 13:13:13</span>
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
import {ApiUserPunchIn,ApiCheckLogin} from '@/js/Api'

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
    chapterId(newV) {
        this.chapterId_v = newV;
        this.updateArrow();
    },
    chapterCount() {
        this.updateArrow();
    }
  },
  data () {
    return {
      isPreviousShow: false,
      isNextShow: true,
      isAuthShow: false,
      isPunchIn: false,
      chapterId_v: 1
    }
  },
  async mounted () {
      this.updateArrow(this.chapterId);
      this.isPunchIn = false;//await Api(); //打卡信息
  },
  methods: {
    updateArrow () {
        this.isPreviousShow = this.chapterId_v > 1;
        this.isNextShow = this.chapterId_v < this.chapterCount;
    },
    handlePrevious () {
        this.updateArrow(--this.chapterId_v);
    },
    handleNext () {
        this.updateArrow(++this.chapterId_v);
    },
    async handlePunchIn () {
        if(!(await ApiCheckLogin())) {
            this.$message.error("请先登录");
            this.isAuthShow = true;
        } else {
            await ApiUserPunchIn(this.bookId,this.chapterId_v);
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