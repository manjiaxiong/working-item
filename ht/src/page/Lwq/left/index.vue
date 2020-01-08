<template>
  <!-- 坐边分成左右俩块 -->
  <div class="lwq-nav-left">
      <!-- 左 -->
    <div class="lwq-nav-header">
      <nav-header></nav-header>
    </div>
  
    <div class="lwq-nav-bottom">
        <!-- 右 -->
      <nav-bootom></nav-bootom>
    </div>
  </div>
</template>

<script>
import NavHeader from "./NavHeader";
import NavBootom from "./NavBootom";
export default {
  components: {
    NavHeader,
    NavBootom
  }
};
</script>

<style lang="scss">
.test .left{
  background-color:#2a2743 !important;
}
.lwq-nav-left {
    // width: 100%;
    height: calc(100% - 67px);

  .lwq-nav-header {
  }
  .lwq-nav-bottom {
      background: rgb(43, 38, 69);
      height:100%;
  }
}
</style>