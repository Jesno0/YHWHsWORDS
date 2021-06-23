<template>
    <div>
        <Word class="word" :bookId="bookId" :chapterId="chapterId"/>
        <div class="footer">
            <el-button type="primary" icon="el-icon-arrow-left" circle :disabled="!isPreviousShow" @click="handlePrevious"></el-button>
            <el-button type="text" class="punch">打卡</el-button>
            <el-button type="primary" icon="el-icon-arrow-right" circle :disabled="!isNextShow" @click="handleNext"></el-button>
        </div>
    </div>
</template>

<script>
import Word from './Word'

export default {
  name: 'WordPane',
  components: {
      Word
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
    chapterId(newV,oldV) {
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
      chapterId_v: 1
    }
  },
  async mounted () {
      this.updateArrow(this.chapterId);
  },
  methods: {
    updateArrow () {
        console.log(this.chapterId_v,this.chapterCount);
        this.isPreviousShow = this.chapterId_v > 1;
        this.isNextShow = this.chapterId_v < this.chapterCount;
    },
    handlePrevious () {
        this.updateArrow(--this.chapterId_v);
    },
    handleNext () {
        this.updateArrow(++this.chapterId_v);
    }
  }
}
</script>

<style scoped>
.punch {
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