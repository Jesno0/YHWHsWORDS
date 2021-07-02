<template>
  <el-table :data="lines" :show-header="false" :row-class-name="rowClassName" :cell-class-name="cellClassName">
    <el-table-column width="30">
        <span slot-scope="scope">{{scope.row.isNum ? scope.row.id : ""}}</span>
        <!-- <button slot-scope="scope">{{scope.row.id}}</button> -->
    </el-table-column>
    <el-table-column prop="name"></el-table-column>
    <el-table-column v-if="false" width="35">
        <i class="el-icon-document" v-if="true"></i>
        <i class="el-icon-chat-dot-square" v-if="true"></i>
    </el-table-column>
    <el-table-column v-if="isShowVersion" width="45">
        <span slot-scope="scope">{{scope.row.version}}</span>
    </el-table-column>
  </el-table>
</template>

<script>
import {ApiBibleWord} from '@/js/Api'

export default {
  name: 'Word',
  props: {
    list: {
        type: Array
    }
  },
  data () {
    return {
        isShowVersion: false,
        lines: []
    }
  },
  watch: {
      list() {
          this.updateLines();
      }
  },
  async mounted () {
  },
  methods: {
    updateLines() {
        if(!this.list[0].constructor != Array) this.lines = this.list;
        this.isShowVersion = Boolean(this.lines.length != 1);
        this.lines = this.list[0].map((item,i) => {
            return (new Array(this.list.length)).fill('').map((v,j) => {
                return Object.assign({
                    isNum: Boolean(j==0),
                    version: "和合本"
                },this.list[j][i]);
            });
        }).flat();
    },
    rowClassName ({row, rowIndex}) {
        return "row-all";
    },
    cellClassName ({row, column, rowIndex, columnIndex}) {
        const _columnIndex = this.isShowVersion ? columnIndex : columnIndex+1;
        switch(columnIndex) {
            case 0:
                return 'cell-num';
            case 2:
                return 'cell-version';
            case 3:
                return 'cell-operation';
            case 1:
            default:
                return 'cell-word';
        }
    }
  }
}
</script>

<style scoped>
.el-table .cell-num span {
    color: indianred;
    display: flex;
    justify-content: center;
    word-break: normal;
}
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
.el-table .cell-version,
.el-table .cell-num,
.el-table .cell-word, 
.el-table .cell-operation {
    padding: 1px 0;
}
.el-table .cell-version {
    font-size: 15px;
    color:darkgray;
}
.el-table .cell-word {
    padding-left: 5px;
    padding-right: 4px;
    font-size: 18px;
}
.el-table .cell {
    padding: 0px;
}
</style>