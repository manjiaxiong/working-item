<template>
  <div class="pt70px">
    <time-nav></time-nav>
    <my-char ref="hhh" :num="4" :name="['客单价','客单数','产品价格','询盘数']"></my-char>
  </div>
</template>
<script>
import MyChar from "../echar/shuangxian";
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
        .findOrderSreceived({
          startDate: temp ? temp.startTime : null,
          endDate: temp ? temp.endTime : null,

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