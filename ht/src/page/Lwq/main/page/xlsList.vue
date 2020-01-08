<template>
  <div class="app">
    <div class="header">
      <el-button type="danger" @click="uploadXls">上传</el-button>
      <el-button type="danger" @click="init">刷新</el-button>
    </div>
    <div class="center">
      <table border="0" cellspacing="0">
        <tr class="color">
          <th>文件名称</th>
          <th>上传时间</th>
          <th>操作</th>
        </tr>
        <tr class="Myhover" v-for="(item,index ) in list" :key="index">
          <td>
            {{item.id}}
          </td>
          <td>
            {{item.createTime}}
          </td>
          <td>
            <!-- <el-button type="success" @click="mychange(item)">修改</el-button> -->
            <el-button type="danger" @click="dele(item.id)">删除</el-button>
          </td>
        </tr>
      </table>
    </div>

    <div class="img" style="width: 100%;">
      <el-pagination background
                     :current-page="page"
                     @current-change="numChange"
                     layout="prev, pager, next"
                     :total="totalRows"></el-pagination>
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
      <el-upload
        class="upload-demo"
        action="http://47.105.185.81:8899/aboutUs/uploadXls"
        :on-success="handleSuccess"
        :on-error="handleError"
        multiple
        :limit="1"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls表格文件，且不超过10mb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
// import wangeditor from "../../../../fuwenben/fuwenben1.vue";
import FuWen from "../../../../fuwenben/fuwenben";
import api from "@/api/fuck";
export default {
  data() {
    return {
      dialogTableVisible:false,//是否显示上传面板
      list:[],//列表
      title:'上传表格',//dialog显示标题
      blogTitle:'',
      remark:'',
      loading:false,//loading加载
      classifyDescribe:'',
      fileList:[],
      page:1,
      totalRows:0,
    };
  },
  created() {
    api.xlsList({
      page:1
    })
    .then(res=>{
      console.log(res)
      this.list = res.data.data.list
      this.totalRows = res.data.data.totalRows
    })
  },
  methods: {
    uploadXls(){
      this.fileList = []
      this.dialogTableVisible = true
    },
    handleSuccess(response, file, fileList){
      if(response.result){
        this.dialogTableVisible = false
        this.$message({
          showClose: true,
          type: "success",
          message: "上传成功"
        });
      }else{
        this.dialogTableVisible = false
        this.$message({
          showClose: true,
          message: response.msg
        });
      }
      this.init()
    },
    handleError(){
      this.$message({
        showClose: true,
        type: "error",
        message: "网络异常请稍后再试"
      });
      this.init()
    },
    numChange(val){
      console.log(val)
      this.page = val
      api.xlsList({
        page:val
      })
      .then(res=>{
        console.log(res)
        this.list = res.data.data.list
        this.totalRows = res.data.data.totalRows
      })
    },
    dele(id){
      let ids = []
      ids.push(id)
      api.delXls({
        id:JSON.stringify(ids)
      })
      .then(res=>{
        if(res.data.result){
          this.$message({
            showClose: true,
            type: "success",
            message: "删除成功"
          });
          this.init()
        }else{
          this.$message({
            showClose: true,
            type: "success",
            message: "删除失败请稍后再试"
          });
        }
      })
    },
    init(){
      this.page = 1
      api.xlsList({
        page:1
      })
      .then(res=>{
        console.log(res)
        this.list = res.data.data.list
        this.totalRows = res.data.data.totalRows
      })
    }
  },
  components: {
    FuWen
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
.upload-demo ul li{
  height: 50px;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
