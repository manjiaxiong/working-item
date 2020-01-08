<template>
  <div class="herdertop">
    <div class="right-top">
      <top-left></top-left>
    </div>
    <div class="right-bootom">
      <top-boo></top-boo>
    </div>
  </div>
</template>
<script>
import TopLeft from "./top";
import TopBoo from "./bottom";
export default {
  components: {
    TopLeft,
    TopBoo
  }
};
</script>
<style lang="scss">
.herdertop {
  // display: flex;
  max-height: 100%;
  overflow: hidden;
  .right-top {
    height: 67px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }
  .right-bootom{
      min-height: 100%;
      background-color: rgb(233, 235, 243);
  }

}
</style>