<template>
  <div>
    <div>
      <time-nav></time-nav>
    </div>
    <div class="p100">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr class="bac247 Myflex">
          <th>商品图片</th>
          <th>商品名字</th>
          <th>价格</th>
          <th>访问量</th>
          <th>总件数</th>
          <th>成交订单数</th>
          <th>订单金额</th>
          <th>国家销量分布</th>
          <th>趋势</th>
        </tr>
        <tr class="juz" v-for="(item,index ) in list" :key="index">
          <td class="img">
            <div>
              <img :src="item.good_show" alt srcset />
            </div>
          </td>
          <td>
            <div class="maxwidth">
              <p  @click="goPcDetail(item.id)" style="cursor: pointer;">{{item.goodNames}}</p>
              <!-- <p>123</p> -->
            </div>
          </td>
          <td>{{item.goodPrice}}</td>
          <td>{{item.fangwenliang}}</td>
          <td>{{item.goodcounts}}</td>
          <td>{{item.orders}}</td>
          <td>{{item.orderprice}}</td>
          <td>
            <span @click="lookCountry(item.id)">查看</span>
          </td>
          <td class="qushi">
            <img src="../../../../assets/imges/houtai/qushi.png" alt="" @click="getShopTrend(item.id)">
          </td>
        </tr>
      </table>
    </div>
    <div class="juz1">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="length"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import MyCommoditytable from "./Table/commodityTable";
import timeNav from "../timenav";
import api from "@/api/shoptongji";
import MyDate from "@/util/my.js";
export default {
  components: {
    MyCommoditytable,
    timeNav
  },
  data() {
    return {
      currentPage3: 1,
      length: 0,
      list:[],
      time:''
    };
  },
  created() {
    this.init();
  },
  methods: {
    goPcDetail(id){
      window.open('http://www.geechori.com/guige?id='+id)
    },
    lookCountry(id){
      this.$router.push({
        path : "/index/main/lookCountry",
        query : {//query是跳转是传递的参数，对象类型
            id : id,
            time:this.time,
            page:this.currentPage3
        }
      })
    },
    getShopTrend(id){
      this.$router.push({
          path : "/index/main/shopSreceived",
          query : {//query是跳转是传递的参数，对象类型
              id : id
          }
      })
    },
    getTime(val) {
      let time = {
        startTime: val.startDate,
        endTime: val.endDate
      };
      this.time = time
      this.init(time);
    },
    getDate() {},
    init(temp) {
      let mytime = new MyDate();
      api
        .get({
          startDate: temp ? temp.startTime : null,
          endDate: temp ? temp.endTime : null,
          page: this.currentPage3
        })
        .then(res => {
          console.log(res)
          this.list = res.data.data.list;
          this.length = res.data.data.totalRows;
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleSizeChange() {},
    handleCurrentChange() {
      this.init(this.time);
    }
  }
};
</script>
<style lang="scss" scoped>
.juz1 {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
.p100 {
  // padding: 10px 50px;
  display: flex;
  justify-content: center;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 50px;
  }
}
.Myflex {
  text-align: center;
  height: 50px;
}
.bac247 {
  background-color: rgb(247, 247, 247);
}
table {
  width: 90%;
  font-size: 16px;
}
.juz {
  text-align: center;
  td {
    padding: 10px 0;
  }
}
.maxwidth {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.qushi{
  img {
    height: 40px;
    width: 40px;
    vertical-align:middle;
  }
}
</style>