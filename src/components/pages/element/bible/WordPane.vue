<template>
    <div>
        <Word class="word" :bookId="bookId" :chapterId="chapterId_v"/>
        <div class="footer">
            <el-button type="primary" icon="el-icon-arrow-left" circle :disabled="!isPreviousShow" @click="handlePrevious"></el-button>
            <el-button type="text" class="punch-in" @click="handlePunchIn">打卡</el-button>
            <el-button type="primary" icon="el-icon-arrow-right" circle :disabled="!isNextShow" @click="handleNext"></el-button>
        </div>
        <Auth :visible.sync="isAuthShow"/>
    </div>
</template>

<script>
import Word from './Word'
import Auth from '../../../common/Auth'
import {ApiBiblePunchIn} from '../../../../js/Api'

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
      chapterId_v: 1
    }
  },
  async mounted () {
      this.updateArrow(this.chapterId);
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
        if(!this.$session.get("user")) {
            this.$toast("请先登录");
            this.isAuthShow = true;
        }
    },
    async submitPunchIn () {
        await ApiBiblePunchIn();
        //TODO: 打卡后界面的变动
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
    display: -webkit-box;
    -webkit-box-pack: center;
}
</style>