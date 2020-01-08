<template>
  <div>
    <div class="p100">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr class="bac247 Myflex">
          <th>国家</th>
          <th>商品数量</th>
          <th>订单数</th>
          <th>订单金额</th>
        </tr>
        <tr class="juz" v-for="(item,index ) in list" :key="index">
          <td>{{item.country}}</td>
          <td>{{item.goodcounts}}</td>
          <td>{{item.orders}}</td>
          <td>{{item.orderMoney}}</td>
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
import api from "@/api/shoptongji";
export default {
  data() {
    return {
      currentPage3: 1,
      length: 0,
      list:[]
    };
  },
  created() {
    console.log(this.$route.query)
    var data = this.$route.query
    api.lookCountry({
      goodId:data.id,
      startDate: data.time ? data.time.startTime : null,
      endDate: data.time ? data.time.endTime : null,
      page: this.currentPage3
    })
    .then(res=>{
      console.log(res)
      this.list = res.data.data.list
      this.length = res.data.data.totalRows
    })
  },
  methods: {
    handleSizeChange(){},
    handleCurrentChange(val){
      var data = this.$route.query
      api.lookCountry({
        goodId:data.id,
        startDate: data.time ? data.time.startTime : null,
        endDate: data.time ? data.time.endTime : null,
        page: this.currentPage3
      })
      .then(res=>{
        console.log(res)
        this.list = res.data.data.list
        this.length = res.data.data.totalRows
      })
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