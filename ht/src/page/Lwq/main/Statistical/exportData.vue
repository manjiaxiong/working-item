<template>
  <div>
    <div>
      <time-nav></time-nav>
    </div>
    <div class="type" style="font-size: 16px;margin-left: 10px;">
      <span>报表类型:</span>
      <label class="single"><input type="radio" name="reportType" value="shop" checked />商品报表</label>
    </div>
    <div class="btn" style="width: 100px;height: 40px;margin-left: 10px;">
      <button style="width: 100%;height: 100%;background-color: #324dea;color: #fff;font-size: 17px;border-radius: 5px 5px;" @click="exportData">导出</button>
    </div>
  </div>
</template>
<script>
import api from "@/api/user";
import timeNav from "../timenav";
export default {
  data() {
    return {
      currentPage4: 1,
      list: [],
      all:0,
      time:{}
    };
  },
  components: {
    timeNav
  },
  created() {
    // this.init();
  },
  methods: {
    exportData(){
      if(Object.keys(this.time).length == 0){
        this.$message({
          message: '请选择导出数据日期'
        });
        return 
      }
      api.exportData({
        startDate:this.time.startTime,
        endDate:this.time.endDate
      })
      .then(res=>{
        window.open(res.data)
      })
    },
    init(temp) {
      api
        .getAll({
          startDate: temp ? temp.startTime : null,
          endDate: temp ? temp.endTime : null,
          page: this.currentPage4
        })
        .then(res => {
          console.log(res);
          
          this.list = res.data.data.list;
          this.all=res.data.data.totalRows;
        });
    },
    getTime(val) {
      let time = {
        startTime: val.startDate,
        endTime: val.endDate
      };
      console.log(time)
      this.time = time
      // this.init(time);
    },
    getDate(){

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage4 = val
      var time = this.$store.state.title.time
      console.log(time)
      api
        .getAll({
          startDate: time ? time.startDate : null,
          endDate: time ? time.endDate : null,
          page: val
        })
        .then(res => {
          console.log(res);
          
          this.list = res.data.data.list;
          this.all=res.data.data.totalRows;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
  /*padding-top: 50px;*/
  margin: 0 !important;
}
table {
  width: 70vw;
  text-align: center;
  font-size: 16px;
  tr {
    height: 50px;
    th {
      background-color: rgb(247, 247, 247);
    }
    &.Fock {
      border-bottom: 1px solid rgb(247, 247, 247);
      color: #888;
    }
    //   line-height: 50px;
  }
}
.myheight {
  min-height: 50vh;
}
</style>
