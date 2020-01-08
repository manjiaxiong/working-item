<template>
  <div class="app">
    <div class="header">
      <el-button type="danger" @click="dialogTableVisible = true">添加</el-button>
      <el-button type="danger" @click="init">刷新</el-button>
    </div>
    <div class="center" style="margin-bottom: 100px;">
      <table border="0" cellspacing="0">
        <tr class="color">
          <th>分类名称</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
        <tr class="Myhover" v-for="(item,index ) in list" :key="index" style="height: 30px;">
          <td>
            {{item.blogsClasses}}
          </td>
          <td>
            {{item.createTime}}
          </td>
          <td>
            <el-button type="success" @click="mychange(item)">修改</el-button>
            <el-button type="danger" @click="dele(item.id)">删除</el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="img" style="width: 100%;text-align: center;">
        <el-pagination
          background
          :current-page="page"
          :page-size="10"
          @current-change="numChange"
          layout="prev, pager, next"
          :total="totalRows"
        ></el-pagination>
      </div>
    <el-dialog 
      :title="title" 
      center 
      :visible.sync="dialogTableVisible" 
      :close-on-click-modal="false"
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="around">
        <span>分类名称</span>
        <el-input class v-model="name"></el-input>
      </div>
      <!-- 确定 取消按钮 -->
      <div class="juzhong">
        <el-button @click="queding" type="primary">确定</el-button>
        <el-button type="info" @click="quxiao">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog 
      :title="title1" 
      center 
      :visible.sync="dialogTableVisible1" 
      :close-on-click-modal="false"
      v-loading="loading1"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="around">
        <span>分类名称</span>
        <el-input class v-model="name1"></el-input>
      </div>
      <!-- 确定 取消按钮 -->
      <div class="juzhong">
        <el-button @click="queding1" type="primary">确定</el-button>
        <el-button type="info" @click="quxiao1">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/fuck";
export default {
  data() {
    return {
      dialogTableVisible:false,//是否显示上传面板
      dialogTableVisible1:false,//是否显示上传面板
      list:[],//博客列表
      title:'添加分类',//dialog显示标题
      title1:'修改分类',//dialog显示标题
      name:'',
      name1:'',
      remark:'',
      id:'',
      loading:false,//loading加载
      loading1:false,//loading加载
      classifyDescribe:'',
      totalRows:0,
      page:1
    };
  },
  created() {
    api.blogsClasses({
      page:1
    })
    .then(res=>{
      console.log(res)
      this.list = res.data.data.list
      this.totalRows = res.data.data.totalRows
    })
  },
  methods: {
    numChange(val){
      this.page = val
      api.blogsClasses({
        page:val
      })
      .then(res=>{
        console.log(res)
        this.list = res.data.data.list
        this.totalRows = res.data.data.totalRows
      })
    },
    dele(id){
      api.delBlogsClass({
        id:id
      })
      .then(res=>{
        if(res.data.result){
          this.$message({
            showClose: true,
            type: "success",
            message: "删除成功"
          });
          this.init()
        }
      })
      
    },
    queding(){
      if(this.name == ''){
        this.$message({
          showClose: true,
          message: "分类名称为空"
        });
        return false
      }
      this.loading = true
      api.addBlogsClass({
        blogsClasses:this.name
      })
      .then(res=>{
        console.log(res)
        this.loading = false
        if(res.data.result){
          this.$message({
            showClose: true,
            type: "success",
            message: "添加成功"
          });
          this.name = ''
          this.dialogTableVisible = false
          this.init()
        }else{
          this.$message({
            showClose: true,
            message: res.data.msg
          });
        }
      })
      .catch(res=>{
        this.loading = false
        this.$message({
          message: "添加失败",
          type: "error"
        });
      })
    },
    mychange(item){
      this.name1 = item.blogsClasses
      this.id = item.id
      this.dialogTableVisible1 = true
    },
    queding1(){
      if(this.name1 == ''){
        this.$message({
          showClose: true,
          message: "分类名称为空"
        });
        return false
      }
      this.loading1 = true
      api.updateBlogsClass({
        id:this.id,
        blogsClasses:this.name1
      })
      .then(res=>{
        console.log(res)
        this.loading1 = false
        if(res.data.result){
          this.$message({
            showClose: true,
            type: "success",
            message: "修改成功"
          });
          this.name = ''
          this.dialogTableVisible1 = false
          this.init()
        }else{
          this.$message({
            showClose: true,
            message: res.data.msg
          });
        }
      })
      .catch(res=>{
        this.loading1 = false
        this.$message({
          message: "添加失败",
          type: "error"
        });
      })
    },
    quxiao(){
      this.name = ''
      this.dialogTableVisible = false
    },
    quxiao1(){
      this.name1 = ''
      this.dialogTableVisible1 = false
    },
    init(){
      api.blogsClasses({
        page:1
      })
      .then(res=>{
        console.log(res)
        this.list = res.data.data.list
        this.totalRows = res.data.data.totalRows
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.around{
  text-align: center;
  .el-input{
    margin-top: 10px;
    margin-bottom: 30px;
  }
  span{
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
</style>
