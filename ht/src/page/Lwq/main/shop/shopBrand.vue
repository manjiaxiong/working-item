<template>
  <div class="pa50">
    <div class="topBox">
      <el-input class="width"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                v-model="input1"></el-input>
      <el-button size="medium"
                 type="danger"
                 @click="changeSearch">查询</el-button>
      <el-button size="medium"
                 type="danger"
                 @click="addLabel">添加品牌</el-button>
      <el-button size="medium"
                 type="danger"
                 @click="shuaxin">刷新</el-button>
      <div class="language">
        <!-- 语言 -->
        <el-select v-model="selectValue"
                   @change="langChange"
                   placeholder="请选择语言">
          <el-option v-for="(item,index) in optionsLang"
                     :key="item.describe"
                     :label="item.element"
                     :value="index">
          </el-option>
        </el-select>
      </div>
    </div>
    <div>
      <div class="p100">
        <table border="0"
               cellpadding="0"
               cellspacing="0">
          <tr class="bac247 Myflex">
            <th>品牌名称</th>
            <th>关联商品</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        <tbody>
          <tr class="juz"
              v-for="(item,index) in arr"
              :key="item.id">
            <td>
              {{item.brandNames}}
            </td>
            <td>
              <span @click="labelDetail(item.id)" style="color: blue;">相关商品({{item.goods}})</span>
            </td>
            <td>
              <div class="lwqimgswtach"
                   :class="item.brandState==0?'true':'flase'"
                   @click="changeState(item.id,item.brandState)"></div>
            </td>
            <td class="btn">
              <el-button size="small"
                           type="success"
                           @click="xiugai(index)">修改</el-button>
                <el-button size="small"
                           type="danger"
                           @click="dele(item.id)">删除</el-button>
            </td>
          </tr>
        </tbody>
        </table>

      </div>
    </div>
    <div class="center">
      <el-pagination @current-change="handleCurrentChange"
                     :page-size="10"
                     background
                     :current-page.sync="Page"
                     layout="prev, pager, next, jumper"
                     :total="totalRows"></el-pagination>
    </div>
    <!-- 添加模版 -->
    <div class="addMemu" v-show="addMemu">
      <div class="mask"></div>
      <div 
        class="content"
        v-loading="loading"
        element-loading-text="上传中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <div class="img" style="position: absolute;top: 5px;right: 5px;width: 30px;height: 30px;" @click.stop="closeAddMemu">
          <img src="../../../../assets/imges/houtai/close.png" alt="" style="width: 100%;height: 100%;">
        </div>
        <div class="title">添加品牌</div>
        <div class="name">
          <span>品牌名:</span>
          <input type="text" placeholder="请输入品牌名">
        </div>
        <div class="state">
          <span>状态:</span>
          <label class="single"><input type="radio" name="state" value="open" checked />开启</label>
          <label class="single"><input type="radio" name="state" value="close" />关闭</label>
        </div>
        <div class="btn">
          <button @click="submitLabel">添加</button>
        </div>
      </div>
    </div>
    <!-- 修改模版 -->
    <div class="modifyMemu" v-show="modifyMemu">
      <div class="mask"></div>
      <div class="content">
        <div class="img" style="position: absolute;top: 5px;right: 5px;width: 30px;height: 30px;" @click.stop="closeModifyMemu">
          <img src="../../../../assets/imges/houtai/close.png" alt="" style="width: 100%;height: 100%;">
        </div>
        <div class="title">修改品牌</div>
        <div class="name">
          <span>品牌名:</span>
          <input type="text" placeholder="请输入品牌名">
        </div>
        <div class="state">
          <span>状态:</span>
          <label class="single"><input type="radio" name="modifyMemuState" value="open" />开启</label>
          <label class="single"><input type="radio" name="modifyMemuState" value="close" />关闭</label>
        </div>
        <div class="btn">
          <button @click="submitLabel">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import MyShop from "./up/shopup";
  import MySeo from "./up/seo";
  import ImgS from "./up/pho";
  import TW from "./up/tuwen";
  import api from "@/api/shop";
  import api1 from "@/api/one";
  export default {
    props: ["name"],
    data () {
      return {
        input1: "",
        quanxianArr:[true,false,false,false],//
        dialogTableVisible: false,
        activeName: "first",
        arr: [], //刷新数据
        totalRows: 0,
        zt: "",
        hh: [],
        id: "", //查询商品的id
        nima: "", //别报错了
        Page: 1, //当前页码
        flag: false, //销毁该dom
        selectValue:'',
        optionsLang:[],
        addMemu:false,//添加标签
        modifyMemu:false,//修改标签
        modifyId:'',
        loading:false
      };
    },
    components: {
      MyShop,
      MySeo,
      ImgS,
      TW
    },
    created () {
      
    },
    mounted(){
      api.brandList({
        page:this.Page
      })
      .then(res=>{
        console.log(res)
        this.arr = res.data.data.list
        this.totalRows = parseInt(res.data.data.totalRows);
      })
      api1.getLanguages().then(res=>{
        console.log(res.data)
        this.optionsLang = res.data.data
      })
    },
    methods: {
      labelDetail(id){
        this.$router.push({
            path : "/index/main1/brandDetail",
            query : {//query是跳转是传递的参数，对象类型
                id : id
            }
        })
      },
      submitLabel(){
        if(this.zt == 0){//添加
          this.loading = true
          var val = $('.addMemu .name input').val()//输入的品牌名
          var state = ''
          $('.addMemu .state input').each(function(i){
            if($(this).is(':checked')){
              if($(this).val() == 'open'){
                state = 0
              }else{
                state = 1
              }
            }
          })
          api.addBrand({
            brandName:val,
            brandState:state
          })
          .then(res=>{
            this.loading = false
            if(res.data.msg == "该品牌已存在"){
              this.$message({
                message: '该品牌已存在'
              });
            }else{
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.addMemu = false
              this.shuaxin()
            }
          })
          .catch(res=>{
            this.loading = false
            this.$message({
              message: '添加失败',
              type: 'error'
            });
          })
        }else if(this.zt == 1){//修改
          var val = $('.modifyMemu .name input').val()//输入的标签名
          var state = ''
          $('.modifyMemu .state input').each(function(i){
            if($(this).is(':checked')){
              if($(this).val() == 'open'){
                state = 0
              }else{
                state = 1
              }
            }
          })
          api.updateBrand({
            id:this.modifyId,
            brandName:val,
            brandState:state
          })
          .then(res=>{
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.modifyMemu = false
            this.shuaxin()
          })
          .catch(res=>{
            this.$message({
              message: '修改失败',
              type: 'error'
            });
          })
        }
        
      },
      closeAddMemu(){
        this.addMemu = false
      },
      closeModifyMemu(){
        this.modifyMemu = false
      },
      langChange(val){
        sessionStorage.setItem('labelLang',this.optionsLang[val].element)
        api.brandList({
          page:this.Page,
          element:this.optionsLang[val].element || 'English'
        })
        .then(res => {
          console.log(res.data.data.list);
          this.arr = res.data.data.list;
          this.totalRows = parseInt(res.data.data.totalRows);
        });
      },
      changeActiveName(val){
          this.activeName=val;
      },
      addLabel () {
        $('.addMemu .name input').val('')
        this.addMemu = true;
        this.zt = 0
      },
      shuaxin () {
        var element = sessionStorage.getItem('labelLang')
          api
            .brandList({
              page:this.Page,
              element:element || 'English'
            })
            .then(res => {
              console.log(res.data.data.list);
              this.totalRows = parseInt(res.data.totalRows);
              this.arr = res.data.data.list;
            });
      },
      close () {
        this.flag = false;
        this.dialogTableVisible = false;
      },
      xiugai (index) {
        // TODO回显
        this.modifyMemu = true;
        this.zt = 1
        console.log(this.arr[index])
        this.modifyId = this.arr[index].id
        $('.modifyMemu .name input').val(this.arr[index].brandNames)
        if(this.arr[index].brandState == 0){
           $('.modifyMemu .state input').eq(0).attr("checked",true)
           $('.modifyMemu .state input').eq(1).attr("checked",false)
        }else{
          $('.modifyMemu .state input').eq(0).attr("checked",false)
           $('.modifyMemu .state input').eq(1).attr("checked",true)
        }
      },
      xxx (index) {
        console.log(index);
      },
      handleCurrentChange (val) {
        this.Page = val
        //翻页时候
        api.labelList({
          page:val
        })
        .then(res=>{
          console.log(res)
          this.arr = res.data.data.list
          this.totalRows = parseInt(res.data.data.totalRows);
        })
      },
      fz (res) {
        console.log(res.data,res.code)
        if (res.data.msg == "暂无数据") {
          this.$message({
            message: "没有找到该商品",
            type: "warning"
          });
        } else if (res.data.code == "000000") {
          this.$message({
            message: "查询成功",
            type: "success"
          });
          // console.log(res.data.data.list)
          this.arr = res.data.data.list;
          this.id = res.data.data.list[0].id;
        }
      },
      changeSearch () {
        console.log(this.input1);
        if (!this.input1) {
          return false;
        }
        api
          .labelList({
            tagName:this.input1,
            page:this.Page
          })
          .then(res => {
            this.fz(res);
          });
      },
      changeState (id,brandState) {
        console.log(id,brandState)
        api.updateBrand({
          id:id,
          brandState:brandState==0 ? 1 : 0
        })
        .then(res=>{
          console.log(res)
          this.shuaxin()
        })
      },
      xiajia (id) {
        //下架
        api
          .xiajia({
            id: id,
            mallStatus: 0 //0 下 1 上
          })
          .then(res => {
            if (res.data.code == "000000") {
              this.$message({
                showClose: true,
                message: "下架成功",
                type: "success"
              });
              this.shuaxin();
            }
          });
      },
      shangjia (id) {
        api
          .shangjia({
            id: id,
            mallStatus: 1 //0 下 1 上
          })
          .then(res => {
            console.log(res);
            if (res.data.code == "000000") {
              this.$message({
                showClose: true,
                message: "上架成功",
                type: "success"
              });
              this.shuaxin();
            }
          });
      },
      shangjia1 (id) {
        api
          .shangjia({
            id: id,
            isDeleteStatus: 1
          })
          .then(res => {
            console.log(res);
            if (res.data.code == "000000") {
              this.$message({
                showClose: true,
                message: "上架成功",
                type: "success"
              });
              this.shuaxin();
            }
          });
      },
      dele (id) {
        api
          .delBrand({
            id: id
          })
          .then(res => {
            // console.log(res);
            if (res.data.code == "000000") {
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
              this.shuaxin();
            }
          });
      },
      closeDo (done) {
        done();
      },
      qingkong(id){
          api.qingkong({
            id:id
          }).then(res=>{
            console.log(res);
            this.shuaxin();
          })
      }
    }
  };
</script>
<style lang="scss" scoped>
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
  }
  .content{
    position: absolute;
    top: 170px;
    left: 650px;
    width: 500px;
    height: 400px;
    background-color: #fff;
    z-index: 999;
  }
  .content .title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
  }
  .content .name{
    width: 100%;
    height: 100px;
    line-height: 70px;
    font-size: 22px;
    margin-left: 40px;
    margin-top: 30px;
  }
  .content .name input{
    width: 300px;
    height: 40px;
    line-height: 70px;
    font-size: 22px;
    padding-left: 15px;
    box-sizing: border-box;
  }
  .content .state{
    font-size: 22px;
    margin-left: 40px;
  }
  .content .btn{
    width: 100%;
    height: 50px;
  }
  .content .btn button{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #4177f4;
  }
</style>

<style lang="scss">
  .el-input__inner{

    padding: 0;
  }
  .el-dialog__header{
    padding: 2px;
  }
  .myshop{
    .el-dialog__title{
      font-size: 0.6rem;
    }

    .el-dialog__body{
      padding: 2px;
    }
    .around .el-input__inner{
      /*flex: 1;*/
      height: 20px;
      line-height: 20px;
      margin: 1px;
      padding: 0;
    }
    .el-input__icon{
      line-height: 0;
    }
    .el-tabs__item{

    }
    .el-tabs__content{
      .el-button{
        margin-right: 30px;
        margin-bottom: 30px;
      }
    }
  }
  .el-input__inner{
    padding-left: 10px;
  }
</style>
<style lang="scss" scoped>
  tbody{
    height: 50vh;
    overflow-x: hidden;
  }
  .width {
    width: 200px;
  }
  .pa50 {
    padding: 10px 0 0 10px;
    .topBox{
      width: 1000px !important;
      height: 50px;
      .language{
        width: 300px !important;
        display: inline-block;
      }
    }
  }
  .around {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .p100 {
    padding: 10px 0px;
    .img {
      padding-top: 10px !important;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 30px;
      }
    }
    .Myflex {
      text-align: center;
      /*height: 50px;*/
    }
    .bac247 {
      background-color: rgb(247, 247, 247);
    }
    table {
      width: 100%;
      font-size: 12px;
    }
    .juz {
      text-align: center;
      &:hover{
        background-color: rgb(242,242,242);
      }
      td {
        /*padding: 10px 0;*/
      }
    }

  }
  .mgwidth {
    display: inline-block;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    text-align: left;
  }
  p {
    text-align: left;
  }
  .nini {
    display: flex;
    flex-direction: column;
  }
  .true {
    background-image: url("../../../../assets/imges/houtai/kai.png");
  }
  .flase {
    background-image: url("../../../../assets/imges/houtai/guan.png");
  }
  .lwqimgswtach {
    width: 50px;
    height: 20px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .center {
    display: flex;
    justify-content: center;
    margin: 0;
  }
  .btn {
    button {
      // width: 30px;
    }
  }
</style>
