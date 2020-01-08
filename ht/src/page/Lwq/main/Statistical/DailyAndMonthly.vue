<template>
  <div class="p50">
    <div>
      <time-nav></time-nav>
    </div>
    <h1>{{time1}}</h1>
    <!-- 传入数组 -->
    <my-onetable ref="hh"></my-onetable>
    <my-class ref="xx"></my-class>
    <my-twotable ref="nim"></my-twotable>
  </div>
</template>
<script>
import timeNav from "../timenav";
import MyOnetable from "./Table/one";
import MyClass from "./Table/one2"
import MyTwotable from "./Table/two";
import api from "@/api/dayAndMonth";
import MyDate from "@/util/my.js";
export default {
  components: {
    MyOnetable,
    MyTwotable,
    timeNav,
    MyClass
  },
  data() {
    return {
      time1: "",
      list:"",
    };
  },
  created() {
    this.init();
    this.newTime();
  },

  methods: {
    getTime(val) {
      let time = {
        startTime: val.startDate,
        endTime: val.endDate
      };
      this.init(time);
      this.time1=val.startDate+"至"+val.endDate;
    },
    getDate() {},
    init(temp) {

      api
        .dayAndMonth({
          startDate: temp ? temp.startTime : null,
          endDate: temp ? temp.endTime : null
        })
        .then(res => {
          let mylist = res.data.data;
          let that = this;
          let temp ={
              "UV":mylist.uv,
              "IP":mylist.ip,
              "gdpPv":mylist.gdpPv,
              'pv':mylist.pv,
              "dUv":mylist.dUv,
              'umpOutRate':mylist.umpOutRate,
              "enroll":mylist.enroll,
              "subscription":mylist.subscription,
              'placeOrderMember':mylist.placeOrderMember,
              "afterPurchaseMember":mylist.afterPurchaseMember,
              "turnover":mylist.turnover,
              "orderNum":mylist.orderNum,
              "payOrderNum":mylist.payOrderNum,
              "perTicketSale":mylist.perTicketSale.toFixed(2),
              "payRate":mylist.payRate,
              "afterPurchaseOrderNum":mylist.afterPurchaseOrderNum,
              "guestSingular":mylist.guestSingular,
              "afterPurchaseOrderSum":mylist.afterPurchaseOrderSum,
              "productPrice":mylist.productPrice.toFixed(2),
              'freightPrice':mylist.freightPrice,
              "enquiriesNum":mylist.enquiriesNum,
              "jumpOutRate":mylist.jumpOutRate,
          }
          console.log(temp,"你是沙雕吗你是沙雕吗")
          this.$refs.hh.change(temp);
          this.$refs.xx.change(temp);
          this.$refs.nim.change(temp);
       
        })
        .catch(res => {
          console.log(res);
        });
    },
    newTime() {
         let mytime=new MyDate();
          this.time1=mytime.getNowtime();
    }
  }
};
</script>
<style lang="scss" scoped>
.p50 {
  padding-left: 20px;
  h1 {
    height: 50px;
    font-size: 16px;
    background-color: rgb(247, 247, 247);
    line-height: 50px;
    padding-left: 10px;
  }
}
</style>