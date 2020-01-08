<template>
  <div class="p100">
    <div class="p12">
          <el-button size="medium"
                 type="danger"
                 @click="shuaxin">刷新</el-button>
                 </div>
    <div class="searh">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <input type="text" autocomplete="off" placeholder="通过昵称搜索" v-model="username">
        <input type="text" autocomplete="off" placeholder="通过国家搜索" v-model="country">
        <input type="text" autocomplete="off" placeholder="通过email搜索" v-model="task">
        <button @click="getOrders" style="width: 60px;height: 35px;">搜索</button>
      </div>
    <table border="0"
           cellpadding="0"
           cellspacing="0">
      <tr class="bac247 Myflex">
        <th>Email</th>
        <th>IP</th>
        <th>终端类型</th>
        <th>商品图片</th>
        <th>商品名称</th>
        <th>创建时间</th>
        <th>商品价格</th>
        <th>商品数量</th>
        <th>总额</th>
      </tr>
      <tr class="juz"
          style="height: 60px;" 
          v-for="(item,index) in arr"
          :key="index">
        <td>{{item.userId}}</td>
        <td>{{item.ip}}</td>
        <td v-if="item.terminalType == 0">PC端</td>
        <td v-else>移动端</td>
        <td>
          <img :src="item.goodImg" style="width: 50px;height: 50px;" alt="">
        </td>
        <td @click="goPcDetail(item.goodId)" style="cursor: pointer;color: blue;">{{item.goodNames}}</td>
        <td>{{item.createTime}}</td>
        <td>{{item.goodPrice}}</td>
        <td>{{item.goodNum}}</td>
        <td>{{item.goodNum*item.goodPrice}}</td>
      </tr>
    </table>
    <div class="img">
      <el-pagination background
                     :current-page="page"
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
      page: 1,
      arr: [],
      totalRows: 0,
      task:'',//邮箱
      username:'',//昵称
      country:'',//国家
      options: [{
        value: '1',
        label: '降序'
      }, {
        value: '0',
        label: '升序'
      }],
      value: ''
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
      this.username = ''
      this.country = ''
      this.value = ''
      api.User({
        page: this.page ? this.page : 1,
        size: 10
      }).then(res => {
        console.log(res);
        this.arr = res.data.data.list;
        this.totalRows = res.data.data.totalRows;
      })
    },
    numChange (val) {
      this.page = val
      api.User({
        page: this.page,
        task:this.task,//邮箱
        username:this.username,//昵称
        country:this.country,//国家
        createTime:this.value,
        size: 10
      }).then(res => {
        console.log(res);
        this.arr = res.data.data.list;
        this.totalRows = res.data.data.totalRows;
      })
    },
    getOrders(){
      api.User({
        page: 1,
        email:this.task,//邮箱
        username:this.username,//昵称
        country:this.country,//国家
        createTime:this.value,
        size: 10
      }).then(res => {
        console.log(res);
        this.arr = res.data.data.list;
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
    width: 70%;
    float: right;
    margin-right: 100px;
  }
  .searh input{
    width: 20%;
    height: 35px;
    padding-left: 10px;
    box-sizing: border-box;
  }
</style>