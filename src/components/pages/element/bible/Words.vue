<template>
  <el-table :data="list" :show-header="false" :row-class-name="rowClassName" :cell-class-name="cellClassName">
    <el-table-column width="30">
        <button slot-scope="scope">{{ scope.row.id }}</button>
    </el-table-column>
    <el-table-column prop="name"></el-table-column>
    <el-table-column v-if="false" width="35">
        <i class="el-icon-document" v-if="true"></i>
        <i class="el-icon-chat-dot-square" v-if="true"></i>
    </el-table-column>
  </el-table>
</template>

<script>
import {ApiBibleWord} from '../../../../js/Api'

export default {
  name: 'Bannar',
  props: {
    bookId: {
        type: Number
    },
    chapterId: {
        type: Number
    }
  },
  data () {
    return {
      list: []
    }
  },
  watch: {
    bookId (oldV, newV) {
        this.updateList();
    },
    chapterId (oldV, newV) {
        this.updateList();
    }
  },
  async mounted () {
    this.updateList();
  },
  methods: {
    async updateList () {
        if(!this.bookId || !this.chapterId) return;
        this.list = await ApiBibleWord(this.bookId, this.chapterId);
    },
    rowClassName ({row, rowIndex}) {
        return "row-all";
    },
    cellClassName ({row, column, rowIndex, columnIndex}) {
        switch(columnIndex) {
            case 0:
                return 'cell-num';
            case 1:
                return 'cell-word';
            case 2:
                return 'cell-operation';
            default:
                return 'cell-word';
        }
    }
  }
}
</script>

<style scoped>
.el-table .cell-num button {
    width: 30px;
    height: 20px;
    padding: 0px;
    background: #ffefdc;
    border: none;
    border-radius: 5px;
    color: indianred;
    box-shadow: inset 0px -1px 3px 0px #afafaf;
}
.el-icon-document {
    color:burlywood;
}
.el-icon-chat-dot-square {
    color:darkseagreen;
}
</style>
<style>
.el-table .cell-num, .el-table .cell-word, .el-table .cell-operation {
    padding: 1px 0;
}
.el-table .cell-word {
    padding-left: 5px;
    padding-right: 4px;
}
.el-table .cell {
    padding: 0px;
}
</style>