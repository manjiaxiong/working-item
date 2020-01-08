<template>
  <div class="p100">
    <div class="p12">
      <el-button size="medium"
             type="danger"
             @click="shuaxin">刷新</el-button>
      <el-button size="medium"
             type="danger"
             @click="add">添加</el-button>
      <el-select style="margin-left: 30px;" v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <table border="0"
           cellpadding="0"
           cellspacing="0">
      <tr class="bac247 Myflex">
        <th>订阅名称</th>
        <th>添加时间</th>
        <th>操作</th>
      </tr>
      <tr class="juz"
          style="height: 50px;" 
          v-for="(item,index) in list"
          :key="index">
        <td>{{item.subscriptionName}}</td>
        <td>{{item.createTime}}</td>
        <td>
          <el-button size="medium"
             type="danger"
             @click="update(item.id,item.subscriptionName)">修改</el-button>
          <el-button size="medium"
                 type="danger"
                 @click="del(item.id)">删除</el-button>
        </td>
      </tr>
    </table>
    <el-dialog title="添加订阅名" :visible.sync="dialogFormVisible">
      <span class="title">订阅名</span>
      <input type="text" v-model="name" class="nameInput">
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="queding">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改订阅名" :visible.sync="dialogFormVisible1">
      <span class="title">订阅名</span>
      <input type="text" v-model="name1" class="nameInput">
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="queding1">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/user"
export default {
  data () {
    return {
      list:[],//订阅名列表
      dialogFormVisible:false,
      dialogFormVisible1:false,
      name:'',
      name1:'',
      id:'',
      value1:'0',
      options1: [{
        value: '0',
        label: '订阅'
      }, {
        value: '1',
        label: '退订'
      }],
    }
  },
  watch:{
    value1(val){
      this.value1 = val
      api.subscriptionNames({
        type:this.value1
      })
      .then(res=>{
        console.log(res)
        this.list = res.data.data
      })
    }
  },
  created () {
    this.shuaxin();
  },
  methods: {
    add(){
      this.dialogFormVisible = true
      this.name = ''
    },
    shuaxin(){
      api.subscriptionNames({
        type:this.value1
      })
      .then(res=>{
        console.log(res)
        this.list = res.data.data
      })
    },
    queding(){
      this.dialogFormVisible = false
      api.addSubscriptionNames({
        subscriptionNames:this.name,
        type:this.value1
      })
      .then(res=>{
        console.log(res)
        if(res.data.result){
          this.$message({
            message: "添加成功",
            type: "success"
          });
        }else{
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
        this.shuaxin()
      })
    },
    update(id,name){
      this.name1 = name
      this.id = id
      this.dialogFormVisible1 = true
    },
    queding1(){
      this.dialogFormVisible1 = false
      api.updateSubscriptionNames({
        name:this.name1,
        id:this.id
      })
      .then(res=>{
        console.log(res)
        if(res.data.result){
          this.$message({
            message: "修改成功",
            type: "success"
          });
        }else{
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
        this.shuaxin()
      })
    },
    del(id){
      api.delSubscriptionNames({
        id:id
      })
      .then(res=>{
        console.log(res)
        if(res.data.result){
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }else{
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
        this.shuaxin()
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
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  button{
    margin-left: 30px;
  }
}
.title{
  font-size: 18px;
  padding-left: 50px;
  margin-right: 20px;
  line-height: 35px;
}
.nameInput{
  width: 50%;
  height: 35px;
  padding-left: 15px;
  box-sizing: border-box;
  outline: none;
}
</style>