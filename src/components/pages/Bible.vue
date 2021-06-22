<template>
  <el-container>
    <el-header>头部：待处理</el-header>
    <el-main>
      <Words :bookId="books.length && books[currentBookIndex].id" :chapterId="chapters.length && chapters[currentChapterIndex].id"/>
    </el-main>
    <el-footer>脚部：待处理</el-footer>
  </el-container>
</template>

<script>
import {ApiBibleVersion,ApiBibleBook,ApiBibleWord} from '../../js/Api'
import Words from './element/bible/Words'

export default {
  name: 'Bible',
  components: {
    Words
  },
  data () {
    return {
      versions: [],
      books: [],
      chapters: [],
      currentVersionIndex: 0,
      currentBookIndex: 0,
      currentChapterIndex: 0
    }
  },
  async mounted () {
    this.versions = await ApiBibleVersion();
    this.books = await ApiBibleBook();
    this.chapters = toChapter(this.books[0].chapterCount);
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
</style>
