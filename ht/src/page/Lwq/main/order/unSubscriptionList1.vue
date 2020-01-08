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
      <el-button size="medium"
                 type="danger"
                 class="shuaxin"
                 @click="handles">批量处理
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
      <el-select v-model="state" placeholder="请选择">
        <el-option
          v-for="item in stateList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    <table border="0"
           cellpadding="0"
           cellspacing="0">
      <tr class="bac247 Myflex">
        <th>选择</th>
        <th>邮箱</th>
        <th>退订项</th>
        <th>类型</th>
        <th>时间</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      <tr class="juz"
          style="height: 40px;" 
          v-for="(item,index) in list"
          :key="index">
        <td>
          <input type="checkbox" class="checkbox" @click="xuanzhong(index)">
        </td>
        <td class="flex">
          {{item.email}}
        </td>
        <td>{{item.subscriptionName}}</td>
        <td>{{item.subscriptiontype}}</td>
        <td>
          <p>{{item.createTime}}</p>
        </td>
        <td>
          <p v-if="item.state == 0">未处理</p>
          <p v-else>已处理</p>
        </td>
        <td>
          <button class="handle" v-if="item.state == 0" @click="handleSubscription(item.id)">处理</button>
          <button class="handle" v-else style="background-color: green;">已处理</button>
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
              gridData: [],
              value:'',
              options:[],
              state:'',
              stateList:[
              {
                name:'未处理',
                id:'0'
              },{
                name:'已处理',
                id:'1'
              }]
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
            this.value = val
            api.subscriptionLog({
              type:'1',
              page:1,
              state:this.state,
              subscriptionId:val
            }).then(res => {
                console.log(res);
                this.totalRows = res.data.data.totalRows
                this.list = res.data.data.list
            })
          },
          state(val){
            $('.checkbox').each(function(i){
              $(this).prop("checked",false)
            })
            $('.allChecked').prop("checked",false)
            this.state = val
            api.subscriptionLog({
              type:'1',
              page:1,
              subscriptionId:this.value,
              state:val
            }).then(res => {
                console.log(res);
                this.totalRows = res.data.data.totalRows
                this.list = res.data.data.list
            })
          }
        },
        methods: {
            handleSubscription(id){
              let _this = this
              let ids = []
              ids.push(id+'')
              var msg = confirm('确定已处理吗？')
              if(msg == true){
                api.subscriptionLogState({
                  ids:JSON.stringify(ids),
                  state:'1'
                }).then(res=>{
                  console.log(res)
                  if(res.data.result){
                    this.$message({
                        showClose: true,
                        type: "success",
                        message: "操作成功"
                    });
                    _this.shuxin()
                  }
                })
              }
            },
            init() {
              this.page = 1
              api.subscriptionLog({
                type:'1',
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
                this.state = ''
                $('.checkbox').each(function(i){
                  $(this).prop("checked",false)
                })
                $('.allChecked').prop("checked",false)
            },
            numChange(val) {
              $('.checkbox').each(function(i){
                $(this).prop("checked",false)
              })
              $('.allChecked').prop("checked",false)
              console.log(val)
              this.page = val
              api.subscriptionLog({
                type:'1',
                page:val,
                state:this.state,
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
              let newArr = []
              console.log(this.list)
              this.list.forEach(function(value,index){
                console.log(value.checked)
                if(value.checked){
                  newArr.push(value)
                }
              })
              if(newArr.length == 0){
                alert('请至少选择一条订阅')
              }else{
                //发送请求
                console.log(newArr)
                api.excelsubscriptionLogUrl({
                  list:JSON.stringify(newArr)
                })
                .then(res=>{
                  console.log(res)
                  window.open(res.data)
                })
              }
            },
            handles(){
              let newArr = []
              let _this = this
              console.log(this.list)
              this.list.forEach(function(value,index){
                console.log(value.checked)
                if(value.checked){
                  newArr.push(value.id+'')
                }
              })
              if(newArr.length == 0){
                alert('请至少选择一条订阅')
              }else{
                var msg = confirm('确定已处理吗？')
                if(msg){
                  //发送请求
                  console.log(newArr)
                  api.subscriptionLogState({
                    ids:JSON.stringify(newArr),
                    state:'1'
                  }).then(res=>{
                    console.log(res)
                    if(res.data.result){
                      this.$message({
                          showClose: true,
                          type: "success",
                          message: "操作成功"
                      });
                      _this.shuxin()
                    }
                  })
                }
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
  .handle{
    background-color: blue;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    outline: none;
    cursor: pointer;
  }
</style>
