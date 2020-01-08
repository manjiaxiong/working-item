<template>
  <!-- main time 上面显示的是时间选择的都放到这个位置 -->
  <div class="mainbootom">
    <div>
      <time-nav></time-nav>
    </div>
    <e-char ref="hhh" :num="6"></e-char>
    <div class="liscard">
      <lis-card ref="h1" :list="list"></lis-card>
      <lis-card5 ref="h2" :title="'热销商品'"></lis-card5>
      <lis-card5 ref="h3" :title="'国家'"></lis-card5>
    </div>
    <div class="liscard">
      <li-card ref="h4" :title="'设备注册'"></li-card>
      <li-card ref="h5" :title="'设备订单'"></li-card>
      <!-- <div class="search">
        <span>收索词汇</span>
        <span>查看 > ></span>
      </div> -->
    </div>
  </div>
</template>
<script>
import EChar from "@/page/Lwq/main/echar/zongtongji";
import api from "@/api/demo";
import timeNav from "../timenav";
import LisCard from "../card/liCard";
import LisCard5 from "../card/card5";
import liCard from "../card/mylicard";
export default {
  data() {
    return {
      list:[]
    };
  },
  components: {
    EChar,
    LisCard,
    LisCard5,
    timeNav,
    liCard
  },
  created() {
    this.init();
  },
  methods: {
    getTime(val) {
      let time = {
        startTime: val.startDate,
        endTime: val.endDate
      };
      this.init(time);
    },
    getDate() {},
    init(temp) {
      api
        .zongtongji({
          startDate: temp ? temp.startTime : null,
          endDate: temp ? temp.endTime : null
        })
        .then(res => {
          let that = this;
          that.$refs.hhh.init(res.data.data);
        })
        .catch(res => {});
      api
        .getALL({
          startDate: temp ? temp.startTime : null,
          endDate: temp ? temp.endTime : null
        })
        .then(res => {
          console.log(res.data.data, "ajskdljaklsj");
          this.$refs.h1.init(res.data.data.classifys);
          this.$refs.h2.init(res.data.data.hotProducts);
          this.$refs.h3.init1(res.data.data.countrys);
          this.$refs.h4.init(res.data.data.equipmentRegistration);
          this.$refs.h5.init1(res.data.data.equipmentOrders);
    
        });
    }
  }
};
</script>
<style lang="scss">
.mainbootom {
  .liscard {
    display: flex;
    padding-left: 50px;
  }
  .search {
    display: flex;
    width: 300px;
    font-size: 16px;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    line-height: 50px;
    border: 1px solid #666;
    border-radius: 5px;
    margin: 10px;
    box-shadow: 1px 1px 10px #999;
    padding: 5px 0;
    color: #666;
  }
  .overY {
    // max-height: calc(100vh - 67px);
    // overflow-x: hidden;
    // &::-webkit-scrollbar {
    //     display: none;
    // }
  }
}
</style>