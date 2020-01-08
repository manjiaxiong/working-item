<template>
  <div>
    <div>
      <time-nav></time-nav>
    </div>
    <div class="myheight">
      <table border="0" cellspacing="0">
        <tr class="bck247">
          <th>地址</th>
          <th>IP地址</th>
          <th>国家</th>
          <th>时间</th>
        </tr>
        <tr class="Fock" v-for="(item,index) in list " :key="index">
          <td>{{item.address}}</td>
          <td>{{item.ip}}</td>
          <td>{{item.country}}</td>
          <td>{{item.create_time}}</td>
        </tr>
      </table>
    </div>
    <div class="myheight1">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="totalRows?totalRows:0"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import timeNav from "../timenav";
import api from "@/api/sources";
import MyDate from "@/util/my.js";
export default {
  data() {
    return {
      currentPage3: 1,
      list: [],
      totalRows: 0
    };
  },
  created() {
    this.init();
  },
  methods: {
    handleCurrentChange(val) {},
    handleSizeChange(val) {},
    getTime(val) {
      let time = {
        startTime: val.startDate,
        endTime: val.endDate
      };
      this.init(time);
    },
    getDate() {},
    init(temp) {
      let mytime = new MyDate();

      // console.log(MyDate);
      api
        .User({
          startDate: temp ? temp.startTime : null,
          endDate: temp ? temp.endTime : null,
          page: this.currentPage3
        })
        .then(res => {
          this.list = res.data.data.list;
          this.totalRows = res.data.data.totalRows;
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  components: {
    timeNav
  }
};
</script>
<style lang="scss" scoped>
.myheight {
  // display: flex;
  // padding: 20px 100px 0 50px;
  justify-content: center;
  table {
    // flex: 1;
    width: 100%;
    text-align: center;
    font-size: 16px;
    tr {
      height: 50px;
    }
    .bck247 {
      background-color: rgb(247, 247, 247);
    }
    td {
      // height: ;
      font-size: 16px;
      color: #888;
    }
  }
}
.myheight1 {
  display: flex;
  padding-top: 20px;
  justify-content: center;
  .page {
    margin: auto;
    width: auto;
  }
}
</style>