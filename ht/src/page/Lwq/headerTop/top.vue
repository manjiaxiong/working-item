<template>
  <div class="muright-top">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color="#666"
 
      active-text-color="#ffd04b"
    >
      <el-submenu index="2">
        <template slot="title">
          <span class="el-icon-user"></span> 超级管理员
        </template>
        <el-menu-item index="2-1" @click="out">退出登陆</el-menu-item>
  
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  methods: {
    handleSelect(val) {
      console.log(val, "我干的啥");
    },
    out(){
      this.$router.push({
        path : "/login",
      })
    }
  }
};
</script>
<style lang="scss">
.muright-top {
  box-sizing: border-box;

}
.right-top{

  .el-submenu__title {
    font-size: 20px !important;
  }
  .el-icon-user{
      font-size: 20px;
  }
}
</style>