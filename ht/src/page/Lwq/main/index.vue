<template>
  <div class="mymainIndex">
    <!-- 分成俩部分 -->
    <nav class="MYid">
      <my-navleft1></my-navleft1>
    </nav>
    <div class="myrouter">
    <router-view></router-view>
    </div>
  </div>
</template>
<script>
import MyNavleft1 from "./navLeft";
export default {
  components: {
    MyNavleft1
  }
};
</script>
<style lang="scss">
.mymainIndex {
  display: flex;
  .MYid{
      /*width: 150px;*/
      min-height: calc(100vh - 67px);
  }
  .myrouter{
      width: 100%;
      max-height: calc(100vh - 67px);
      background-color: #fff;
      box-sizing: border-box;
      margin: 5px 0px 0 5px;
  }
}
</style>
