<template>
<div>
  <el-menu ref="menu" :default-active="$route.path" mode="horizontal" menu-trigger="click" @open="handleOpen" :unique-opened="true" router>
      <div v-for="rt in $router.options.routes" :key="rt.name">
        <el-submenu v-if="rt.children && rt.children.length" :index="rt.path" router>
            <span slot="title"><i :class="rt.icon"/>{{rt.name}}</span>
            <el-menu-item v-for="srt in rt.children" :key="srt.name" :index="srt.path">
                <span slot="title"><i v-if="srt.icon" :class="srt.icon"/>{{srt.name}}</span>
            </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="rt.path">
            <span slot="title"><i v-if="rt.icon" :class="rt.icon"/>{{rt.name}}</span>
        </el-menu-item>
      </div>
  </el-menu>
  <Auth :visible.sync="isShowAuth"/>
</div>
</template>

<script>
import Auth from '../common/Auth'
import {ApiCheckLogin} from '@/js/Api'

export default {
  name: 'MenuHorizontal',
  components: {
    Auth
  },
  data() {
    return {
        isShowAuth: false
    }
  },
  methods: {
    async handleOpen (_index) {
        switch(_index.replace(/^\//,'')) {
            case 'mine':
                if(!(await ApiCheckLogin())) {
                    this.isShowAuth = true;
                    this.$refs.menu.close(_index);
                }
                break;
        }
    }
  }
}
</script>

<style scoped>
.el-menu.el-menu--horizontal {
    border-bottom: none;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    line-height: 30px;
    padding-right: 10px;
    display: flex;
}
.el-menu--horizontal /deep/ .el-submenu__title,
.el-menu--horizontal .el-menu-item {
    border-bottom: none;
    line-height: 30px;
    height: 30px;
    padding: 0 5px;
    font-size: 18px;
    background: #00000000;
}
.el-menu--horizontal /deep/ .el-submenu.is-opened .el-submenu__title,
.el-menu--horizontal /deep/ .el-submenu:hover .el-submenu__title,
.el-menu--horizontal /deep/ .el-submenu:focus .el-submenu__title,
.el-menu--horizontal /deep/ .el-submenu.is-opened .el-submenu__title i,
.el-menu--horizontal /deep/ .el-submenu:hover .el-submenu__title i,
.el-menu--horizontal /deep/ .el-submenu:focus .el-submenu__title i,
.el-menu--horizontal>div>.el-menu-item.is-active,
.el-menu--horizontal>div>.el-menu-item:hover,
.el-menu--horizontal>div>.el-menu-item:focus {
    border-bottom: none;
    color: darksalmon;
    font-weight: 600;
    line-height: 30px;
    height: 30px;
    padding: 0 5px;
}
.el-menu--horizontal /deep/ .el-submenu__title i,
.el-menu--horizontal>div>.el-menu-item i {
    margin: 0 0;
    display: none;
}
.el-menu--horizontal /deep/ .el-submenu.is-opened .el-submenu__title i,
.el-menu--horizontal>div>.el-menu-item.is-active i {
    margin: 0 0;
    display: contents;
}
</style>
<style>
.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
    min-width: auto;
    padding: 0 2px;
    margin: 2px 0px;
}
.el-menu--popup .el-menu-item {
    border: solid 1px #e6e6e6;
    padding: 5px;
}
.el-menu--popup .el-menu-item.is-active, 
.el-menu--popup .el-menu-item:not(.is-disabled):focus, 
.el-menu--popup .el-menu-item:not(.is-disabled):hover {
    background: blanchedalmond;
}
</style>
