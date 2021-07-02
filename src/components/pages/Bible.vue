<template>
  <el-tabs v-model="currentCatalogueName" type="card">
    <el-tab-pane :label="currentVersionName" name="1" :disabled="versions.length<2">
      <TabCheckBox $ref="$version" :list="versions" :index="currentVersionIndex" v-on:change="handleTabSelect"/>
    </el-tab-pane>
    <el-tab-pane label=">" name="1-1" disabled></el-tab-pane>

    <el-tab-pane :label="currentBookTypeName" name="2">
      <TabRadio $ref="$bookType" :list="bookTypes" :index="currentBookTypeIndex" v-on:select="handleTabSelect"/>
    </el-tab-pane>
    <el-tab-pane label=">" name="2-1" disabled></el-tab-pane>

    <el-tab-pane :label="currentBookName" name="3">
      <TabRadio $ref="$book" :list="books" :index="currentBookIndex" v-on:select="handleTabSelect"/>
    </el-tab-pane>
    <el-tab-pane label=">" name="3-1" disabled></el-tab-pane>

    <el-tab-pane :label="currentChapterName" name="4">
      <TabRadio $ref="$chapter" :list="chapters" :index="currentChapterIndex" v-on:select="handleTabSelect"/>
    </el-tab-pane>
    <el-tab-pane label=">" name="4-1" disabled></el-tab-pane>
    
    <el-tab-pane label="经文" name="5">
      <WordPane :versionId="versions.filter((v,i)=>currentVersionIndex.includes(i)).map(v=>v.id)" :bookId="books.length && books[currentBookIndex].id" :chapterId="chapters.length && chapters[currentChapterIndex].id" :chapterCount="chapters.length" @chapterChange="updateCurrentChapter"/>
    </el-tab-pane>
    <el-tab-pane label="|" name="5-1" disabled></el-tab-pane>

    <el-tab-pane label="交流" name="6">
      <CommunicationPane :bookId="books.length && books[currentBookIndex].id" :chapterId="chapters.length && chapters[currentChapterIndex].id"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {ApiBibleVersion,ApiBibleBookType,ApiBibleBook} from '../../js/Api'
import TabRadio from './element/bible/TabRadio'
import TabCheckBox from './element/bible/TabCheckBox'
import WordPane from './element/bible/WordPane'
import CommunicationPane from './element/bible/CommunicationPane'

export default {
  name: 'Bible',
  components: {
    WordPane,
    TabRadio,
    TabCheckBox,
    CommunicationPane
  },
  data () {
    return {
      versions: [],
      bookTypes: [],
      books: [],
      chapters: [],
      currentVersionIndex: [0],
      currentVersionName: "版本",
      currentBookTypeIndex: 1,
      currentBookTypeName: "新约",
      currentBookIndex: 0,
      currentBookName: "书卷",
      currentChapterIndex: 0,
      currentChapterName: "章节",
      currentCatalogueName: "5"
    }
  },
  async mounted () {
    this.versions = await ApiBibleVersion();
    this.currentVersionName = this.versions[0].shortName || this.versions[0].name;
    this.bookTypes = await ApiBibleBookType();
    this.currentBookTypeName = this.bookTypes[1].name;
    await this.updateBooks();
  },
  methods: {
    async updateBooks (_bookTypeIndex=1) {
      const {list:_list,userInfo} = await ApiBibleBook(this.bookTypes[_bookTypeIndex].id);
      this.books = _list;
      const userIndex = userInfo && _list.findIndex(x=>x.id == userInfo.bookId) || 0;
      this.currentBookIndex = Math.max(userIndex, 0);
      this.currentBookName = this.books[this.currentBookIndex].shortName || this.books[this.currentBookIndex].name;
      this.updateChapters(userIndex > -1 ? userInfo.charpterNo : 0);
    },
    updateChapters (_chapterIndex=0) {
      this.chapters = toChapter(this.books[this.currentBookIndex].chapterCount);
      this.updateCurrentChapter(_chapterIndex);
    },
    updateCurrentChapter(_index) {
      this.currentChapterIndex = _index;
      this.currentChapterName = this.chapters[_index].name;
    },
    async handleTabSelect (e) {
      const tabIndex = parseInt(this.currentCatalogueName);
      const {$ref:_ref,index:_index} = e;
      switch(_ref) {
        case '$version':
          this.currentVersionIndex = _index;
          this.currentVersionName = _index.length == 1 ? (this.versions[_index[0]].shortName || this.versions[_index[0]].name) : "多版本";
          return;
        case '$bookType':
          this.currentBookTypeIndex = _index;
          this.currentBookTypeName = this.bookTypes[_index].name;
          await this.updateBooks(_index);
          break;
        case '$book':
          this.currentBookIndex = _index;
          this.currentBookName = this.books[_index].shortName || this.books[_index].name;
          this.updateChapters();
          break;
        case '$chapter':
          this.currentChapterIndex = _index;
          this.currentChapterName = this.chapters[_index].name;
          break;
      }
      this.currentCatalogueName = String(tabIndex+1);
    }
  }
}

function toChapter(num) {
  return new Array(num).fill('').map((v,i) => {
    return {
      id: i+1,
      name: `${i+1}章`
    };
  });
}
</script>

<style scoped>
</style>
<style>
.el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: none;
  margin-top: 10px;
}
.el-tabs--card>.el-tabs__header {
  border: none;
  margin-bottom: 2px;
}
.el-tabs--card>.el-tabs__header .el-tabs__item {
  border: none;
  padding: 0;
  font-size: 18px;
}
.el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2) {
  padding-left: 5px;
}
.el-tabs__content {
  margin: 0;
}
</style>
