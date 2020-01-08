<template>
  <div class="app">
    <div class="header">
      <input type="text" placeholder="请输入邮箱" v-model="email" class="searchInput">
      <el-button type="danger" @click="search">搜索</el-button>
      <el-button type="danger" @click="init">刷新</el-button>
    </div>
    <div class="center" style="margin-bottom: 100px;">
      <table border="0" cellspacing="0">
        <tr class="color">
          <th>国家</th>
          <th>Email</th>
          <th>注册设备</th>
          <th>注册时间</th>
          <th>购物车</th>
          <th>订单</th>
        </tr>
        <tr class="Myhover" v-for="(item,index ) in list" :key="index">
          <td>
            {{item.country}}
          </td>
          <td style="cursor: pointer;" @click="userDetail(item.email)">
            {{item.email}}
          </td>
          <td v-if="item.portType == 0">PC端</td>
          <td v-else>移动端</td>
          <td>
            {{item.create_time}}
          </td>
          <td>
            {{item.goods}}件
          </td>
          <td>
            {{item.orders}}
          </td>
        </tr>
      </table>
    </div>
    <div class="img" style="width: 100%;text-align: center;">
      <el-pagination
        background
        :current-page="page"
        @current-change="numChange"
        layout="prev, pager, next"
        :total="totalRows"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import api from "@/api/fuck";
export default {
  data() {
    return {
      list:[],
      page:1,
      totalRows:0,
      email:'',
    };
  },
  created() {
    this.init()
  },
  methods: {
    userDetail(email){
      this.$router.push({
          path : "/index/main1/userInfoView",
          query : {//query是跳转是传递的参数，对象类型
              email : email
          }
      })
    },
    numChange(val){
      this.page = val
      api.memberList({
        page:val,
        email:this.email
      }).then(res=>{
        console.log(res)
        this.list = res.data.data.list
        this.totalRows = res.data.data.totalRows
      })
    },
    search(){
      api.memberList({
        page:1,
        email:this.email
      }).then(res=>{
        console.log(res)
        this.list = res.data.data.list
        this.totalRows = res.data.data.totalRows
      })
    },
    init(){
      this.page = 1
      this.email = ''
      api.memberList({
        page:1
      }).then(res=>{
        console.log(res)
        this.list = res.data.data.list
        this.totalRows = res.data.data.totalRows
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.around1 {
  width: 500px;
  display: flex;
  align-items: center;
  padding: 20px 0 20px 20px;
  span {
    display: inline-block;
    width: 100px;
    margin: 0 20px;
  }
}
.preview{
    position: fixed;
    left: 25%;
    top: 10%;
    width: 50%;
    height: 60%;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    z-index: 10000;
    .title{
      width: 100%;
      height: 10%;
      font-size: 24px;
      text-align: center;
    }
    .content{
      height: 80%;
      /*overflow: hidden;*/
      overflow: scroll;
    }
    .dialog-footer{
      width: 100%;
      display: block;
      text-align: center;
      position: absolute;
      bottom: 5%;
    }
  }
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2002;
    background-color: rgba(0,0,0,0.5);
  }

.classification>span{
  font-size: 20px;
  margin-right: 15px;
}
.around{
  margin-top: 10px;
  .el-input{
    width: 80%;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  span{
    margin-right: 15px;
    margin-bottom: 10px;
    display: inline-block;
    font-size: 20px;
  }
}
.fuwen{
  
  span{
    display: inline-block;
    text-align: center;
    width: 100%;
    font-size: 20px;
  }
}
.juzhong{
  margin-top: 20px;
}
.aaa{
  margin: 5px;
}
.center {
  margin: 0;
}
.img {
  width: 200px;
}
.img img {
  width: 200px;
  height: 50px;
}
.p20 {
  padding-left: 5px;
}
.pl50 {
  margin-right: 38px !important;
}
.hiehi {
  margin-right: 10px;
}
.heihei {
  padding-top: 15px;
  padding-left: 40px;
}
.header {
  padding: 5px;
  display: flex;
  align-items: center;
}
th {
  padding: 0 !important;
}
td {
  padding: 0 !important;
}
.el-button {
  padding: 5px;
}
table {
  width: 100%;
  font-size: 16px;
}
.color {
  color: #555;
  background: #f7f7f7;
  th {
    padding: 10px 10px;
  }
}
.Myhover {
  color: #555;
  height: 30px;
  &:hover {
    background-color: rgb(242, 242, 242);
    /*color: #fff;*/
  }
  td {
    text-align: center;
    /*padding: 1px 0;*/
    // border: 1px solid #ccc;

    &:hover {
    }
  }
}
.border {
  display: inline-block;
  border: 1px solid #888;
  padding: 0 20px;
  width: 50px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.juzhong {
  display: flex;
  justify-content: center;
  align-items: center;
}
.lwqimgswtach {
  margin: auto;
  cursor: pointer;
  width: 50px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
}
.el-input .el-input--suffix{
  margin: 5px !important;
}
.searchInput{
  width: 150px;
  height: 30px;
  margin-right: 20px;
  margin-left: 20px;
}
</style>
