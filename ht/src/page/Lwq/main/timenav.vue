<template>
  <div class="timenav">
    <div id="date">
      <span class="time">时间:</span>
      <div class="block">
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
    </div>
    </div>
    <div  class="timenav" id="btn1">
    <button class="btn" @click="SendTime">查询</button>
    <!-- <div class="search">
      <el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input2"></el-input>
    </div> -->
      <button class="btn" @click="shuaxin">刷新</button>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      input2: ""
    };
  },
  watch:{
    value2:{
      handler(){
          // this.SendTime();
      },
      deep:true,
      immediate:true

    }
  },
  methods: {
    SendTime() {
      console.log(this.value2)
      let value2 = this.value2;
      let startRi = value2[0].getDate()<10?'0'+value2[0].getDate():value2[0].getDate(); //第几天
      let startYue = value2[0].getMonth() + 1<10?"0"+(value2[0].getMonth() + 1):value2[0].getMonth() + 1; //第几个月
      let startNian = value2[0].getFullYear();
      let endRi = value2[1].getDate()<10?'0'+value2[1].getDate():value2[1].getDate(); //第几天; //第几天
      let endYue = value2[1].getMonth() + 1<10?"0"+(value2[1].getMonth() + 1):value2[1].getMonth() + 1; //第几个月
      let endNian = value2[1].getFullYear();
      var temp = {
        startDate: startNian + "-" + startYue + "-" + startRi,
        endDate: endNian + "-" + endYue + "-" + endRi
      };

      this.$parent.getTime(temp); //将时间给父亲
      this.$store.commit('title/time',temp)
    },
    shuaxin(){
      this.$parent.init();
    }
  }
};
</script>

<style lang="scss">
.timenav {
  display: flex;
  align-items: center;
  /*justify-content: space-around;*/
  cursor: pointer;
  padding: 5px;
  .block {
    display: inline;

  }
  .time {
    font-size: 16px;
  }
  .btn {
    width: 60px;
    height: 30px;
    font-size: 15px;
    margin: 0 2px;
    background-color: rgb(49, 71, 243);
    color: #fff;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    border-style: none;
    cursor: pointer;
  }
  .search {
    display: inline-block;
    margin-left: 50px;
    input {
      //   width: 100px;
      //   height: 30px;
    }
  }
  .daohcubtn {
    color: #FFFFFF;
    font-size: 20px;
    display: inline-block;
    float: right;
    width: 73px;
    height: 28px;
    margin-right: 50px;
    background-color: rgb(125, 125, 195);
    border-style: none;
    border-radius: 5px;
  }
}
#date{
  display: inline-block;
}
#btn1{
  display: inline-block;
}
</style>
