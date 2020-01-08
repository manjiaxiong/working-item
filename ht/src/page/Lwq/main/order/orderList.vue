<template>
  <div class="p100">
      <el-button size="medium"
                 type="danger"
                 @click="shuxin">刷新
      </el-button>
      <div class="searh">
        <input type="text" autocomplete="off" placeholder="通过订单号搜索订单" v-model="ordernumber">
        <input type="text" autocomplete="off" placeholder="通过国家搜索订单" v-model="address">
        <input type="text" autocomplete="off" placeholder="通过email搜索订单" v-model="task">
        <button @click="getOrders" style="width: 60px;height: 35px;">搜索</button>
      </div>
    <table border="0"
           cellpadding="0"
           cellspacing="0">
      <tr class="bac247 Myflex">
        <th>订单号</th>
        <th>联系方式</th>
        <th style="width: 20%;">购买地址</th>
        <th>运费</th>
        <th>总计</th>
        <th>订单状态</th>
        <th>时间</th>
        <th>留言</th>
        <th>订单详情</th>
        <th>操作</th>
      </tr>
      <tr class="juz"
          v-for="(item,index) in list"
          :key="index">
        <td class="flex" style="line-height: 50px;">
          <!--订单号-->
          {{item.ordernumber}}
        </td>
        <td style="text-align: left;width: 15%;">
          <p style="padding-left: 30px;box-sizing: border-box;">姓名:{{item.name}}</p>
          <p style="padding-left: 30px;box-sizing: border-box;">邮箱:{{item.email}}</p>
          <p style="padding-left: 30px;box-sizing: border-box;">电话:{{item.phone}}</p>
        </td>
        <td>{{item.address}}</td>
        <td>-</td>
        <td>{{item.orderMoney}}</td>
        <td>
          <p v-if="item.state == 0">未处理</p>
          <p v-if="item.state == 1">已处理</p>
        </td>
        <td>{{item.createTime}}</td>
        <td style="width: 15%;">
          <div @click="questionDetail(item.question)" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;cursor: pointer;">{{item.question}}</div>
        </td>
        <td>
          <a href="javascript:;" @click="orderDetail(item.ordernumber)">订单详情</a>
        </td>
        <td>
          <el-button 
            type="info"
            round
            @click="deleteOrder(item.ordernumber)"
          >
            删除
          </el-button>
          <el-button 
            type="primary"
            round
            v-if="item.state == 1"
            class="ok"
          >
              已处理
          </el-button>
          <el-button 
            type="primary"
            round
            v-else
            @click="handle(item.ordernumber)"
          >
            处理
          </el-button>
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

    <!-- 留言弹窗 -->
    <el-dialog
      title="留言详情"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <p>{{question}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <div class="mask" v-if="detailShow">
      <!-- 设置蒙版 -->
    </div>
    <div class="detail" v-if="detailShow" style="height: 80%;overflow: hidden;overflow-y: scroll;">
      <div class="close" @click="closeDetail" style="cursor: pointer;">
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
              task:'',//邮箱
              ordernumber:'',//订单号
              address:'',//国家
              page:1,
              changePage:1,
              totalRows:0,
              detailShow:false,
              orderDetailList:[],
              dialogVisible:false,
              question:'',
          }
        },
        created() {
            this.init();
        },
        methods: {
          goPcDetail(id){
            window.open('http://www.geechori.com/guige?id='+id)
          },
          questionDetail(question){
            this.question = question
            this.dialogVisible = true
          },
          handleClose(){
            this.dialogVisible = false
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
          },
          handle(id){
            var msg = confirm('确定已处理吗？')
            if(msg == true){
              api.handleOrder(id)//确认处理
              .then(res=>{
                if(res.data.result == true){
                  this.init();
                }
              })
            }
          },
          deleteOrder(id){
            var msg = confirm('确定删除订单吗？')
            if(msg == true){
              api.deleteOrder(id)//确认删除
              .then(res=>{
                if(res.data.result == true){
                  this.init();
                }
              })
            }
          },
          getOrders(){
            api.findOrder({
              email:this.task,
              ordernumber:this.ordernumber,
              address:this.address,
              state:1,//0为询盘管理，1为订单管理
              page:1
            })
            .then(res=>{
              console.log(res)
              this.list = res.data.data.list
              this.totalRows = res.data.data.totalRows;
            })
          },
          numChange(val) {
            console.log(val)
            this.changePage = val
            api.findOrder({
              email:this.task,
              ordernumber:this.ordernumber,
              address:this.address,
              state:0,
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
          }
        }
    };
</script>
<style lang="scss" scoped>
  .p100 {
    padding: 10px 20px;
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
    border-collapse: separate;
    border-spacing: 0px 5px;
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
    width: 70%;
    float: right;
  }
  .searh input{
    width: 20%;
    height: 35px;
    padding-left: 10px;
    box-sizing: border-box;
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
