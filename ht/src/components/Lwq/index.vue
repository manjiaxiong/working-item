<template>
  <!-- 主体分成俩大块 -->
  <div class="test">
    <div class="left">
      <!-- 导航 -->
      <my-nav />
    </div>
    <div class="right">
      <herader-top />
    </div>
    <!-- <div class="bootm">我是下面呀</div> -->

  </div>
</template>

<script>
import HeraderTop from "@/page/Lwq/headerTop/index";
import MyNav from "@/page/Lwq/left/index";

export default {
  components: {
    HeraderTop,
    MyNav,
  }
};
</script>
<style lang="scss">
.test {
  display: flex;
  max-width: 1920px;
  .left {
    width: 150px;
    min-height: 100vh;
  }
  .right {
    width: 1800px;
  }
}
</style>

