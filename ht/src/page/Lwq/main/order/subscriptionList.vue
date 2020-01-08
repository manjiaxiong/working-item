<template>
  <div class="p100">
    <div class="all">
      <input type="checkbox" class="allChecked" @click="allChecked">
      <span>全选</span>
      <el-button size="medium"
                 type="danger"
                 class="shuaxin"
                 @click="exportOrders">导出列表
      </el-button>
    </div>
      <el-button size="medium"
                 type="danger"
                 class="shuaxin"
                 @click="shuxin">刷新
      </el-button>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.subscriptionName"
          :value="item.id">
        </el-option>
      </el-select>
    <table border="0"
           cellpadding="0"
           cellspacing="0">
      <tr class="bac247 Myflex">
        <th>选择</th>
        <th>国家</th>
        <th>IP</th>
        <th>邮箱</th>
        <th>订阅时间</th>
        <th>订阅详情</th>
      </tr>
      <tr class="juz"
          style="height: 40px;" 
          v-for="(item,index) in list"
          :key="index">
        <td>
          <input type="checkbox" class="checkbox" @click="xuanzhong(index)">
        </td>
        <td class="flex">
          {{item.country}}
        </td>
        <td>{{item.ip}}</td>
        <td>{{item.email}}</td>
        <td>
          <p>{{item.createTime}}</p>
        </td>
        <td>
          <a href="javascript:;" @click="detail(item.subscriptionDetailsRecord)">订阅详情</a>
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
    <el-dialog title="订阅详情" :visible.sync="dialogTableVisible">
      <table>
        <tr style="height: 30px;">
          <th>订阅名称</th>
          <th>是否订阅</th>
        </tr>
        <tr v-for="(i,ind) in gridData" :key="ind" style="text-align: center;height: 30px;">
          <td>{{i.name}}</td>
          <td>{{i.whether}}</td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>

<script>
    import api from "@/api/order.js"
    import api1 from "@/api/user"
    export default {
        data(){
          return {
              list:[],
              task:'',
              page:1,
              totalRows:0,
              detailShow:false,
              orderDetailList:[],
              dialogTableVisible:false,
              gridData: [],
              value:'',
              options:[],
          }
        },
        created() {
            this.init();
        },
        watch:{
          value(val){
            $('.checkbox').each(function(i){
              $(this).prop("checked",false)
            })
            $('.allChecked').prop("checked",false)
            api.subscriptionList({
              page:1,
              subscriptionId:val
            }).then(res => {
                console.log(res);
                this.totalRows = res.data.data.totalRows
                this.list = res.data.data.list
            })
          }
        },
        methods: {
            init() {
              this.page = 1
              api.subscriptionList({
                page:1
              }).then(res => {
                  console.log(res);
                  this.totalRows = res.data.data.totalRows
                  this.list = res.data.data.list
              })
              api1.subscriptionNames()
              .then(res=>{
                console.log(res)
                this.options = res.data.data
              })
            },
            shuxin() {
                this.init();
                this.value = ''
                $('.checkbox').each(function(i){
                  $(this).prop("checked",false)
                })
                $('.allChecked').prop("checked",false)
            },
            detail(subscriptionDetailsRecord){
              this.gridData = []
              for( let key in subscriptionDetailsRecord){
                this.gridData.push({
                  name:key,
                  whether:subscriptionDetailsRecord[key]
                })
              }
              this.dialogTableVisible = true
            },
            numChange(val) {
              $('.checkbox').each(function(i){
                $(this).prop("checked",false)
              })
              $('.allChecked').prop("checked",false)
              console.log(val)
              this.page = val
              api.subscriptionList({
                page:val,
                subscriptionId:this.value
              }).then(res => {
                  console.log(res);
                  this.totalRows = res.data.data.totalRows
                  this.list = res.data.data.list
              })
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
                  newArr.push(value)
                }
              })
              if(newArr.length == 0){
                alert('请至少选择一条订单')
              }else{
                //发送请求
                console.log(newArr)
                api.excelSubscriptionUrl({
                  list:JSON.stringify(newArr)
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
  .is-scrolling-none{
    text-align: center;
  }
</style>
