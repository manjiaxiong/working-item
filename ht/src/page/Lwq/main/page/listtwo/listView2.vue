<template>
  <div>
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
        <el-tab-pane label="二级分类" name="first">
          <div class="around">
            <span>分类名称</span>
            <el-input class v-model="classifyNames"></el-input>
          </div>
          <div class="around">
            <span>上级分类</span>
            <el-select @change="getGoodsList" v-model="value" :placeholder="fatherName?fatherName:'请选择'">
              <el-option v-for="item in options" :key="item.id" :label="item.classifyName" :value="item.id"></el-option>
            </el-select>
          </div>
          <!--
          <div class="around">
            <span>链接商品</span>
            <el-select v-model="value1" :placeholder="fatherName?fatherName:'请选择'">
              <el-option v-for="item in options1" :key="item.id" :label="item.goodName" :value="item.id"></el-option>
            </el-select>
          </div> -->
          <div class="around">
            <span>序号</span>
            <el-input class v-model="sortnum" type="number" placeholder></el-input>
          </div>
          <div class="upload-pictures">
            <span>上传图片</span>
            <img-up class="upPictures" ref="upImg" :good_show="good_show"></img-up>
          </div>
         
          <div class="fuwen">
              <span>应用场景介绍</span>
              <div>
                <fu-wen ref="hh" class="text" :classifyDescribe="classifyDescribe"></fu-wen>
                <!-- <wangeditor :remark="remark" ref="hhh" @setEditorValue="setEditorValue"></wangeditor> -->
                <!-- <textarea style="margin-left: 20px;margin-bottom: 20px" name="remark" id="" cols="60" rows="20" v-model="remark"></textarea> -->
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
              <el-input class v-model="seo" placeholder></el-input>
            </div>
            <div class="around1">
              <span>SEO描述</span>
              <textarea name="seo" cols="50" v-model="seoContent" style="resize:none;" rows="10"></textarea>
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
    <table border="0" cellspacing="0">
      <tr class="color">
        <th>分类名字</th>
        <th>排序</th>
        <th>上级标题</th>
        <th>商城状态</th>
        <th>关联三级分类</th>
        <th>关联商品</th>
        <th>操作</th>
      </tr>
      <tr class="Myhover" v-for="(item,index ) in arr" :key="item.id">
        <td>{{item.classifyNames}}</td>
        <td>
          <span class="border" :data-id="item.id" @blur="changeNum" contenteditable="true">{{item.number}}</span>
        </td>
        <td>{{item.parentName}}</td>
        <td>
          <div class="lwqimgswtach" :data-id="item.id" :class="item.classifyStatus?'true':'flase'" @click="changeState(index,item.id)"></div>
        </td>
        <td>
          <span @click="labelDetail(item.id)" style="color: blue;">关联分类({{item.classes}})</span>
        </td>
        <td>
          <span @click="labelDetailGoods(item.parentId,item.id)" style="color: blue;">关联商品({{item.goods}})</span>
        </td>
        <td>
          <el-button type="success" @click="mychange(item)">修改</el-button>
          <el-button type="danger" @click="dele(item.id)">删除</el-button>
        </td>
      </tr>
    </table>
    <div class="juzhong">
      <el-pagination @current-change="handleCurrentChange" :page-size="10" :total="total" :current-page="num" layout="prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>
<script>
import api from "@/api/one";
import ImgUp from "../../../mianTitle/imgUp";
import FuWen from "../../../../../fuwenben/fuwenben";
// import wangeditor from "../../../../../fuwenben/fuwenben1";
export default {
    components: {
        ImgUp,
        FuWen
      },
  props: ["options"],
  data() {
    return {
      pagenum: 1,
      arr: [], //显示列表
      value: "", //父级id
      value1: "", //商品的id
      activeName: "first",
      fatherName: "",
      dialogTableVisible: false,
      classifyNames: "",
      sortnum: "", //排序
      num: 1, //当前页数
      length: "",
      state: "", //2 修改 1 添加
      xgid: "",
      title: "",
      parentId: "",
      options1: "", //链接商品
      good_show:[],
      classifyDescribe:'',
      oneUrl:'',
      total:0,
      loading:false,
      remark:'',
      seoTitle:'',//seo标题
      seo:'',//seo关键字
      seoContent:'',//seo描述
    };
  },
  created() {
    this.shuxin();
  },
  watch:{
    good_show(val){
      console.log('有变化',val)
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    setEditorValue(value) {
      this.remark = value ;
      console.log(value)
    },
    labelDetail(id){
      this.$router.push({
          path : "/index/main1/listoneDetail",
          query : {//query是跳转是传递的参数，对象类型
              id : id,
              type:3
          }
      })
    },
    labelDetailGoods(fid,sid){
      this.$router.push({
          path : "/index/main1/listtwoDetail",
          query : {//query是跳转是传递的参数，对象类型
              fid : fid,
              sid,sid
          }
      })
    },
    getLangList(val){
      this.arr = val
    },
    changeState(index, id) {
      //改变显示状态 //无需改变
      var that = this;
      api
        .changeState({
          classifyStatus:!this.arr[index].classifyStatus,
          id: id
        })
        .then(res => {
          console.log(res.data.code);
          if (res.data.code == "000000") {
            this.arr[index].classifyStatus = !this.arr[index].classifyStatus;
            // console.log(this.arr[index])
          }
        });
    },
    changeNum(e) {
      api
        .setNum({
          number: e.target.innerText.trim(),
          id: e.target.dataset.id
        })
        .then(res => {
          this.shuxin();
        });
    },
    shuxin() {
      api
        .getClassOne({
          parentId: this.parentId ? this.parentId : 0,
          page: this.num ? this.num : 1,
          classsifyType: 2,
          size: 10,
          element:sessionStorage.getItem('twoLang') || 'English'
        })
        .then(res => {
          console.log(res.data.data.list);
          this.arr = res.data.data.list;
          this.total = parseInt(res.data.data.totalRows);
        });
    },
    changeTitle(val) {
      this.title = val;
      this.classifyNames = ''
      this.fatherName = ''
      this.sortnum = ''
      this.value = ''
      this.seoTitle = ''
      this.seo = ''
      this.seoContent = ''
      this.good_show = []
    },
    mychange(val) {
      console.log('123111',val)
      this.oneUrl = val.imgPath
      this.changeState1(2);
      this.title = "修改";
      this.xgid = val.id;
      this.value = val.parentId
      this.fatherName = val.parentName;
      // this.dialogTableVisible = true;
      this.sortnum = val.number;
      this.classifyNames = val.classifyNames;
      if(val.imgPath){
        this.good_show = []
        this.good_show.push(val.imgPath)
      }
      // this.remark = val.classifyDescribe  //wangeditor
      this.classifyDescribe = val.classifyDescribe
      console.log('二级',this.good_show)
      //seo回显
      this.seoTitle = val.seoTitle
      this.seo = val.seoKey
      this.seoContent = val.seoDescripte
      this.show()
    },
    changeState1(val) {
      if(val == 1){
        // this.remark = ''
        this.classifyDescribe = ''
      }
      this.state = val;
    },
    close() {
      this.dialogTableVisible = false;
    },
    show() {
      // this.remark = ''
      this.dialogTableVisible = true;
    },
    dele(id) {
      //删除
      api
        .DeleatClass({
          id: id
        })
        .then(res => {
          if (res.data.msg == "删除成功") {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.shuxin();
          }
        });
    },
    getGoodsList(val) {
      api.getfenLeiShop({
        classsifyType: 1,
        parentId: val
      }).then(res => {
        this.options1 = res.data.data;
      })
    },
    queding() {
      //确定添加
      //todo 表单验证
      console.log(this.state);
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
      var _this = this
      if (this.state == 2) {
        console.log(this.classifyName,this.$store.state.imglist.url[0])
        //更新数据
        api
          .xiugai({
            id: this.xgid,
            classifyName: this.classifyNames, //分类名称
            imgPath: this.$store.state.imglist.url[0], //图标路径
            classsifyType: 2, //类型
            parentId: this.value, //上级id
            seoTitle:this.seoTitle,
            seoKey:this.seo,
            seoDescripte:this.seoContent,
            number: this.sortnum, //展示序号
            classifyDescribe:this.$refs.hh.getUEContent() //富文本值
            // classifyDescribe:this.remark //富文本值
          })
          .then(res => {
            console.log(res.data.msg)
            console.log(res.data.msg == "修改成功");
            if (res.data.msg == "操作成功") {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              _this.shuxin();
              _this.close();
              // this.remark = ''
              _this.classifyDescribe = ''
              _this.good_show = []
              // window.location.reload()
            }
          });
      } else {
        this.loading = true
        console.log(this.classifyName)
        api
          .setClassTwo({
            classifyName: this.classifyNames, //分类名称
            imgPath: this.$store.state.imglist.url, //图标路径
            classsifyType: 2, //类型
            parentId: this.value, //上级id
            seoTitle:this.seoTitle,
            seoKey:this.seo,
            seoDescripte:this.seoContent,
            number: this.sortnum, //展示序号
            classifyDescribe:this.$refs.hh.getUEContent() //富文本值
            // classifyDescribe:this.remark //富文本值
          })
          .then(res => {
            _this.loading = false
            if (res.data.msg == "添加成功") {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              // this.$refs.hh.change('')
              // this.remark = ''
              _this.classifyDescribe = ''
              _this.close();
              _this.shuxin();
            }
          })
      }
      // console.log(this.$refs.hh.getUEContent())
    },
    quxiao() {
      this.close();
      this.good_show = []
      this.remark = ''
    },
    handleCurrentChange(val) {
      this.num = val;
      this.parentId = "";
      this.$store.commit("title/setVal", val);
      this.shuxin();
    },
    handleCurrentChange2(val) { //修改获取分类
      console.log(val);
      this.num = 1;
      this.parentId = val;
      this.shuxin();
    }
  }
};

</script>
<style lang="scss" scoped>
.el-select {
  width: 466px !important;
}

table {
  width: 100%;
  font-size: 16px;
}

.color {
  color: #555;
  background: #f7f7f7;

  th {
    /*padding: 10px 10px;*/
  }
}

.Myhover {
  color: #555;

  &:hover {
    background-color: rgb(242, 242, 242);
    /*color: rgb();*/
  }

  td {
    text-align: center;
    padding: 2px 0;
    // border: 1px solid #ccc;


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
  // width: 50px;
  // height: 58px;
  cursor: pointer;
  margin: auto;
  width: 50px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
}

.true {
  background-image: url("../../../../../assets/imges/houtai/kai.png");
}

.flase {
  background-image: url("../../../../../assets/imges/houtai/guan.png");
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

.juzhong {
  display: flex;
  justify-content: center;
  align-items: center;
}
/*上传图片样式*/
.upload-pictures{
    margin-left:30px;

}
.upload-pictures span{
    display: block;
    height: 130px;
    line-height: 130px;
    float: left;
}
.upload-pictures .upPictures{
    margin-left: 110px;
}
/*富文本编辑器样式*/
/*
.fuwen{
    margin-top: 50px;
    margin-left:30px;
}
.fuwen span{
    display: block;
    height: 350px;
    line-height: 350px;
    float: left;
}
.fuwen .text{
    margin-left: 110px;
}
*/
.fuwen{
    margin-top: 50px;
    margin-left:30px;
}
.fuwen>span{
  margin-bottom: 10px !important;
  display: inline-block;
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
</style>
