<template>
  <div class="mima">
    <div class="da">
      <span
        :class="[index1==lindex?'active':'']"
        @click="H3titleClick(item.id,index1)"

        v-for="(item,index1) in $store.state.nav.h3Title"
        :key="index1"
      >{{item.name}}</span>
    </div>

    <div class="line"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
        lindex:0,
      activeIndex2: "1",
      activeIndex3: "0",
      myindex: 0 //第一次应该直接默认ajax请求回来的id的第一个
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    H3titleClick(id,index1) {
        this.lindex=index1;
      let arr = id.split("-");
      console.log(arr);
      if (id == "1-0-0") {
        this.$router.push({ path: "/index/main1/shopList/shelf" });
      } else if (id == "1-0-1") {
        this.$router.push({ path: "/index/main1/shopList/soldOut" });
      } else if (id == "1-0-2") {
        this.$router.push({ path: "/index/main1/shopList/recycle" });
      }
      else if (id == "2-5-0"){
          this.$router.push({ path: "/index/main1/indexLangConfig/header" });
      }else if(id == "2-5-1"){

          this.$router.push({ path: "/index/main1/indexLangConfig/footer" });
      }

    }
  }
};
</script>
<style lang="scss" scoped>
.mima {
  font-size: 20px;
  background-color: rgb(247, 247, 247);

  .da {
    span {
      cursor: pointer;
      display: inline-block;

      // width: 100px;
      height: 50px;
      padding: 0 5px;
      position: relative;
      line-height: 50px;
      margin-left: 5px;
      &.active{
        background-color: #fff;
      }
      &.active::after {

        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: rgb(105, 105, 186);
        // transform: translateX(-50%);
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
