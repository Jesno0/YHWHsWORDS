<template>
  <el-container>
    <el-header>头部：待处理</el-header>
    <el-main>
      <div class="words" v-for="item in words" :key="item.id">
        <button>{{item.id}}</button>
        <p>{{item.name}}</p>
      </div>
    </el-main>
    <el-footer>脚部：待处理</el-footer>
  </el-container>
</template>

<script>
import {ApiBibleVersion,ApiBibleBook,ApiBibleWord} from '../../js/Api'

export default {
  name: 'Bible',
  data () {
    return {
      versions: [],
      books: [],
      chapters: [],
      words: []
    }
  },
  async mounted () {
    this.versions = await ApiBibleVersion();
    this.books = await ApiBibleBook();
    this.chapters = toChapter(this.books[0].chapterCount);
    this.words = await ApiBibleWord(this.books[0].id, this.chapters[0].id);
  }
}

function toChapter(num) {
  return new Array(num).fill('').map((v,i) => {
    return {
      id: i+1,
      name: `第${i+1}章`
    };
  });
}
</script>

<style scoped>
.words {
  display: flex;
  align-items: center;
}
.words button {
  width: 30px;
  height: 30px;
  padding: 0;
  margin: 5px;
}
</style>
