<template>
<div>
  <el-menu :default-active="$route.path" mode="horizontal" router>
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
</div>
</template>

<script>
export default {
  name: 'MenuHorizontal'
}
</script>

<style scoped>
.el-menu--horizontal {
    border-bottom: none;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 15px;
    line-height: 30px;
    padding-right: 10px;
}
.el-menu.el-menu--horizontal {
    border-bottom: none;
}
.el-menu--horizontal>.el-menu-item {
    border-bottom: none;
    line-height: 30px;
    height: 30px;
    padding: 0 5px;
}
.el-menu--horizontal>.el-menu-item.is-active,.el-menu--horizontal>.el-menu-item:hover,.el-menu--horizontal>.el-menu-item:focus {
    border-bottom: none;
    color: darksalmon;
    font-weight: 600;
    line-height: 30px;
    height: 30px;
    padding: 0 5px;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    color: darksalmon;
}
.el-menu-item i{
    margin: 0 0;
    width: 18px;
    display: none;
}
.el-menu-item.is-active i{
    margin: 0 0;
    width: 18px;
    display: contents;
}
</style>
