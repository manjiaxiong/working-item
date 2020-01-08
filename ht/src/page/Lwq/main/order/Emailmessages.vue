

<template>
  <div>
    <div class="pd12">
      <div class="all" style="display: inline-block;margin-left: 35px;">
        <input type="checkbox" class="allChecked" @click="allChecked">
        <span style="font-size: 15px;">全选</span>
        <el-button size="medium"
                   type="danger"
                   class="shuaxin"
                   @click="delEmail">批量删除
        </el-button>
        <el-button size="medium"
                   type="danger"
                   class="shuaxin"
                   @click="exportEmail">批量导出
        </el-button>
      </div>
      <el-button size="medium" type="danger" @click="shuxin(page)">刷新</el-button>
      <div class="searh">
        <div class="block" style="display: inline-block;">
          <el-date-picker
            v-model="value1"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <input type="text" autocomplete="off" placeholder="通过email搜索" v-model="email">
        <button @click="getOrders" style="width: 60px;height: 35px;">搜索</button>
      </div>
    </div>
    <div class="p100">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr class="bac247 Myflex">
          <th>选择</th>
          <th>邮件地址</th>
          <th>名字</th>
          <th>电话号码</th>
          <th>问题</th>
          <th>时间</th>
          <th>加入电子简报</th>
        </tr>
        <tr class="juz" v-for="(item,index) in arr" :key="index" style="height: 30px;">
          <td>
            <input type="checkbox" class="checkbox" @click="xuanzhong(index)">
          </td>
          <td>{{item.email}}</td>
          <td>{{item.name }}</td>
          <td>{{item.phone}}</td>
          <td style="width: 15%;">
            <div @click="questionDetail(item.question)" style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;cursor: pointer;">{{item.question}}</div>
          </td>
          <td>{{item.creatTime}}</td>
          <td>{{item.addUs==1?'是':'否'}}</td>
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
import api from "@/api/email";
export default {
  data() {
    return {
      page: 1,
      totalRows: 0,
      arr:[],
      email:'',
      value1: '',
      dialogVisible:false,
      question:'',
    };
  },
  created() {
    this.shuxin();
  },
  methods: {
    questionDetail(question){
      this.question = question
      this.dialogVisible = true
    },
    handleClose(){
      this.dialogVisible = false
    },
    xuanzhong(index){
      var all = true
      if($('.checkbox').eq(index).is(":checked")){
        this.arr[index].checked = true
      }else{
        this.arr[index].checked = false
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
        this.arr.forEach(function(value,index){
          value.checked = true
        })
      }else{
        this.arr.forEach(function(value,index){
          value.checked = false
        })
      }
    },
    delEmail(){
      var newArr = []
      console.log(this.arr)
      this.arr.forEach(function(value,index){
        console.log(value.checked)
        if(value.checked){
          newArr.push(value.id)
        }
      })
      if(newArr.length == 0){
        alert('请至少选择一条邮件')
      }else{
        //发送请求
        console.log(newArr)
        api.delEmailMessage({
          ids:JSON.stringify(newArr)
        })
        .then(res=>{
          console.log(res)
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.shuxin()
        })
      }
    },
    exportEmail(){
      var emailArr = []
      console.log(this.arr)
      this.arr.forEach(function(value,index){
        console.log(value.checked)
        if(value.checked){
          emailArr.push(value.id)
        }
      })
      if(emailArr.length == 0){
        alert('请至少选择一条邮件')
      }else{
        //发送请求
        console.log(emailArr)
        api.exportEmailMessageUrl({
          ids:JSON.stringify(emailArr)
        })
        .then(res=>{
          console.log(res)
          window.open(res.data)
        })
      }
    },
    shuxin() {
      this.email = ''
      this.value1 = ''
      $('.checkbox').each(function(i){
        $(this).prop("checked",false)
      })
      $('.allChecked').prop("checked",false)
      api
        .address({
          page: 1,
          size: 10
        })
        .then(res => {
          console.log(res);
          if (res.data.code == "000000") {
            this.arr = res.data.data.list;
            this.totalRows = res.data.data.totalRows;
          }
        });
    },
    numChange(val) {
      $('.checkbox').each(function(i){
        $(this).prop("checked",false)
      })
      $('.allChecked').prop("checked",false)
      console.log(val)
      this.page = val
      api
        .address({
          page: val,
          email:this.email,
          createTime:this.value1,
          size: 10
        })
        .then(res => {
          console.log(res);
          this.arr = res.data.data.list;
          this.totalRows = res.data.data.totalRows;
        });
    },
    getOrders(){
      $('.checkbox').each(function(i){
        $(this).prop("checked",false)
      })
      $('.allChecked').prop("checked",false)
      api
        .address({
          page: 1,
          email:this.email,
          createTime:this.value1,
          size: 10
        })
        .then(res => {
          console.log(res);
          this.arr = res.data.data.list;
          this.totalRows = res.data.data.totalRows;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
  .p100 {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .pd12{
    display: inline-block;
    width: 100%;
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
    // margin-left: 10%;
    font-size: 16px;
    color: #888;
  }
  .juz {
    text-align: center;
    td {
      padding: 10px 0;
    }
  }
  tr:hover {
    background: rgb(242, 242, 242);
  }
  .searh{
    width: 40%;
    float: right;
  }
  .searh input{
    width: 35%;
    height: 35px;
    padding-left: 10px;
    box-sizing: border-box;
  }
</style>
