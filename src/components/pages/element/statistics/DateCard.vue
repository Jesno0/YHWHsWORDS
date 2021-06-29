<template>
    <el-card shadow="never">
        <div class="left">{{iconText}}</div>
        <div class="right">
            <h4 v-if="title">{{title}}</h4>
            <span v-if="content">{{content}}</span>
            <span v-if="user" class="user">我的：{{user}}</span>
            <span v-if="group" class="group">群组：{{group}}</span>
        </div>
    </el-card>
</template>

<script>

export default {
  name: 'DateCard',
  props: {
      iconText: {
          type: String
      },
      title: {
          type: String
      },
      content: {
          type: String
      },
      user: {
          type: String
      },
      group: {
          type: String
      }
  },
  data () {
    return {
    }
  },
  async mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
.el-card {
    border-radius: 5px;
}
.el-card /deep/ .el-card__body {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px;
    font-size: 18px;
    margin: 5px 0;
}
.left {
    width: 55px;
    height: 55px;
    color: #ffffff;
    background: #b379bd;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.right {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #70727b
}
h4 {
    margin: 5px 0;
}
.user {
    color: #859e76;
}
.group {
    color: #9a7531;
}
</style>
