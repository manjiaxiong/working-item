<template>
  <div class="pt70px">
    <time-nav></time-nav>
    <my-char ref="hhh" :num="4" :name="['访问量','成交订单数','订单金额','总件数']"></my-char>
  </div>
</template>
<script>
import MyChar from "../echar/shopTrend";
import timeNav from "../timenav";
import api from "@/api/order";
export default {
  components: { MyChar, timeNav },
  data() {
    return {
      list: []
    };
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
        .shopTrend({
          startDate: temp ? temp.startTime : null,
          endDate: temp ? temp.endTime : null,
          goodId:this.$route.query.id
        })
        .then(res => {
          this.list = res.data.data;
          let that = this;
          console.log(res)
          setTimeout(function() {
            console.log(res.data.data, "我是原装的");
            that.$refs.hhh.init(res.data.data);
          }, 200);
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.pt70px {
  padding-top: 30px;
}
</style>