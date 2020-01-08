<template>
  <div class="riyuereport">
    <div class="time">2018-08-01</div>
    <div class="lwqflex">
      <div class="smallTitle">流量</div>
      <div class="borderRight">
        <div class="up">uv</div>
        <div class="down">21</div>
      </div>

    </div>
  </div>
</template>
<script>
import api from "@/api"
export default {

};
</script>
<style lang="scss">
.riyuereport {
  // display: flex;
  .lwqflex {
    display: flex;
    border-bottom: 1px solid #999;
    padding: 5px 0;

  }
  .smallTitle{
      font-size: 18px;
        width: 147px;
      height: 70px;
      line-height: 70px;
      text-align: center;
  }
  .borderRight {
    border-right: 1px solid #999;
    width: 147px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // line-height: 70px;
    text-align: center;
    font-size: 16px;
    .up{
        font-size: 18px;
    }
    .down{
        color: #666;
    }
  }
  .time{
      font-size: 18px;
      background-color: rgb(250,250,250);
      height: 50px;
      line-height: 50px;
      margin-left: 15px;
  }
}
</style>