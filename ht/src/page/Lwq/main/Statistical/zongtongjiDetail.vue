<template>
  <div>
    <div>
      <time-nav></time-nav>
    </div>
    <div>
      <div class="title" style="width: 100%;text-align: center;">
        <h2>{{title}}</h2>
      </div>
      <div class="p100">
        <table border="0"
               cellpadding="0"
               style="width: 100%;" 
               cellspacing="0">
          <tr class="bac247 Myflex">
            <th>日期</th>
            <th>数据</th>
          </tr>
        <tbody>
          <tr class="juz"
              v-for="(item,index) in timeArr"
              :key="item.id">
            <td>{{item}}</td>
            <td style="width: 50%">{{initData[index]}}</td>
          </tr>
        </tbody>
        </table>
      </div>
     <!--  <div class="center">
        <el-pagination @current-change="handleCurrentChange"
                       :page-size="10"
                       background
                       :current-page.sync="currentPage4"
                       :total="all"></el-pagination>
      </div> -->
    </div>
  </div>
</template>
<script>
import api from "@/api/demo";
import timeNav from "../timenav.vue";
export default {
  data() {
    return {
      currentPage4: 1,
      list: [],//总数据
      all:0,
      time:{},
      initData:[],
      timeArr:[],
      title:'',
      initTime:''
    };
  },
  components: {
    timeNav
  },
  created() {
    this.title = this.$route.query.name
    this.initTime = this.$route.query.time
    console.log(this.title,this.initTime,this.data)
  },
  mounted(){
    api.zongtongji({
      page:this.currentPage4,
      startDate:this.initTime[0],
      endTime:this.initTime[this.initTime.length-1]
    })
    .then(res=>{
      console.log(res)
      this.timeArr = res.data.data.dateList
      if(this.title == 'UV'){
        this.initData = res.data.data.uvList
      }else if(this.title == '营业额度'){
        this.initData = res.data.data.turnoverList
      }else if(this.title == '订单数'){
        this.initData = res.data.data.orderNumList
      }else if(this.title == '客单价'){
        this.initData = res.data.data.perTicketSaleList
      }else if(this.title == '复购订单数'){
        this.initData = res.data.data.afterPurchaseOrderNumList
      }else if(this.title == '注册用户'){
        this.initData = res.data.data.enrollList
      }
      this.all = res.data.data.totalRows
      console.log(this.title,this.initData)
    })
  },
  methods: {
    init(temp) {
      api
        .zongtongji({
          startDate: temp ? temp.startTime : null,
          endDate: temp ? temp.endTime : null,
          page: this.currentPage4
        })
        .then(res => {
          console.log(res)
          this.timeArr = res.data.data.dateList
          if(this.title == 'UV'){
            this.initData = res.data.data.uvList
          }else if(this.title == '营业额度'){
            this.initData = res.data.data.turnoverList
          }else if(this.title == '订单数'){
            this.initData = res.data.data.orderNumList
          }else if(this.title == '客单价'){
            this.initData = res.data.data.perTicketSaleList
          }else if(this.title == '复购订单数'){
            this.initData = res.data.data.afterPurchaseOrderNumList
          }else if(this.title == '注册用户'){
            this.initData = res.data.data.enrollList
          }
          this.all = res.data.data.totalRows
          console.log(this.title,this.initData)
        });
    },
    getTime(val) {
      let time = {
        startTime: val.startDate,
        endTime: val.endDate
      };
      console.log(time)
      this.time = time
      this.init(time);
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
    height: 30px;
    &:hover{
      background-color: rgb(242,242,242);
    }
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
