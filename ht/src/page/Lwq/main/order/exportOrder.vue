<template>
  <div class="p100">
    <div class="all">
      <input type="checkbox" class="allChecked" @click="allChecked">
      <span>全选</span>
      <el-button size="medium"
                 type="danger"
                 class="shuaxin"
                 @click="exportOrders">导出订单
      </el-button>
    </div>
      <el-button size="medium"
                 type="danger"
                 class="shuaxin"
                 @click="shuxin">刷新
      </el-button>
      <div class="searh">
        <input type="text" placeholder="通过email搜索订单" v-model="task">
        <button @click="getOrders">搜索</button>
      </div>
    <table border="0"
           cellpadding="0"
           cellspacing="0">
      <tr class="bac247 Myflex">
        <th>选择</th>
        <th>订单号</th>
        <th>名字</th>
        <th>email</th>
        <th>电话</th>
        <th style="width: 20%;">购买地址</th>
        <th>运费</th>
        <th>总计</th>
        <th>订单状态</th>
        <th>时间</th>
        <th>订单详情</th>
      </tr>
      <tr class="juz"
          v-for="(item,index) in list"
          :key="index">
        <td>
          <input type="checkbox" class="checkbox" @click="xuanzhong(index)">
        </td>
        <td class="flex">
          <!--订单号-->
          {{item.ordernumber}}
        </td>
        <td>{{item.name}}</td>
        <td>{{item.email}}</td>
        <td>
          <p>{{item.phone}}</p>
        </td>
        <td>{{item.address}}</td>
        <td>-</td>
        <td>{{item.orderMoney}}</td>
        <td>
          <p v-if="item.state == 0">未处理</p>
          <p v-if="item.state == 1">已处理</p>
        </td>
        <td>{{item.createTime}}</td>
        <td>
          <a href="javascript:;" @click="orderDetail(item.ordernumber)">订单详情</a>
        </td>
      </tr>
    </table>
    <div class="img">
      <el-pagination
          background
          :current-page="page"
          @current-change="numChange"
          layout="prev, pager, next"
          :total="totalRows"
        ></el-pagination>
    </div>
    <div class="mask" v-if="detailShow">
      <!-- 设置蒙版 -->
    </div>
    <div class="detail" v-if="detailShow">
      <div class="close" @click="closeDetail">
        <img src="../../../../assets/imges/kaiguan/close.png" alt="">
      </div>
          <table border="0"
             cellpadding="0"
             cellspacing="0">
        <tr class="bac247 Myflex">
          <th>图片</th>
          <th>名称</th>
          <th>型号</th>
          <th>产品规格</th>
          <th>单价</th>
          <th>数量</th>
        </tr>
        <tr class="juz"
            v-for="(item,index) in orderDetailList"
            :key="index">
          <td>
            <img :src="item.goodImg" alt="" class="detailImg">
          </td>
          <td @click="goPcDetail(item.goodId)" style="cursor: pointer;">{{item.goodNames}}</td>
          <td>{{item.xinghao}}</td>
          <td>
            <ul>
              <li v-for="(i,index) in item.sku">
                <p v-if="JSON.parse(item.parameterName)[0]">{{JSON.parse(item.parameterName)[0]}}:{{i.size}}</p>
                <p v-if="JSON.parse(item.parameterName)[1]">{{JSON.parse(item.parameterName)[1]}}:{{i.color}}</p>
                <p v-if="JSON.parse(item.parameterName)[2]">{{JSON.parse(item.parameterName)[2]}}:{{i.page}}</p>
              </li>
            </ul>
          </td>
          <td>{{item.sku[0].price * item.goodcount}}</td>
          <td>{{item.goodcount}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
    import api from "@/api/order.js"

    export default {
        data(){
          return {
              list:[],
              task:'',
              page:1,
              changePage:1,
              totalRows:0,
              detailShow:false,
              orderDetailList:[]
          }
        },
        created() {
            this.init();
        },
        methods: {
          goPcDetail(id){
            window.open('http://www.geechori.com/guige?id='+id)
          },
            init() {
              var page = this.changePage
              api.findOrderAllLike({
                page:page,
                state:1
              }).then(res => {
                  console.log(res.data);//所有订单信息
                  this.list=res.data.data.list;
                  this.totalRows = res.data.data.totalRows;
              })
            },
            shuxin() {
                this.init();
                $('.checkbox').each(function(i){
                  $(this).prop("checked",false)
                })
                $('.allChecked').prop("checked",false)
            },
            getOrders(){
              $('.checkbox').each(function(i){
                $(this).prop("checked",false)
              })
              $('.allChecked').prop("checked",false)
              api.findOrder({
                email:this.task,
                state:1,
                page:1
              })
              .then(res=>{
                console.log(res)
                this.list = res.data.data.list
                this.totalRows = res.data.data.totalRows;
              })
            },
            numChange(val) {
              $('.checkbox').each(function(i){
                $(this).prop("checked",false)
              })
              $('.allChecked').prop("checked",false)
              console.log(val)
              this.changePage = val
              api.findOrder({
                email:this.task,
                state:1,
                page:val
              })
              .then(res=>{
                console.log(res)
                this.list = res.data.data.list
              })
            },
            orderDetail(ordernumber){
              this.detailShow = true
              api.orderDetail(ordernumber)
              .then(res=>{
                console.log(res)
                res.data.data.forEach(function(value,index){
                  var arr = JSON.parse(value.sku)
                  res.data.data[index].sku = arr
                })
                
                this.orderDetailList = res.data.data
              })
            },
            closeDetail(){
              this.detailShow = false
            },
            xuanzhong(index){
              var all = true
              if($('.checkbox').eq(index).is(":checked")){
                this.list[index].checked = true
              }else{
                this.list[index].checked = false
              }
              $('.checkbox').each(function(i){
                if(!$(this).is(":checked")){
                  all = false
                }
              })
              if(all){
                $('.allChecked').prop("checked",true)
              }else{
                $('.allChecked').prop("checked",false)
              }
            },
            allChecked(){
              $('.checkbox').each(function(i){
                console.log($(this).is(':checked'))
                if($('.allChecked').is(":checked")){
                  $(this).prop("checked",true)
                }else{
                  $(this).prop("checked",false)
                }
              })
              if($('.allChecked').is(":checked")){
                this.list.forEach(function(value,index){
                  value.checked = true
                })
              }else{
                this.list.forEach(function(value,index){
                  value.checked = false
                })
              }
            },
            exportOrders(){
              var newArr = []
              console.log(this.list)
              this.list.forEach(function(value,index){
                console.log(value.checked)
                if(value.checked){
                  newArr.push(value.ordernumber)
                }
              })
              if(newArr.length == 0){
                alert('请至少选择一条订单')
              }else{
                //发送请求
                console.log(newArr)
                api.exportOrder({
                  orderNumbers:JSON.stringify(newArr)
                })
                .then(res=>{
                  console.log(res)
                  window.open(res.data)
                })
              }
            }
        }
    };
</script>
<style lang="scss" scoped>
  .p100 {
    padding: 10px 20px;
    .shuaxin{
      margin-top: 15px;
    }
    .all{
      float: left;
      margin-right: 20px;
      margin-left: 15px;
      span{
        font-size: 16px;
      }
    }
  }

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 40px;
  }

  .flex1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    img {
      width: 70px;
      height: 70px;
    }
  }

  .myleft {
    text-align: left;
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
    font-size: 12px;
    color: #888;
  }

  .juz {
    text-align: center;

    td {
      padding: 0 5px;
    }
  }
  .ok{
    background-color: green;
    border-color: green;
  }
  .searh{
    float: right;
    margin-right: 100px;
  }
  .detail{
    /*display: none;*/
    position: fixed;
    top: 100px;
    left: 50%;
    margin-left: -500px;
    background-color: #fff;
    width: 1000px;
  }
  .detail .juz td{
    height: 50px;
  }
  .detail .close{
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background-color: red;
  }
  .detail .close img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
  }
  .detailImg{
    width: 50px;
    height: 50px;
  }
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
  }
</style>
