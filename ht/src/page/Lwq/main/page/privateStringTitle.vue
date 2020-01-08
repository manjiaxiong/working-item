<template>
  <div>
    <!-- 一级分类添加 -->
    <div class="mybtn">
<!--      <div>添加分类</div>-->
      <el-button size="medium"
                 type="danger"
                 @click="Show('添加分类')">添加分类</el-button>
      <el-button size="medium"
                 type="danger"
                 @click="shuxin">刷新</el-button>
      <div class="language">
        <!-- 语言 -->
        <el-select v-model="selectValue"
                   @change="langChange"
                   placeholder="请选择语言">
          <el-option v-for="(item,index) in options"
                     :key="item.describe"
                     :label="item.element"
                     :value="index">
          </el-option>
        </el-select>
      </div>
    </div>
    <my-list class="mylist" ref="list" :ListArr="ListArr" :type="1"></my-list>
    <div class="juzhong">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total"
        :page-count="pagenum"
        layout="prev, pager, next, jumper"
      ></el-pagination>
    </div>
    <div v-if="dialogTableVisible">
      <el-dialog 
        :title="title" 
        center :visible.sync="dialogTableVisible" 
        :close-on-click-modal="false"
        v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="一级分类" name="first">
            <div class="around">
              <span>名称</span>
              <el-input class v-model="classifyName" placeholder></el-input>
            </div>
            <div class="around">
              <span>序号</span>
              <el-input class v-model="sortnum" placeholder type="number"></el-input>
            </div>
            <div class="around">
              <span>上传图片</span>
              <div>
                <img-up :good_show="good_show"></img-up>
              </div>
            </div>
            <!-- 确定 取消按钮 -->
          </el-tab-pane>
          <el-tab-pane label="场景描述" name="second">
            <div class="center">
              <fu-wen ref="hh" :classifyDescribe="classifyDescribe"></fu-wen>
              <!-- <wangeditor :remark="remark" ref="hhh" @setEditorValue="setEditorValue"></wangeditor> -->
              <!-- <textarea style="margin-left: 20px;margin-bottom: 20px" name="remark" id="" cols="100" rows="20" v-model="remark"></textarea> -->
            </div>
          </el-tab-pane>
          <el-tab-pane label="SEO设置" name="third">
            <div class="seoClass">
              <div class="around1">
                <span>SEO标题</span>
                <el-input class v-model="seoTitle" placeholder></el-input>
              </div>
              <div class="around1">
                <span>SEO关键字</span>
                <el-input class v-model="seo" placeholder></el-input>
              </div>
              <div class="around1">
                <span>SEO描述</span>
                <textarea name="seo" cols="50" v-model="seoContent" style="resize:none;" rows="10"></textarea>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="center">
          <el-button @click="queding" type="primary">确定</el-button>
          <el-button type="info" @click="quxiao">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import MyList from "./listone/listView";
import ImgUp from "../../mianTitle/imgUp";
import FuWen from "../../../../fuwenben/fuwenben";
// import wangeditor from "../../../../fuwenben/fuwenben1";
import api from "@/api/one";
export default {
  components: {
    MyList,
    ImgUp,
    FuWen
  },
  data() {
    return {
      active: "",
      ListArr: [],
      dialogTableVisible: false,
      title: "",
      activeName: "first",
      sortnum: "", //排序
      classifyName: "", //名字
      length: "",
      zt: "", //0 添加 1修改
      myid:"",//修改商品的id
      good_show:[],
      oneUrl:'',
      classifyDescribe:'',
      pagenum:1,
      selectValue:'',
      options:[],
      nowPage:1,
      total:0,
      loading:false,
      remark:'',
      seoTitle:'',//seo标题
      seo:'',//seo关键字
      seoContent:'',//seo描述
    };
  },
  created() {
    var element = sessionStorage.getItem('oneLang')
    if(element){
      this.selectValue = element
    }
  },
  mounted(){
    api.getLanguages().then(res=>{
      console.log(res.data)
      this.options = res.data.data
    })
  },
  methods: {
    setEditorValue(value) {
      this.remark = value ;
      console.log(value)
    },
    langChange(val){
      console.log('langChange:::',val)
      sessionStorage.setItem('oneLang',this.options[val].element)
      api
        .getClassOne({
          page: this.nowPage ? this.nowPage : 1,
          parentId: 0,
          classsifyType: 1,
          size: 10,
          element:this.options[val].element
        }).then(res=>{
          this.ListArr = res.data.data.list
          this.$refs.list.getLang(res.data.data.list)
        })
    },
    Show(title) {
      this.dialogTableVisible = true;
      this.title = title;
      this.activeName = "first";

      if (title == "添加分类") {
        this.zt = 0;
        this.sortnum = "";
        this.classifyName = "";
        this.classifyDescribe = "";
        this.good_show = [];
        this.remark = ''
        this.seoTitle = ''
        this.seo = ''
        this.seoContent = ''
      } else {
        this.zt = 1;
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
      shuxin(){
          this.$refs.list.shuxin();
      },
    handleSizeChange() {},
    handleCurrentChange(val) {
      console.log(val);
      this.nowPage = val
      this.$refs.list.changePageNum(val);
    },
    queding() {
      // let a = this.remark;
      let a = this.$refs.hh.getUEContent();
      console.log(a);

      if (!a) {
        this.$message({
          message: "请填写图文描述",
          type: "warning"
        });
        return;
      }
      if (!this.classifyName) {
        this.$message({
          message: "请填写分类名字",
          type: "warning"
        });
        return;
      }
      console.log(this.$store.state.imglist.arr)
      var r = this.$store.state.imglist.arr.filter(function (s) {
         return s && s.trim();
      });
      console.log(r)
      if (!r[0]) {
        this.$message({
          message: "请上传图片",
          type: "warning"
        });
        return;
      }
      if (!(this.sortnum>=0)) {
        this.$message({
          message: "请填写排序",
          type: "warning"
        });
        return;
      }
      if (this.seoTitle == '') {
        this.$message({
          message: "请填写seo标题",
          type: "warning"
        });
        return;
      }
      if (this.seo == '') {
        this.$message({
          message: "请填写seo关键字",
          type: "warning"
        });
        return;
      }
      if (this.seoContent == '') {
        this.$message({
          message: "请填写seo内容",
          type: "warning"
        });
        return;
      }
      if (this.zt == 0) {
        this.loading = true
        console.log(this.$store.state.imglist)
        api
          .SetClassOne({
            classifyName: this.classifyName,
            imgPath: this.$store.state.imglist.url,
            classsifyType: 1,
            number: this.sortnum,
            classifyDescribe: a,
            seoTitle:this.seoTitle,
            seoKey:this.seo,
            seoDescripte:this.seoContent
          })
          .then(res => {
            this.loading = false
            console.log();
            if (res.data.msg == "添加成功") {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.quxiao(); //关闭弹出
              this.$refs.list.shuxin();
              // this.remark = ''
              this.classifyDescribe = ''
              this.pagenum = 1;
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
      if (this.zt == 1) {
        api.xiugai({
          classifyName: this.classifyName,
          imgPath: r[0],
          id:this.myid,
          classsifyType: 1,
          number: this.sortnum,
          classifyDescribe: a,
          seoTitle:this.seoTitle,
          seoKey:this.seo,
          seoDescripte:this.seoContent
        }).then(res=>{
            if(res.data.msg=='操作成功'){
               this.$message({
                message: "修改成功",
                type: "success"
              });
              this.quxiao(); //关闭弹出
              this.$refs.list.shuxin();
              // this.remark = ''
              this.classifyDescribe = ''
            }


        })
      }
    },
    quxiao() {
      this.dialogTableVisible = false;
    },
    shuxin() {
      this.$refs.list.shuxin();
    },
    huixian(val) {
      console.log("回显",val);
      this.myid=val.id;
      this.activeName = "first";
      this.classifyName = val.classifyNames;
      this.sortnum = val.number;
      this.oneUrl = val.imgPath
      if(val.imgPath){
        this.good_show = []
        this.good_show[0] = val.imgPath
      }
      // this.remark = val.classifyDescribe
      this.classifyDescribe = val.classifyDescribe
      //seo回显
      this.seoTitle = val.seoTitle
      this.seo = val.seoKey
      this.seoContent = val.seoDescripte
    },
    changeLength(val) {
      this.total = val;
      console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.mybtn {
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px 10px 10px;
  /*padding-right: 100px;*/
  /*padding-bottom: 30px;*/
  /*padding-top: 5px;*/
  div {
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding: 0 5px;
    background-color: rgb(125, 125, 195);
    color: #fff;
  }
  div.language{
    margin-top: -5px;
    margin-bottom: 10px;
    background-color: #fff;
    .el-select{
      background-color: #fff;
    }
  }
}
.juzhong {
  padding-top: 50px;
  display: flex;
  justify-content: center;
}
.around {
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
.center {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
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
#pane-third .center{
  display: block;
}
</style>
