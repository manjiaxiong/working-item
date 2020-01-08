<template>
  <div class="p100">
    <div class="p12">
          <el-button size="medium"
                 type="danger"
                 @click="shuaxin">刷新</el-button>
                 </div>
    <div class="searh">
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <input type="text" autocomplete="off" placeholder="通过商品名称搜索" v-model="name">
        <input type="text" autocomplete="off" placeholder="通过国家搜索" v-model="country">
        <input type="text" autocomplete="off" placeholder="通过email搜索" v-model="task">
        <button @click="getOrders" style="width: 60px;height: 35px;">搜索</button>
      </div>
    <table border="0"
           cellpadding="0"
           cellspacing="0">
      <tr class="bac247 Myflex">
        <th>商品图片</th>
        <th>商品名称</th>
        <th>终端类型</th>
        <th>国家</th>
        <th>创建时间</th>
        <th>用户邮箱</th>
      </tr>
      <tr class="juz"
          v-for="(item,index) in list"
          :key="index">
        <td><img :src="item.goodImg" alt="" style="width: 50px;height: 50px;"></td>
        <td @click="goPcDetail(item.id)" style="cursor: pointer;color: blue;">{{item.goodNames}}</td>
        <td v-if="item.portType == 0">PC端</td>
        <td v-else>移动端</td>
        <td>{{item.country}}</td>
        <td>{{item.createTime}}</td>
        <td>{{item.email}}</td>
      </tr>
    </table>
    <div class="img">
      <el-pagination background
                     :current-page="page"
                     :page-size="10"
                     @current-change="numChange"
                     layout="prev, pager, next"
                     :total="totalRows"></el-pagination>
    </div>
  </div>
</template>

<script>
import api from "@/api/user"
export default {
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      page: 1,
      totalRows: 0,
      task:'',//邮箱
      name:'',//商品名称
      country:'',//国家
      options: [{
        value: '1',
        label: '移动端'
      }, {
        value: '0',
        label: 'pc端'
      }],
      value: '',
      value2: '',
      list:[],//收藏列表
    }
  },
  created () {
    this.shuaxin();
  },
  methods: {
    goPcDetail(id){
      window.open('http://www.geechori.com/guige?id='+id)
    },
    shuaxin () {
      this.task = ''
      this.name = ''
      this.country = ''
      this.value = ''
      this.value2 = ''
      api.listCollection({
        page:1
      }).then(res=>{
        console.log(res.data.data)
        this.list = res.data.data.data
        this.totalRows = res.data.data.totalRows;
      })
    },
    numChange (val) {
      this.page = val
      api.listCollection({
        page: val,
      }).then(res=>{
        console.log(res.data.data)
        this.list = res.data.data.data
        this.totalRows = res.data.data.totalRows;
      })
    },
    getOrders(){
      console.log(this.value2)
      api.listCollection({
        page: this.page,
        email:this.task,//邮箱
        goodName:this.name,//商品名称
        country:this.country,//国家
        startDate:this.value2[0],
        endDate:this.value2[1],
        portType:this.value
      }).then(res=>{
        console.log(res.data.data)
        this.list = res.data.data.data
        this.totalRows = res.data.data.totalRows;
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.p100 {
    padding: 5px;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.Myflex {
  text-align: center;
  height: 50px;
  color: #222;
}
.bac247 {
  background-color: rgb(247, 247, 247);
}
table {
  width: 100%;

  font-size: 16px;
  color: #888;
}
.juz {
  text-align: center;
  td {
    padding: 10px 5px;

  }
}
tr:hover{
  background: rgb(242, 242, 242);
}
.p12{
  display: inline-block;
}
.searh{
    width: 85%;
    float: right;
    margin-right: 50px;
  }
  .searh input{
    width: 12%;
    height: 35px;
    padding-left: 10px;
    box-sizing: border-box;
  }
</style>