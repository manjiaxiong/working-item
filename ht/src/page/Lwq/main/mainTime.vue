<template>
  <div>
    <div>
      <!-- <my-time></my-time> -->
    </div>
    <div class="overY">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// import MyTime from "./timenav";

export default {
  components: {
    // MyTime,
  }
};
</script>
<style lang="scss">
  .overY{
       height: calc(100vh - 4.0625rem);
    overflow-x: hidden;

    &::-webkit-scrollbar {
        display: none;
    }
  }
</style>
