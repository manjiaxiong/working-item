<template>
  <div class="app">
    <div class="userInfo-top">
      <div class="userInfo-img">
        <img src="../../../../assets/imges/houtai/user1.png" alt="">
      </div>
      <div class="userInfo-left">
        <p>注册邮箱:{{userInfo.email}}</p>
        <p>注册国家:{{userInfo.country}}</p>
        <p>注册时间:{{userInfo.create_time}}</p>
      </div>
      <div class="userInfo-right">
        <p>姓名:{{userInfo.username}}</p>
        <p>电话:{{userInfo.phone}}</p>
        <p>地址:{{userInfo.address}}</p>
      </div>
    </div>
    <el-select v-model="value" style="margin-left: 30px;margin-bottom: 20px;" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    
    <!-- 购物车 -->
    <table border="0"
           cellpadding="0"
           cellspacing="0"
           v-if="value=='0'">
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
        <td>${{item.goodNum*item.goodPrice}}</td>
      </tr>
    </table>
    <!-- 收藏 -->
    <table border="0"
           cellpadding="0"
           cellspacing="0"
           v-else-if="value=='1'">
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
    <table border="0"
           cellpadding="0"
           cellspacing="0"
           v-else>
      <tr class="bac247 Myflex">
        <th>订单号</th>
        <th style="width: 20%;">联系方式</th>
        <th style="width: 20%;">购买地址</th>
        <th>运费</th>
        <th>总计</th>
        <th>订单状态</th>
        <th>时间</th>
        <th>留言</th>
        <th>订单详情</th>
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
          <p v-if="item.state == 1">已处理</p>
          <p v-else>未处理</p>
        </td>
        <td>{{item.createTime}}</td>
        <td style="width: 15%;">
          <div @click="questionDetail(item.question)" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;cursor: pointer;">{{item.question}}</div>
        </td>
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
      >
        
      </el-pagination>
    </div>
    <div class="mask" v-if="detailShow">
      <!-- 设置蒙版 -->
    </div>
    <div class="detail" v-if="detailShow" style="max-height: 80%;overflow: hidden;overflow-y: scroll;">
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
  </div>
</template>

<script>
import api from "@/api/fuck";
import api1 from "@/api/order.js"
export default {
  data() {
    return {
      options:[{
        value:'0',
        label:'购物车'
      },{
        value:'1',
        label:'收藏'
      },{
        value:'2',
        label:'询盘管理'
      },{
        value:'3',
        label:'订单管理'
      }],
      value:'0',
      arr:[],
      page:1,
      totalRows:0,
      userInfo:'',
      show:true,
      list:[],
      detailShow:false,
      orderDetailList:[],
      dialogVisible:false,
      question:'',
    };
  },
  watch:{
    value(val){
      this.value = val
      if(val == '0'){//购物车
        api.User({
          page:1,
          email:this.$route.query.email
        }).then(res => {
          console.log(res);
          this.arr = res.data.data.list;
          this.totalRows = res.data.data.totalRows;
        })
      }else if(val == '1'){//收藏
        api.listCollection({
          b:'true',
          page:1,
          userEmail:this.$route.query.email
        }).then(res=>{
          console.log(res.data.data)
          this.list = res.data.data.data
          this.totalRows = res.data.data.totalRows;
        })
      }else if(val == '2'){//询盘
        api1.findOrderAllLike({
          page:1,
          state:0,
          email:this.$route.query.email
        }).then(res => {
            console.log(res.data);//所有订单信息
            this.list=res.data.data.list;
            this.totalRows = res.data.data.totalRows;
        })
      }else if(val == '3'){//询盘
        api1.findOrderAllLike({
          page:1,
          state:1,
          email:this.$route.query.email
        }).then(res => {
            console.log(res.data);//所有订单信息
            this.list=res.data.data.list;
            this.totalRows = res.data.data.totalRows;
        })
      }
    }
  },
  created() {
    api.getUser({
      email:this.$route.query.email
    }).then(res=>{
      console.log(res)
      this.userInfo = res.data.data
    })
    api.User({
      page: 1,
      email:this.$route.query.email
    }).then(res => {
      console.log(res);
      this.arr = res.data.data.list;
      this.totalRows = res.data.data.totalRows;
    })
  },
  methods: {
    orderDetail(ordernumber){
      this.detailShow = true
      api1.orderDetail(ordernumber)
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
    questionDetail(question){
      this.question = question
      this.dialogVisible = true
    },
    handleClose(){
      this.dialogVisible = false
    },
    goPcDetail(id){
      window.open('http://www.geechori.com/guige?id='+id)
    },
    numChange(val){
      this.page = val
      if(this.value == '0'){//购物车
        api.User({
          page: val,
          email:this.$route.query.email
        }).then(res => {
          console.log(res);
          this.arr = res.data.data.list;
          this.totalRows = res.data.data.totalRows;
        })
      }else if(this.value == '1'){//收藏
        api.listCollection({
          b:'true',
          page:val,
          email:this.$route.query.email
        }).then(res=>{
          console.log(res.data.data)
          this.list = res.data.data.data
          this.totalRows = res.data.data.totalRows;
        })
      }else if(this.value == '2'){//询盘
        api1.findOrderAllLike({
          page:val,
          state:0,
          email:this.$route.query.email
        }).then(res => {
            console.log(res.data);//所有订单信息
            this.list=res.data.data.list;
            this.totalRows = res.data.data.totalRows;
        })
      }else if(this.value == '3'){//订单
        api1.findOrderAllLike({
          page:val,
          state:1,
          email:this.$route.query.email
        }).then(res => {
            console.log(res.data);//所有订单信息
            this.list=res.data.data.list;
            this.totalRows = res.data.data.totalRows;
        })
      }
    }
  },
};
</script>
<style lang="scss" scoped>
  .app{
    width: 100%;
    height: 100%;
  }
  .userInfo-top{
    width: 40%;
    height: 250px;
    .userInfo-img{
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      img{
        width: 100px;
        height: 100px;
      }
    }
    .userInfo-left{
      width: 50%;
      float: left;
    }
    .userInfo-right{
      width: 50%;
      float: left;
    }
    p{
      display: block;
      width: 100%;
      font-size: 16px;
      float: left;
      line-height: 30px;
      padding-left: 20%;
    }
  }
  .img{
    text-align: center;
    margin-top: 20px;
  }
  .juz{
    text-align: center;
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
  .Myflex{
    background-color: #f7f7f7;
    height: 50px;
  }
</style>
