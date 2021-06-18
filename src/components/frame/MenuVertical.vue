<template>
<div>
    <span @click="handleShow">
        <i class="el-icon-menu"></i>
    </span>
    <div v-if="isShow">
        <el-menu :default-active="$route.path" @select="handleHide" router="router">
            <el-menu-item index="/">
                <span slot="title"><i class="el-icon-s-home"/>首页</span>
            </el-menu-item>
            <el-menu-item index="/bible">
                <span slot="title"><i class="el-icon-reading"/>圣经</span>
            </el-menu-item>
            <el-menu-item index="/tool">
                <span slot="title"><i class="el-icon-s-goods"/>工具</span>
            </el-menu-item>
            <el-menu-item index="/mine">
                <span slot="title"><i class="el-icon-user-solid"/>我的</span>
            </el-menu-item>
        </el-menu>
        <span class="mask" @click="handleHide"/>
    </div>
</div>
</template>

<script>
export default {
  name: 'MenuVertical',
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    handleShow (e) {
      this.isShow = true
    },
    handleHide () {
      this.isShow = false
    }
  }
}
</script>

<style scoped>
.el-icon-menu {
    margin-right: 10px;
    font-size: 25px;
}
.el-icon-menu:hover {
    color: darksalmon;
}
.el-menu {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    height: 100%;
    width: 120px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.el-menu-item {
    height: auto;
    color: #909399;
}
.el-menu-item:focus, .el-menu-item:hover {
    color: #303133;
    background-color: #f9eecec7;
}
.el-menu-item.is-active {
    color: darksalmon;
    background-color: #f9eecec7;
    font-weight: 600;
}
.mask {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.3;
}
</style>
