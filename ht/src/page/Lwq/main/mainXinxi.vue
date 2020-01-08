<template>
  <div>
    <div>
      <thirdly-nav></thirdly-nav>
    </div>
    <div class="overY">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import ThirdlyNav from "./mianXinxiNav.vue";
export default {
  components: {
    ThirdlyNav
  }
};
</script>
<style lang="scss">
.overY {
  height: calc(100vh - 4.0625rem);
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>