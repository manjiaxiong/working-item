<template>
  <div class="app">
    <div class="header">
      <el-button type="danger" @click="add">添加</el-button>
      <el-button type="danger" @click="init">刷新</el-button>
      <el-select style="margin-left: 30px;" v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="center" style="margin-bottom: 100px;">
      <table border="0" cellspacing="0">
        <tr class="color">
          <th>博客标题</th>
          <th>分类名称</th>
          <th>发表时间</th>
          <th>操作</th>
        </tr>
        <tr class="Myhover" v-for="(item,index ) in list" :key="index">
          <td>
            {{item.title}}
          </td>
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
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="博客内容" name="first">
          <div class="classification">
            <span>博客分类</span>
            <el-select v-model="value" :placeholder="classificationName ? classificationName : '请选择'">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.blogsClasses"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="around">
            <span>博客类型</span>
            <el-radio-group v-model="radio">
              <el-radio :label="1">发布</el-radio>
              <el-radio :label="0">存至草稿箱</el-radio>
            </el-radio-group>
          </div>
          <div class="around">
            <span>博客标题</span>
            <el-input class v-model="blogTitle"></el-input>
          </div>
          <div class="fuwen">
              <span>博客内容</span>
              <a href="javascript:;" @click="preview">预览</a>
              <div>
                <fu-wen ref="hh" :classifyDescribe="classifyDescribe"></fu-wen>
                <!-- <wangeditor :remark="remark" ref="hhh" @setEditorValue="setEditorValue"></wangeditor> -->
              </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="SEO设置" name="second">
          <div class="seoClass">
            <div class="around1">
              <span>SEO标题</span>
              <el-input class v-model="seoTitle" placeholder></el-input>
            </div>
            <div class="around1">
              <span>SEO关键字</span>
              <el-input class v-model="seoKey" placeholder></el-input>
            </div>
            <div class="around1">
              <span>SEO描述</span>
              <textarea name="seo" cols="50" v-model="seoDescripte" style="resize:none;" rows="10"></textarea>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 确定 取消按钮 -->
      <div class="juzhong">
        <el-button @click="queding" type="primary">确定</el-button>
        <el-button type="info" @click="quxiao">取消</el-button>
      </div>
    </el-dialog>
    <div class="preview" v-if="previewShow">
      <div class="title">预览</div>
      <div v-html="text" class="content" style="padding: 0 3%;"></div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="previewShow = false">取 消</el-button>
          <el-button type="primary" @click="previewShow = false">确 定</el-button>
        </span>
    </div>
    <div class="mask" v-if="previewShow"></div>
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
      list:[],//博客列表
      title:'添加博客',//dialog显示标题
      activeName: "first",
      blogTitle:'',
      remark:'',
      loading:false,//loading加载
      classifyDescribe:'',
      options: [],
      value: '',
      seoTitle:'',
      seoKey:'',
      seoDescripte:'',
      page:1,
      totalRows:0,
      zt:0,//默认0，为添加；1为修改
      classificationName:'',
      id:'',
      radio:1,
      value1:'1',
      options1: [{
        value: '1',
        label: '已发布'
      }, {
        value: '0',
        label: '草稿箱'
      }],
      previewShow:false,
      text:'',
    };
  },
  created() {
    api.blogList({
      page:1,
      state:this.value1
    })
    .then(res=>{
      console.log(res)
      this.list = res.data.data.list
      this.totalRows = res.data.data.totalRows
    })
    api.blogsClasses()
    .then(res=>{
      console.log(res)
      this.options = res.data.data
    })
  },
  watch:{
    radio(val){
      console.log(val)
    },
    value1(val){
      this.value1 = val
      api.blogList({
        page:1,
        state:this.value1
      })
      .then(res=>{
        console.log(res)
        this.list = res.data.data.list
        this.totalRows = res.data.data.totalRows
      })
    }
  },
  methods: {
    preview(){//富文本预览
      this.text = this.$refs.hh.getUEContent()
      this.previewShow = true
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    add(){
      this.zt = 0
      this.title = '添加博客'
      this.blogTitle = ''
      this.classifyDescribe = ''
      this.seoTitle = ''
      this.seoKey = ''
      this.seoDescripte = ''
      this.radio = 1
      this.value = ''
      this.classificationName = ''
      this.id = ''
      this.dialogTableVisible = true
    },
    dele(id){
      api.delBlogs({
        id:id
      })
      .then(res=>{
        if(res.data.result){
          this.$message({
            showClose: true,
            type: "success",
            message: "删除成功"
          });
        }
      })
      this.init()
    },
    mychange(item){
      this.zt = 0
      this.title = '修改博客'
      this.seoTitle = item.seoTitle
      this.seoKey = item.seoKey
      this.radio = item.state
      this.seoDescripte = item.seoDescripte
      this.blogTitle = item.title
      this.value = item.classId
      this.classificationName = item.blogsClasses
      this.classifyDescribe = item.content
      this.id = item.id
      this.dialogTableVisible = true
    },
    numChange(val){
      this.page = val
      api.blogList({
        page:val,
        state:this.value1
      })
      .then(res=>{
        console.log(res)
        this.list = res.data.data.list
        this.totalRows = res.data.data.totalRows
      })
    },
    queding(){
      if(this.value == ''){
        this.$message({
          showClose: true,
          message: "请选择博客分类"
        });
        return false
      }
      if(this.blogTitle == ''){
        this.$message({
          showClose: true,
          message: "博客标题为空"
        });
        return false
      }
      if(this.$refs.hh.getUEContent() == ''){
        this.$message({
          showClose: true,
          message: "博客内容为空"
        });
        return false
      }
      if(this.seoTitle == ''){
        this.$message({
          showClose: true,
          message: "博客SEO标题为空"
        });
        return false
      }
      if(this.seoKey == ''){
        this.$message({
          showClose: true,
          message: "博客SEO关键字为空"
        });
        return false
      }
      if(this.seoDescripte == ''){
        this.$message({
          showClose: true,
          message: "博客SEO描述为空"
        });
        return false
      }
      this.loading = true
      if(this.zt == 0){//添加
        api.addBlogs({
          title:this.blogTitle,
          content:this.$refs.hh.getUEContent(),
          classId:this.value,
          seoTitle:this.seoTitle,
          state:this.radio,
          seoKey:this.seoKey,
          seoDescripte:this.seoDescripte,
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
            this.blogTitle = ''
            this.classifyDescribe = ''
            this.seoTitle = ''
            this.seoKey = ''
            this.seoDescripte = ''
            this.value = ''
            this.radio = 1
            this.classificationName = ''
            this.id = ''
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
      }else{//修改
        api.updateBlogs({
          title:this.blogTitle,
          content:this.$refs.hh.getUEContent(),
          classId:this.value,
          seoTitle:this.seoTitle,
          state:this.radio,
          seoKey:this.seoKey,
          seoDescripte:this.seoDescripte,
          id:id
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
            this.blogTitle = ''
            this.classifyDescribe = ''
            this.seoTitle = ''
            this.seoKey = ''
            this.seoDescripte = ''
            this.radio = 1
            this.value = ''
            this.classificationName = ''
            this.id = ''
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
      }
      
    },
    quxiao(){
      this.blogTitle = ''
      this.classifyDescribe = ''
      this.seoTitle = ''
      this.seoKey = ''
      this.seoDescripte = ''
      this.value = ''
      this.classificationName = ''
      this.id = ''
      this.dialogTableVisible = false
    },
    init(){
      api.blogList({
        page:1,
        state:this.value1
      })
      .then(res=>{
        console.log(res)
        this.list = res.data.data.list
        this.totalRows = res.data.data.totalRows
      })
    },
    setEditorValue(value) {
      this.remark = value ;
    },
  },
  components: {
    FuWen
  }
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
