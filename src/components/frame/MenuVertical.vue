<template>
<div>
    <span @click="handleShow">
        <i class="el-icon-menu"></i>
    </span>
    <div v-if="isShow">
        <el-menu ref="menu" :default-active="$route.path" menu-trigger="click" @select="handleHide" @open="handleOpen" router>
            <div v-for="rt in $router.options.routes" :key="rt.name">
                <el-submenu v-if="rt.children && rt.children.length" :index="rt.path">
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
        <span class="mask" @click="handleHide"/>
    </div>
    <Auth :visible.sync="isShowAuth"/>
</div>
</template>

<script>
import Auth from '../common/Auth'
import {ApiCheckLogin} from '@/js/Api'

export default {
  name: 'MenuVertical',
  components: {
    Auth
  },
  data () {
    return {
      isShow: false,
      isShowAuth: false
    }
  },
  methods: {
    handleShow (e) {
      this.isShow = true
    },
    handleHide () {
      this.isShow = false
    },
    async handleOpen (_index) {
        switch(_index.replace(/^\//,'')) {
            case 'mine':
                this.isShowAuth = !(await ApiCheckLogin().catch(err=>{return false}));
                if(this.isShowAuth) this.$refs.menu.close(_index);
                break;
        }
    }
  }
}
</script>

<style scoped>
.el-icon-menu {
    margin-right: 10px;
}
.el-icon-menu:hover {
    color: darksalmon;
}
.el-menu {
    position: absolute;
    z-index: 999;
    top: 0;
    right: 0;
    height: 100%;
    width: 150px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.el-menu /deep/ .el-submenu__title,
.el-menu-item {
    height: auto;
    color: #909399;
    font-size: 18px;
}
.el-menu-item:focus, 
.el-menu-item:hover {
    color: #303133;
    background-color: #f9eecec7;
}
.el-menu-item.is-active {
    color: darksalmon;
    background-color: #f9eecec7;
    font-weight: 600;
}
.el-menu /deep/ .el-submenu .el-submenu__icon-arrow {
    height: auto;
}
.el-menu /deep/ .el-submenu i,
.el-menu-item i {
    height: 23px;
}
.mask {
    position: absolute;
    z-index: 998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.3;
}
</style>